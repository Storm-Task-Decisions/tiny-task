const helperUsers = require("../helpers/users.js");
const helperProjects = require("../helpers/projects.js");
const helperTeams = require("../helpers/teams.js");
const helperTasks = require("../helpers/tasks.js");

exports.extractProjectId = (teams, callback) => {
  Promise.all(teams.map(team => {
      return new Promise((resolve, reject) => {
        helperProjects.retrieveProjectByTeamId(team.dataValues.team_id, (project) => {
            resolve(project);
          }
        );
      });
    })
  ).then(results => {
    let projectsArr = [];
    let idArray = [];
    for (var i = 0; i < results.length; i++) {
      results[i].forEach(project => {
        projectsArr.push(project.dataValues);
      });
    }
    projectsArr.sort((projectA, projectB) => {
      return projectB.updatedAt - projectA.updatedAt;
    });
    projectsArr.forEach(project => {
      idArray.push(project.id);
    });
    callback(idArray);
  });
};

exports.users = {
  retrieveUser: (req, res) => {
    var userData = {};
    let authToken = req.params.auth_info;
    helperUsers.retrieveUser(authToken, userProfile => {
      if (userProfile === null) {
        userData.project_id = [];
        helperUsers.addUserProfile(req.body, userProfile => {
          userData.user_profile = userProfile;
          helperUsers.addUsers(authToken, userProfile.id, (err, user) => {
            helperTeams.addTeam('Solo Projects', user.dataValues.user_profile_id, true, (team, user_id) => {
              helperTeams.addTeamUser(user_id, team.dataValues.id, (user) => {
                res.send(userData);
              });
            });
          });
        });
      } else {
        userData.user_profile = userProfile;
        helperTeams.retrieveUserTeams(userProfile.id, teams => {
          if (teams.length !== 0) {
            this.extractProjectId(teams, projectIds => {
              userData.project_id = projectIds;
              res.send(userData);
            });
          } else {
            userData.project_id = [];
            res.send(userData);
          }
        });
      }
    });
  },

  retrieveProfile: (req, res) => {
    console.log(req.params);
    helperUsers.retrieveProfile(req.params.user_id, user_profile => {
      res.send(user_profile);
    })
  },

  retrieveProjectIds: (req, res) => {
    helperTeams.retrieveUserTeams(req.params.user_id, teams => {
      if (teams.length !== 0) {
        this.extractProjectId(teams, projectIds => {
          res.send(projectIds);
        });
      } else {
        res.send([]);
      }
    });
  },

  searchUser: (req, res) => {
    let query = req.params.query.toLowerCase();
    helperUsers.searchUsers(query, userList => {
      res.status(200).send(userList).end();
    });
  },

  createNewUser: (req, res, isSeed) => {
    helperUsers.addUserProfile(req.body, user_profile => {
      const id = user_profile.id;
      helperUsers.addUsers(req.body.auth_token, id, (err, result) => {
        if (err) {
          return res.status(500).send("server error");
        } else if (typeof isSeed === "function") {
          res.status(200).send("user added");
          res.end();
        } else {
          console.log("seed user added");
          res.end();
        }
      });
    });
  },

  deleteUser: (req, res) => {
    helperUsers.deleteUserProfiles(req.params.user_id, (err, result) => {
      if (err) {
        res.status(500).send("server error");
      } else {
        res.status(200).send("user deleted");
        res.end();
      }
    });
  },

  updateUser: (req, res) => {
    helperUsers.updateUserProfiles(req.params, req.body, (err, message) => {
      if (err) {
        res.status(500).send("server error");
      } else {
        res.status(200).send(message);
        res.end();
      }
    });
  },

  getUserTeams: (req, res) => {
    let userTeamData = [];
    helperTeams.getUserTeams(req.params.user_id, results => {
      if (results) {
        results.map(result => {
          userTeamData.push(result[0].dataValues);
        });
      }
      res.send(userTeamData);
    });
  },

  // getUserTasks: (req, res) => {
  //   let userTaskData = {};
  //   helperUsers.retrieveTaskUser(req.params.user_id, (tasks) => {

  //   });
  // },

  deleteTeamUsers: (req, res) => {
    helperTeams.deleteTeamUser(
      req.params.user_id,
      req.params.team_id,
      (message) => {
          res.status(200).send(message);
          res.end();
        }
    );
  },

  deleteTaskUsers: (req, res) => {
    helperTasks.deleteTaskUser(
      req.params.user_id,
      req.params.task_id,
      (err, message) => {
        if (err) {
          res.status(500).send("server error");
        } else {
          res.status(200).send(message);
          res.end();
        }
      }
    );
  },

  retrieveUserProjectID: (req, res) => {
    helperTeams.retrieveUserTeams(req.params.user_id, teams => {
      if (teams.length !== 0) {
        this.extractProjectId(teams, projectIds => {
          res.send(projectIds);
        });
      } else {
        res.send([]);
      }
    });
  }
};
