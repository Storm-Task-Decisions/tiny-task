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
  models.Tasks
    .create({
      task_name: body.task_name,
      task_color: body.task_color,
      complete: body.complete || false,
      stage: body.stage || "not started",
      phase_id: phase_id
    })
    .then(result => {
      callback(result);
    });
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
  models.Tasks
    .destroy({
      where: {
        id: task_id
      }
    })
    .then(() => {
      callback("taskDeleted");
    });
};
