//const mysql = require('mysql');
const models = require("../../db/models.js");

exports.retrieveTasksByPhaseId = (params, callback) => {
  return models.Tasks
    .findAll({
      where: {
        phase_id: params.phase_id
      }
    })
    .then(phases => {
      callback(phases);
    });
};

exports.retrieveTaskByTaskId = (task_id, callback) => {
  return models.Tasks
    .findOne({
      where: {
        id: task_id
      }
    })
    .then(task => {
      callback(task);
    });
};

exports.retrieveTasksByUserId = (params, callback) => {
  return models.User_Tasks
    .findAll({
      where: {
        user_id: params.user_id,
        project_id: params.project_id
      }
    })
    .then(results => {
      callback(results);
    });
};

exports.retrieveTaskUser = (task_id, callback) => {
  models.User_Tasks
    .findAll({
      where: {
        task_id: task_id
      }
    })
    .then(users => {
      callback(users);
    });
};

exports.retrieveTeamUserTasks = (team_id, user_id, project_id, callback) => {
  models.User_Tasks
    .findAll({
      where: {
        team_id: team_id,
        user_id: user_id,
        project_id: project_id
      }
    })
    .then(tasks => {
      callback(tasks);
    });
}

exports.addUserTasks = (body, task_id, callback) => {
  models.User_Tasks
    .findAll({
      where: {
        task_id: task_id,
        user_id: body.user_id
      }
    })
    .then(results => {
      if (!results.length) {
      models.User_Tasks
        .create({
          user_id: body.user_id,
          team_id: body.team_id,
          project_id: body.project_id,
          task_id: task_id
        })
        .then(results => {
          callback(results);
        });
      }
    })
};

exports.addTask = (body, phase_id, callback) => {
  // Find all tasks
  let prev = null;
  let previousTask;
  models.Tasks
    .findAll({
      where: {
        phase_id: phase_id
      }
    })
    .then(results => {
      if (results.length) {
        previousTask = results.find(task => task.dataValues.next === null);
        prev = previousTask.id;
      }
      models.Tasks
      .create({
        task_name: body.task_name,
        task_color: body.task_color,
        complete: body.complete || false,
        stage: body.stage || "not started",
        phase_id: phase_id,
        previous: prev,
        next: null
      })
      .then(result => {
        if ( typeof previousTask !== 'undefined' ) {
          previousTask.updateAttributes({next: result.id});
        }
        callback(result);
      });
    })
};

exports.updateTask = (task_id, changes, callback) => {
  let taskId = task_id;
  models.Tasks
    .findOne({
      where: {
        id: taskId
      }
    })
    .then(task => {
      task.updateAttributes(changes).then(task => {
        models.Tasks
          .findOne({
            where: {
              id: taskId
            }
          })
          .then(task => {
            callback(task);
          });
      });
    });
};

exports.updateTaskOrder = (task_id, orderChange, callback) => {
  models.Tasks.findOne({
    where: { id: task_id }
  })
  .then(task => {
    if ( task.dataValues.previous === orderChange.new_previous && task.dataValues.next === orderChange.new_next ) {
      callback(task);
    } else {
      reconnectLinks(task_id)
      .then((task) => {
        console.log()
        task.updateAttributes({
          previous: orderChange.new_previous,
          next: orderChange.new_next
        });
        if (orderChange.new_previous === null) {
          models.Tasks.findOne({
            where: { id: orderChange.new_next }
          })
          .then(next => {
            next.updateAttributes({previous: task_id});
            callback(task);
          });
        } else if (orderChange.new_next === null) {
          models.Tasks.findOne({
            where: { id: orderChange.new_previous }
          })
          .then(previous => {
            previous.updateAttributes({next: task_id});
            callback(task);
          });
        } else {
          models.Tasks.findOne({
            where: { id: orderChange.new_previous }
          })
          .then(previous => {
            previous.updateAttributes({next: task_id});
            models.Tasks.findOne({
              where: { id: orderChange.new_next }
            })
            .then(next => {
              next.updateAttributes({previous: task_id});
              callback(task);
            });
          });
        }
      });
    }
  });
};

exports.deleteTaskUser = (user_id, task_id, callback) => {
  models.User_Tasks
    .destroy({
      where: {
        user_id: user_id,
        task_id: task_id
      }
    })
    .then(result => {
      callback(null, "user deleted from task");
    })
    .catch(err => {
      callback(err, null);
    });
};

exports.deleteTask = (task_id, callback) => {
  // Reconnect tasks for doubly linked list
  reconnectLinks(task_id)
    .then(() => {
      models.Tasks.destroy({
        where: { id: task_id }
      })
      .then(() => {
        callback("taskDeleted");
      });
    })
};

const reconnectLinks = (task_id) => {
  let previousValue;
  return new Promise((resolve, reject) => {
    models.Tasks.findOne({
      where: { id: task_id }
    })
    .then(result => {
      if ( result.dataValues.previous !== null || result.dataValues.next !== null ) {
        if (result.dataValues.previous === null) {
          models.Tasks.findOne({
            where: { id: result.dataValues.next }
          })
          .then(next => {
            next.updateAttributes({previous: null});
            resolve(result);
          });
        } else if (result.dataValues.next === null) {
          models.Tasks.findOne({
            where: { id: result.dataValues.previous }
          })
          .then(previous => {
            previous.updateAttributes({next: null});
            resolve(result);
          });
        } else {
          // Find previous task
          models.Tasks.findOne({
            where: { id: result.dataValues.previous }
          })
          .then(previous => {
            previousValue = previous;
            // Find next task
            models.Tasks.findOne({
              where: { id: result.dataValues.next }
            })
            .then(next => {
              let prevId = previousValue.dataValues.id;
              let nextId = next.dataValues.id;
              previousValue.updateAttributes({next: nextId});
              next.updateAttributes({previous: prevId});
              resolve(result);
            });
          });
        }
      } else {
        resolve(result);
      }
    });
  });
};
