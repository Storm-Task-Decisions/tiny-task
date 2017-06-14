const announcementHelper = require('../helpers/announcements.js');
const userHelper = require('../helpers/users.js');

exports.announcements = {
  retrieveAnnouncements: (req, res) => {
    let announcementData = {};
    announcementHelper.getAnnouncementsByTeamId(req.params, (announcements) => {
      announcementData.announcements = announcements;
      Promise.all(announcements.map(announcement => {
        return new Promise((resolve, reject) => {
          userHelper.retrieveProfile(announcement.user_id, (userProfile) => {
            resolve(userProfile);
          });
        });
      })).then((results) => {
        announcementData.announcements.forEach((announcement, index) => {
          announcementData.announcements[index].dataValues.userName = results[index].full_name;
        });
      }).then(() => {
        res.send(announcementData);
      });
    });
  },
  createNewAnnouncements: (req, res, isSeed) => {
    announcementHelper.addAnnouncement(req, (err, result) => {
      if (err) {
        return res.status(500).send("server error");
      } else if (typeof isSeed === "function") {
        res.status(200).send(result);
        res.end();
      } else {
        console.log("seed announcement added");
        res.end();
      }
    });
  },
  updateAnnouncements: (req, res) => {
    announcementHelper.updateAnnouncement(req.params.announcement_id, req.body.announcementChanges.announcement, (err, result) => {
      if (err) {
        return res.status(500).send("server error");
      } else {
        res.status(200).send(result);
        res.end();
      }
    });
  },
  deleteAnnouncements: (req, res) => {
    announcementHelper.deleteAnnouncement(req.params, message => {
      res.status(200).send(message);
    });
  }
};
