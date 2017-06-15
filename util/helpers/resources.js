//const mysql = require('mysql');
const models = require("../../db/models.js");

exports.addResource = (req, callback) => {
  models.Shared_Resources
    .create({
      URL: req.body.URL,
      notes: req.body.notes,
      user_id: req.body.user_id,
      team_id: req.body.team_id
    })
    .then(result => {
      callback(result);
    });
};

exports.getResourcesByTeamId = (params, callback) => {
  return models.Shared_Resources
    .findAll({
      where: {
        team_id: params.team_id
      }
    })
    .then(resources => {
      callback(resources);
    });
};

exports.updateResource = (req, callback) => {
  models.Shared_Resources
    .findOne({
      where: {
        id: req.params.resources_id
      }
    })
    .then(resources => {
      resources
        .updateAttributes(req.body)
        .then(resources => {
          callback(null, resources.dataValues);
        })
        .catch(err => {
          callback(err, null);
        });
    });
};

exports.deleteResource = (params, callback) => {
  models.Shared_Resources
    .destroy({
      where: {
        id: params.resources_id
      }
    })
    .then(() => {
      callback("resourceDeleted");
    });
};
