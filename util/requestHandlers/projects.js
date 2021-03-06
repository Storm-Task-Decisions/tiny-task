const helperProject = require("../helpers/projects.js");
const helperUser = require("../helpers/users.js");
const helperTeam = require("../helpers/teams.js");
const helperPhases = require("../helpers/phases.js");
const helperTasks = require("../helpers/tasks.js");

(exports.reorderPhases = (phases, phaseOrder, callback) => {
  if (phaseOrder === null) {
    phaseOrder = [];
  } else {
    phaseOrder = phaseOrder.split(" ");
  }
  let result = [];
  for (let i = 0; i < phaseOrder.length; i++) {
    phaseOrder[i] = parseInt(phaseOrder[i]);
    for (let j = 0; j < phases.length; j++) {
      if (phases[j].id == phaseOrder[i]) {
        result.push(phases[j]);
      }
    }
  }
  if(result.length === 0) {
    result = phases;
  }
  callback(result);
}),

(exports.projects = {
  createNewProjects: (req, res, isSeed) => {
    let newProjects = {};
    helperProject.addProject(req.body, project => {
      newProjects.project_info = project;
      helperTeam.retrieveTeamById(project.team_id, team => {
        newProjects.team_info = team;
        helperTeam.retrieveTeamUsers(team[0].dataValues.id, users => {
          newProjects.user_info = users;
          if (typeof isSeed === "function") {
            res.status(200).send(newProjects);
            res.end();
          } else {
            console.log("seed project added");
            res.end();
          }
        });
      });
    });
  },

  retrieveProjectById: (req, res) => {
    let returnData = {};
    helperProject.retrieveProjectById(req.params.project_id, project => {
      returnData.project_info = project;
      if (project) {
        helperTeam.retrieveTeamById(project.team_id, team => {
          returnData.team_info = team;
          helperTeam.retrieveTeamUsers(team[0].dataValues.id, users => {
            returnData.user_info = users;
            helperPhases.retrievePhasesByProjectId(req.params.project_id, (phases) => {
              this.reorderPhases(phases, returnData.project_info.dataValues.phase_order, (result) => {
                returnData.phase_info = result;
                res.send(returnData).end();
              });
            });
          });
        });
      } else {
        res.send(returnData);
      }
    });
  },

  //need to return tasks as well^^^^^^^^^^^

  updateProjects: (req, res) => {
    let updatedProject = {};
    helperProject.updateProject(
      req.params.project_id,
      req.body.projectChanges,
      project => {
        updatedProject.project_info = project;
        helperTeam.retrieveTeamById(project.team_id, team => {
          updatedProject.team_info = team;
          helperTeam.retrieveTeamUsers(team[0].dataValues.id, users => {
            updatedProject.user_info = users;
            res.send(updatedProject).end();
          });
        });
      }
    );
  },
  //need to return tasks & phases as well^^^^^^^^^^^

  updatePhaseOrder: (req, res) => {
    helperProject.updatePhaseOrder(req.params.project_id, req.body.phase_order, (message) => {
      res.status(200).send(message).end();
    });
  },

  deleteProjects: (req, res) => {
    helperProject.deleteProject(req.params.project_id, (err, message) => {
      if (err) {
        return res.status(500).send(err);
      } else {
        res.send(message).end();
      }
    });
  },

  retrieveProjectsByTeam: (req, res) => {
    helperProject.retrieveProjectByTeamId(req.params.team_id, projects => {
      let idArr = [];
      projects.forEach(project => {
        idArr.push(project.id);
      });
      res.send(idArr);
    });
  },

  retrieveProjectAndTasks: (req, res) => {
    let projectsAndTasks = {};
    helperProject.retrieveProjectByTeamId(req.params.team_id, projects => {
      asyncProjectsTasksRetrieve(projects, req.params.team_id, req.params.user_id, projectsTasks => {
        res.send(projectsTasks);
      });
    });
  }
});

const asyncProjectsTasksRetrieve = (projects, team_id, user_id, callback) => {
  Promise.all(
    projects.map(project => {
      return new Promise((resolve, reject) => {
        let projectTaskData = {project_info: project}
        helperTasks.retrieveTeamUserTasks(team_id, user_id, project.dataValues.id, tasks => {
          asyncTaskRetrieve(tasks, tasksInfo => {
            projectTaskData.tasks_info = tasksInfo;
            resolve(projectTaskData);
          });
        });
      });
    })
  ).then(results => {
    let projectsTasks = [];
    results.forEach(result => {
      projectsTasks.push(result);
    });
    callback(projectsTasks);
  });
}

const asyncTaskRetrieve = (tasks, callback) => {
  Promise.all(
    tasks.map(task => {
      return new Promise((resolve, reject) => {
        helperTasks.retrieveTaskByTaskId(task.dataValues.id, task => {
          resolve(task);
        });
      });
    })
  ).then(results => {
    let tasksInfo = [];
    results.forEach(result => {
      tasksInfo.push(result);
    });
    callback(tasksInfo);
  });
}