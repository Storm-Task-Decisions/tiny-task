const helper = require("../helpers/resources.js");

exports.resources = {
  retrieveResources: (req, res) => {
    helper.getResourcesByTeamId(req.params, resources => {
      res.send(resources);
    });
  },

  createNewResources: (req, res, isSeed) => {
    helper.addResource(req, result => {
      if (typeof isSeed === "function") {
        res.status(200).send(result);
        res.end();
      } else {
        console.log("seed resource added");
        res.end();
      }
    });
  },

  updateResources: (req, res) => {
    helper.updateResource(req, (err, result) => {
      if (err) {
        return res.status(500).send("server error");
      } else {
        console.log("seed announcement updated");
        res.status(200).send(result);
        res.end();
      }
    });
  },

  deleteResources: (req, res) => {
    helper.deleteResource(req.params, message => {
      res.status(200).send(message);
    });
  }
};
