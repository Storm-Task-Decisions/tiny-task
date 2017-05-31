const mysql = require('mysql');
const models = require('../db/models.js');

exports.addUsers = (body, id, callback) => {
  models.Users.create({
    auth_token: body.auth_token,
    user_profile_id: id
  }).then((result) => {
    callback(null, result);
  }).catch((err) => {
    callback(err);
  });
};

exports.addUserProfile = (body, callback) => {
  models.User_Profile.create({
    full_name: body.full_name,
    email: body.email,
    user_status: body.user_status,
    user_availability: body.user_availability
  }).then((result) => {
    callback(result);
  });
};

exports.retrieveUser = (params, callback) => {
  models.Users.findOne({
    where: {
      auth_token: params.auth_token
    }
  }).then((user) => {
    return models.User_Profile.findOne({
      where: {
        id: user.user_profile_id
      }
    })
  }).then((user_profile) => {
    callback(user_profile);
  });
}


exports.addProject = (body, user_id, team_id, callback) => {
  models.Projects.create({
    project_name: body.project_name,
    user_id: user_id,
    team_id: team_id
  }).then((result) => {
    callback(result);
  });
}

// exports.updateUser = () => {

// }

// exports.deleteUser = () => {

// }

exports.addTeam = (body, user_id, callback) => {
  models.Teams.create({
    team_name: body.team_name,
    user_id: id
  }).then((result) => {
    callback(result);
  });
}

// exports.retrieveTeam = () => {

// }

// exports.updateTeam = () => {

// }

// exports.deleteTeam = () => {

// }

// exports.addMessage = () => {
//   models.Messages.create({
//     message: body.message
//   }).then((result) => {
//     callback(result);
//   });
// }

// exports.retrieveMessage = () => {

// }

// exports.deleteMessage = () => {

// }

// exports.addAnnouncement = () => {
//   models.Announcements.create({
//     announcement: body.announcement
//   }).then((result) => {
//     callback(result);
//   });
// }

// exports.retrieveAnnouncement = () => {

// }

// exports.deleteAnnouncement = () => {

// }


exports.retrieveProject = () => {

}

exports.updateProject = () => {

}

exports.deleteProject = () => {

}

exports.addPhase = () => {
  models.Users.create({
    phase_name: body.phase_name,
    phase_order: body.phase_order,
    phase_status: body.phase_status,
    phase_color: body.phase_color,
    project_id: body.project_id
  }).then((result) => {
    callback(result);
  });
}

exports.retrievePhase = () => {

}

exports.updatePhase = () => {

}

exports.deletePhase = () => {

}

exports.addTask = () => {
  models.Tasks.create({
    task_name: body.task_name,
    task_status: body.task_status
  }).then((result) => {
    callback(result);
  });
}

exports.retrieveTask = () => {

}

exports.updateTask = () => {

}

exports.deleteTask = () => {

}

exports.createNewResources = () => {
  models.Resources.create({
    resource: body.resource,
    type: body.type
  }).then((result) => {
    callback(result);
  });
}

exports.retrieveResources = () => {

}

exports.deleteResources = () => {

}