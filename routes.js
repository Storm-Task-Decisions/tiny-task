const router = require("express").Router();
const handlerUsers = require("./util/requestHandlers/users.js");
const handlerTeams = require("./util/requestHandlers/teams.js");
const handlerProjects = require("./util/requestHandlers/projects.js");
const handlerPhases = require("./util/requestHandlers/phases.js");
const handlerTasks = require("./util/requestHandlers/tasks.js");
const handlerAnnouncements = require("./util/requestHandlers/announcements.js");
const handlerResources = require("./util/requestHandlers/resources.js");

// router.get('/login', -)

//////////USERS/////////////////
router.get("/users/profile/:user_id", handlerUsers.users.retrieveProfile);
router.get("/users/search/:query", handlerUsers.users.searchUser);
router.get("/users/projects/:user_id", handlerUsers.users.retrieveUserProjectID);
router.post("/users/:auth_info", handlerUsers.users.retrieveUser);
router.put("/users/:user_id", handlerUsers.users.updateUser);
router.delete("/users/:user_id", handlerUsers.users.deleteUser);


//////////TEAMS/////////////////
router.get("/teams/:team_id", handlerTeams.teams.retrieveTeams);
router.get("/teams/users/:user_id", handlerUsers.users.getUserTeams);
router.post("/teams", handlerTeams.teams.createNewTeams);
router.put("/teams/:team_id", handlerTeams.teams.updateTeams);
router.delete("/teams/:team_id", handlerTeams.teams.deleteTeams);
router.delete("/teams/users/:user_id/:team_id", handlerUsers.users.deleteTeamUsers); //<===FIX

//////////PROJECTS/////////////////
router.get("/projects/:project_id", handlerProjects.projects.retrieveProjectById);
router.get("/projects/teams/:team_id", handlerProjects.projects.retrieveProjectsByTeam);
router.get("/projects/user/:user_id", handlerUsers.users.retrieveProjectIds);
router.get("/projects/teams/:team_id/users/:user_id", handlerProjects.projects.retrieveProjectAndTasks);
router.post("/projects", handlerProjects.projects.createNewProjects);
router.put("/projects/:project_id", handlerProjects.projects.updateProjects); //<===FIX
router.put("/projects/phases/:project_id", handlerProjects.projects.updatePhaseOrder);
router.delete("/projects/:project_id", handlerProjects.projects.deleteProjects);


//////////PHASES/////////////////
router.post("/phases/:project_id", handlerPhases.phases.createNewPhases);
router.put("/phases/:phase_id", handlerPhases.phases.updatePhases);
router.delete("/phases/:phase_id", handlerPhases.phases.deletePhases);

//////////TASKS/////////////////
router.get("/tasks/:phase_id", handlerTasks.tasks.retrieveTasksByPhaseId);
router.get("/tasks/:project_id/users/:user_id", handlerTasks.tasks.retrieveUserTasks);
router.post("/tasks/:phase_id", handlerTasks.tasks.createNewTasks);
router.put("/tasks/:task_id", handlerTasks.tasks.updateTasks);
router.delete("/tasks/:task_id", handlerTasks.tasks.deleteTasks);
router.delete("/tasks/users/:user_id/:task_id", handlerUsers.users.deleteTaskUsers);

////////ANNOUNCEMENTS/////////////////
router.get("/announcements/:team_id", handlerAnnouncements.announcements.retrieveAnnouncements);
router.post("/announcements",handlerAnnouncements.announcements.createNewAnnouncements);
router.put("/announcements/:announcement_id", handlerAnnouncements.announcements.updateAnnouncements);
router.delete("/announcements/:announcement_id", handlerAnnouncements.announcements.deleteAnnouncements);

////////RESOURCES/////////////////
router.get("/resources/:team_id", handlerResources.resources.retrieveResources);
router.post("/resources", handlerResources.resources.createNewResources);
router.put("/resources/:resources_id", handlerResources.resources.updateResources);
router.delete("/resources/:resources_id", handlerResources.resources.deleteResources);


module.exports = router;
