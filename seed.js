/*
to use:
  open sql server -- mysql.server start
  open database -- mysql -h localhost -u root -p
  push enter for password, none needed
  type SHOW DATABASES
  if tiny_task exists, drop database and create new:
  DROP DATABASE tiny_task;
  CREATE DATABASE tiny_task;
  in terminal write 'npm run seed' to seed the database
*/

const handlerUsers = require("./util/requestHandlers/users.js");
const handlerTeams = require("./util/requestHandlers/teams.js");
const handlerProjects = require("./util/requestHandlers/projects.js");
const handlerPhases = require("./util/requestHandlers/phases.js");
const handlerTasks = require("./util/requestHandlers/tasks.js");
const handlerAnnouncements = require("./util/requestHandlers/announcements.js");
const handlerMessages = require("./util/requestHandlers/messages.js");
const handlerResources = require("./util/requestHandlers/resources.js");

const seedData = [
  () => {
    return handlerUsers.users.createNewUser(
      {
        body: {
          auth_token: "Kevin",
          full_name: "Kevin Nguyen",
          email: "kevinN@tinytask.com",
          user_color: "blue",
          user_status: "Adding Styling",
          user_availability: "false"
        }
      },
      {
        end: () => {
          console.log("finished");
        }
      },
      true
    );
  },
  () => {
    return handlerUsers.users.createNewUser(
      {
        body: {
          auth_token: "Brian",
          full_name: "Brian Leung",
          email: "brianl@tinytask.com",
          user_color: "black",
          user_status: "Building out user profiles",
          user_availability: "false"
        }
      },
      {
        end: () => {
          console.log("finished");
        }
      },
      true
    );
  },
  () => {
    return handlerUsers.users.createNewUser(
      {
        body: {
          auth_token: "David",
          full_name: "David Hsiao",
          email: "davidh@tinytask.com",
          user_color: "yellow",
          user_status: "Connecting apis",
          user_availability: "true"
        }
      },
      {
        end: () => {
          console.log("finished");
        }
      },
      true
    );
  },
  () => {
    return handlerUsers.users.createNewUser(
      {
        body: {
          auth_token: "Beth",
          full_name: "Beth Stevic",
          email: "beths@tinytask.com",
          user_color: "green",
          user_status: "Debugging deployment",
          user_availability: "true"
        }
      },
      {
        end: () => {
          console.log("finished");
        }
      },
      true
    );
  },

  () => {
    return handlerTeams.teams.createNewTeams(
      {
        body: {
          team_name: "Storm Taskers",
          user_id: "1"
        }
      },
      {
        end: () => {
          console.log("seed team added");
        }
      },
      true
    );
  },

  () => {
    return handlerTeams.teams.updateTeams(
      {
        params: { team_id: 1 },
        body: {
          user_id: "2"
        }
      },
      {
        end: () => {
          console.log("seed team updated");
        }
      },
      true
    );
  },

  () => {
    return handlerTeams.teams.updateTeams(
      {
        params: { team_id: 1 },
        body: {
          user_id: "3"
        }
      },
      {
        end: () => {
          console.log("seed team updated");
        }
      },
      true
    );
  },
  () => {
    return handlerTeams.teams.updateTeams(
      {
        params: { team_id: 1 },
        body: {
          user_id: "4"
        }
      },
      {
        end: () => {
          console.log("seed team updated");
        }
      },
      true
    );
  },

  () => {
    return handlerProjects.projects.createNewProjects(
      {
        body: {
          project_name: "Tiny Task",
          user_id: "1",
          team_id: 1,
          phase_order: "1, 2, 3"
        }
      },
      {
        end: () => {
          console.log("seed project added");
        }
      },
      true
    );
  },

  () => {
    return handlerPhases.phases.createNewPhases(
      {
        params: {
          project_id: 1
        },
        body: {
          phase_name: "Phase 1",
          phase_order: 1,
          phase_status: "Finished",
          phase_color: "blue",
          user_id: 1,
          team_id: 1
        }
      },
      {
        end: () => {
          console.log("seed phase added");
        }
      },
      true
    );
  },
  () => {
    return handlerPhases.phases.createNewPhases(
      {
        params: {
          project_id: 1
        },
        body: {
          phase_name: "Phase 2",
          phase_order: 2,
          phase_status: "In progress",
          phase_color: "green",
          user_id: "1",
          team_id: 1
        }
      },
      {
        end: () => {
          console.log("seed phase added");
        }
      },
      true
    );
  },
  () => {
    return handlerPhases.phases.createNewPhases(
      {
        params: {
          project_id: 1
        },
        body: {
          phase_name: "Phase 3",
          phase_order: 3,
          phase_status: "Not started",
          phase_color: "yellow",
          user_id: "1",
          team_id: 1
        }
      },
      {
        end: () => {
          console.log("seed phase added");
        }
      },
      true
    );
  },

  () => {
    return handlerTasks.tasks.createNewTasks(
      {
        params: { phase_id: 1 },
        body: {
          task_name: "Create back-end",
          task_color: "green",
          stage: "in progress"
        }
      },
      {
        end: () => {
          console.log("seed task created");
        }
      },
      true
    );
  },

  () => {
    return handlerTasks.tasks.createNewTasks(
      {
        params: { phase_id: 1 },
        body: {
          task_name: "Create front-end",
          task_color: "blue",
          stage: "in progress"
        }
      },
      {
        end: () => {
          console.log("seed task created");
        }
      },
      true
    );
  },

  () => {
    return handlerTasks.tasks.createNewTasks(
      {
        params: { phase_id: 2 },
        body: {
          task_name: "Write more Tests",
          complete: true,
          task_color: "yellow",
          stage: "done"
        }
      },
      {
        end: () => {
          console.log("seed task created");
        }
      },
      true
    );
  },

  () => {
    return handlerTasks.tasks.createNewTasks(
      {
        params: { phase_id: 2 },
        body: {
          task_name: "Write more functions",
          complete: true,
          task_color: "orange",
          stage: "done"
        }
      },
      {
        end: () => {
          console.log("seed task created");
        }
      },
      true
    );
  },

  () => {
    return handlerTasks.tasks.createNewTasks(
      {
        params: { phase_id: 3 },
        body: {
          task_name: "Finish app",
          task_color: "red",
          stage: "not started"
        }
      },
      {
        end: () => {
          console.log("seed task created");
        }
      },
      true
    );
  },

  () => {
    return handlerTasks.tasks.createNewTasks(
      {
        params: { phase_id: 3 },
        body: {
          task_name: "Make it pretty",
          complete: true,
          task_color: "purple",
          stage: "done"
        }
      },
      {
        end: () => {
          console.log("seed task created");
        }
      },
      true
    );
  },

  () => {
    return handlerTasks.tasks.updateTasks(
      {
        params: { task_id: 1 },
        body: {
          user_id: 1,
          team_id: 1,
          project_id: 1
        }
      },
      {
        end: () => {
          console.log("seed task updated");
        }
      },
      true
    );
  },
  () => {
    return handlerTasks.tasks.updateTasks(
      {
        params: { task_id: 2 },
        body: {
          user_id: 2,
          team_id: 1,
          project_id: 1
        }
      },
      {
        end: () => {
          console.log("seed task updated");
        }
      },
      true
    );
  },

  () => {
    return handlerTasks.tasks.updateTasks(
      {
        params: { task_id: 3 },
        body: {
          user_id: 4,
          team_id: 1,
          project_id: 1
        }
      },
      {
        end: () => {
          console.log("seed task updated");
        }
      },
      true
    );
  },

  () => {
    return handlerTasks.tasks.updateTasks(
      {
        params: { task_id: 4 },
        body: {
          user_id: 1,
          team_id: 1,
          project_id: 1
        }
      },
      {
        end: () => {
          console.log("seed task updated");
        }
      },
      true
    );
  },

  () => {
    return handlerTasks.tasks.updateTasks(
      {
        params: { task_id: 5 },
        body: {
          user_id: 2,
          team_id: 1,
          project_id: 1
        }
      },
      {
        end: () => {
          console.log("seed task updated");
        }
      },
      true
    );
  },

  () => {
    return handlerTasks.tasks.updateTasks(
      {
        params: { task_id: 6 },
        body: {
          user_id: 3,
          team_id: 1,
          project_id: 1
        }
      },
      {
        end: () => {
          console.log("seed task updated");
        }
      },
      true
    );
  },

  () => {
    return handlerAnnouncements.announcements.createNewAnnouncements(
      {
        body: {
          announcement: "Scrum stand ups daily at 8:30am",
          user_id: 1,
          team_id: 1
        }
      },
      {
        end: () => {
          console.log("seed announcement added");
        }
      },
      true
    );
  },

  () => {
    return handlerAnnouncements.announcements.createNewAnnouncements(
      {
        body: {
          announcement:
            "Check out the new Angular documents posted in the resources",
          user_id: 2,
          team_id: 1
        }
      },
      {
        end: () => {
          console.log("seed announcement added");
        }
      },
      true
    );
  },

  () => {
    return handlerAnnouncements.announcements.createNewAnnouncements(
      {
        body: {
          announcement: "Sign up to go to the game on Friday",
          user_id: 3,
          team_id: 1
        }
      },
      {
        end: () => {
          console.log("seed announcement added");
        }
      },
      true
    );
  },

  () => {
    return handlerAnnouncements.announcements.createNewAnnouncements(
      {
        body: {
          announcement: "Weekly Meeting Moved to Mondays at 9am",
          user_id: 4,
          team_id: 1
        }
      },
      {
        end: () => {
          console.log("seed announcement added");
        }
      },
      true
    );
  },

  () => {
    return handlerResources.resources.createNewResources(
      {
        body: {
          URL: "www.google.com",
          notes: "best website ever, must see!!",
          user_id: 1,
          team_id: 1
        }
      },
      {
        end: () => {
          console.log("seed resources added");
        }
      },
      true
    );
  },

  () => {
    return handlerResources.resources.createNewResources(
      {
        body: {
          URL: "www.facebook.com",
          notes: "great site to help you get some friends",
          user_id: 2,
          team_id: 1
        }
      },
      {
        end: () => {
          console.log("seed resources added");
        }
      },
      true
    );
  },

  () => {
    return handlerResources.resources.createNewResources(
      {
        body: {
          URL: "www.yahoo.com",
          notes: "nobody uses this anymore",
          user_id: 3,
          team_id: 1
        }
      },
      {
        end: () => {
          console.log("seed resources added");
        }
      },
      true
    );
  }
];

const seed = () => {
  seedData.forEach((func, index) => {
    setTimeout(func, 1000 * (index + 1));
  });
};

seed();
