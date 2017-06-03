const helper = require('./helperFunctions.js');


exports.users = {
  // retrieveTeam: (req, res) => {
  //   helper.retrieveTeam(req.params, (result) => {
  //     res.send(result);
  //   })
  retrieveUser: (req, res) => {
    var userData = {};
    helper.retrieveUser(req.params, (result) => {
      userData.profile = result;
      helper.retrieveProject(req.params, (projects) => {
        userData.projects = projects;
        res.send(userData);
      });
    });
  },

  createNewUser: (req, res, isSeed) => {
    helper.addUserProfile(req.body, (user_profile) => {
      const id = user_profile.id;
      helper.addUsers(req.body, id, (err, result) => {
        if (err) {
          return res.status(500).send('server error');
        } else if (!isSeed) {
          res.status(200).send('user added');
          res.end();
        } else {
          console.log('seed user added');
          res.end();
        }
      });
    });
  },

  updateUser: (req, res) => {
    helper.updateUser(req.body, () => {
      res.end(JSON.stringify(res.body));
    });
    helper.updateUserProfile(req.body, () => {
      res.end(JSON.stringify(res.body));
    }).then((user) => {
      res.status(200).send('user updated');
    }).catch((err) => {
      res.status(404).send(err, 'error on updating user');
    });
  },

  deleteUser: (req, res) => {
    helper.deleteUser(req, () => {
      res.end(JSON.stringify(res.body));
    });
    helper.deleteUserProfile(req, () => {
      res.end(JSON.stringify(res.body));
    }).then((user) => {
      res.status(200).send('user deleted');
    }).catch((err) => {
      res.status(404).send(err, 'error on deleting user');
    });
  }
};

exports.teams = {
  createNewTeams: (req, res, isSeed) => {
    helper.addTeam(req.body, (team) => {
      const team_id = team.id;
      helper.addTeamUser(req.body, team_id, (err, result) => {
        if (err) {
          return res.status(500).send(err);
        } else if (typeof isSeed === 'function') {
          res.status(200).send('team added');
          res.end();
        } else {
          console.log('seed team added');
          res.end();
        }
      });
    });
  },

  // retrieveTeams: (req, res) => {
  //   helper.retrieveTeam(req, () => {
  //     res.end(JSON.stringify(res.body));
  //   }).then((team) => {
  //     res.status(200).send('team retrieved');
  //   }).catch((err) => {
  //       res.status(404).send(err, 'error retrieving team');
  //     });
  // },

  updateTeams: (req, res, isSeed) => {
    helper.addTeamUser(req.body, req.body.team_id, (err, result) => {
        if (err) {
          return res.status(500).send('server error');
        } else if (!isSeed) {
          res.status(200).send('team added');
          res.end();
        } else {
          console.log('seed team added');
          res.end();
        }
      });
  },

  deleteTeams: (req, res) => {
    helper.deleteTeam(req, () => {
      res.end(JSON.stringify(res.body));
    }).then((team) => {
      res.status(200).send('team deleted');
    }).catch((err) => {
      res.status(404).send(err, 'error on deleting team');
    });
  }
};

exports.projects = {
  createNewProjects: (req, res, isSeed) => {
    let newProjects = {};
    helper.addProject(req.body, (project) => {
      newProjects['project_info'] = project;
      helper.retrieveTeamById(project['team_id'], (team) => {
        newProjects['team_info'] = team;
        helper.retrieveTeamUsers(team[0].dataValues.id, (users) => {
          newProjects['user_info'] = users;
          console.log(newProjects['user_info'], 'users');
          if (typeof isSeed === 'function') {
            console.log(newProjects);
            res.status(200).send(newProjects);
            res.end();
          } else {
            console.log('seed project added');
            res.end();
          }
        });
      });
    });
  },

  retrieveProjectById: (req, res) => {
    let returnData = {};
    helper.retrieveProjectById(req.params, (project) => {
      returnData['project_info'] = project;
      helper.retrieveTeamById(project['team_id'], (team) => {
        returnData['team_info'] = team;
        helper.retrieveTeamUsers(team[0].dataValues.id, (users) => {
          returnData['user_info'] = users;
          res.send(returnData);
        });
      });
    });
  },

  updateProjects: (req, res) => {
    let updatedProject = {};
    helper.updateProject(req.body.projectId, req.body.projectChanges, (project) => {
      updatedProject['project_info'] = project;
      console.log(updatedProject['project_info'], 'project');
      helper.retrieveTeamById(project['team_id'], (team) => {
        updatedProject['team_info'] = team;
        console.log(updatedProject['team_info'], 'team');
        helper.retrieveTeamUsers(team[0].dataValues.id, (users) => {
          updatedProject['user_info'] = users;
          res.send(updatedProject);
        });
      });
    });
  }
};



exports.phases = {
  retrievePhasesByProjectId: (req, res) => {
    helper.retrievePhases(req.params, (phases) => {
      res.send(phases);
    });
  },

  createNewPhases: (req, res, isSeed) => {
    helper.addPhases(req.body, (err, result) => {
      if (err) {
          return res.status(500).send('server error');
        } else if (!isSeed) {
          res.status(200).send('phase added');
          res.end();
        } else {
          console.log('seed phase added');
          res.end();
        }
    });
  },

  deletePhases: (req, res) => {
    helper.deletePhase(req, () => {
      res.end(JSON.stringify(res.body));
    })
      .then((phase) => {
        res.status(200).send('phase deleted');
      })
      .catch((err) => {
        res.status(404).send(err, 'error on deleting phase');
      });
  }
};

exports.tasks = {
  createNewTasks: (req, res, isSeed) => {
    helper.addTask(req.body, (err, result) => {
    //helper.addTask(req.body, (task) => {
      //const x = task.id;
      //return helper.addUserTasks(req.body, x, (err, result) => {
        if (err) {
          return res.status(500).send('server error');
        } else if (!isSeed) {
          res.status(200).send('task added');
          res.end();
        } else {
          console.log('seed task added');
          res.end();
        }
      });
    //});
  },

  // retrieveTasksByUserId: (req, res) => {

  // },

  retrieveTasksByPhaseId: (req, res) => {
    helper.retrieveTasksByPhaseId(req.params, (tasks) => {
      res.send(tasks);
    });

  }
};

// exports.messages = {
//   retrieveMessages: (req, res) => {
//     helper.retrieveMessage(req, () => {
//       res.end(JSON.stringify(res.body));
//     }).then((message) => {
//       res.status(200).send('message retrieved');
//     }).catch((err) => {
//       res.status(404).send(err, 'error retrieving message');
//     });
//   },
//   createNewMessages: (req, res) => {
//     helper.addMessage(req.body, () => {
//       res.end(JSON.stringify(res.body));
//     }).then((message) => {
//       res.status(200).send('message added');
//     }).catch((err) => {
//       res.status(404).send(err, 'error on creating message');
//     });
//   },
//   updateMessages: (req, res) => {
//     helper.updateMessage(req.body, () => {
//       res.end(JSON.stringify(res.body));
//     }).then((message) => {
//       res.status(200).send('message updated');
//     }).catch((err) => {
//       res.status(404).send(err, 'error on updating message');
//     });
//   },
//   deleteMessages: (req, res) => {
//     helper.deleteMessage(req, () => {
//       res.end(JSON.stringify(res.body));
//     }).then((message) => {
//       res.status(200).send('message deleted');
//     }).catch((err) => {
//       res.status(404).send(err, 'error on deleting message');
//     });
//   }
// };

// exports.announcements = {
//   retrieveAnnouncements: (req, res) => {
//     helper.retrieveAnnouncement(req, () => {
//       res.end(JSON.stringify(res.body));
//     }).then((announcement) => {
//       res.status(200).send('announcement retrieved');
//     }).catch((err) => {
//       res.status(404).send(err, 'error retrieving announcement');
//     });
//   },
//   createNewAnnouncements: (req, res) => {
//     helper.addAnnouncement(req.body, () => {
//       res.end(JSON.stringify(res.body));
//     }).then((announcement) => {
//       res.status(200).send('announcement added');
//     }).catch((err) => {
//       res.status(404).send(err, 'error on creating announcement');
//     });
//   },
//   updateAnnouncements: (req, res) => {
//     helper.updateAnnouncement(req.body, () => {
//       res.end(JSON.stringify(res.body));
//     }).then((announcement) => {
//       res.status(200).send('announcement updated');
//     }).catch((err) => {
//       res.status(404).send(err, 'error on updating announcement');
//     });
//   },
//   deleteAnnouncements: (req, res) => {
//     helper.deleteAnnouncement(req, () => {
//       res.end(JSON.stringify(res.body));
//     }).then((announcement) => {
//       res.status(200).send('announcement deleted');
//     }).catch((err) => {
//       res.status(404).send(err, 'error on deleting announcement');
//     });
//   }
// };

// exports.resources = {
//   retrieveResources: (req, res) => {
//     helper.retrieveResource(req, () => {
//       res.end(JSON.stringify(res.body));
//     })
//       .then((resource) => {
//         res.status(200).send('resource retrieved');
//       })
//       .catch((err) => {
//         res.status(404).send(err, 'error retrieving resource');
//       });
//   },
//   createNewResources: (req, res) => {
//     helper.addResource(req.body, () => {
//       res.end(JSON.stringify(res.body));
//     })
//       .then((resource) => {
//         res.status(200).send('resource added');
//       })
//       .catch((err) => {
//         res.status(404).send(err, 'error on creating resource');
//       });
//   },
//   updateResources: (req, res) => {
//     helper.updateResource(req.body, () => {
//       res.end(JSON.stringify(res.body));
//     })
//       .then((resource) => {
//         res.status(200).send('resource updated');
//       })
//       .catch((err) => {
//         res.status(404).send(err, 'error on updating resource');
//       });
//   },
//   deleteResources: (req, res) => {

//   }
// };
