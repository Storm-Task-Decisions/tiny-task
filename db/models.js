const Sequelize = require("sequelize");

let connection;
if (process.env.DATABASE_URL) {
  connection = new Sequelize(process.env.DATABASE_URL, {
    dialect: "postgres",
    protocol: "postgres",
    logging: false
  });
} else {
  connection = new Sequelize("tiny_task", "root", "", {
    logging: false
  });
}

const Users = connection.define("users", {
  auth_token: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    primaryKey: true
  }
});

const User_Profile = connection.define("user_profile", {
  full_name: { type: Sequelize.STRING, allowNull: false },
  email: { type: Sequelize.STRING },
  user_status: { type: Sequelize.STRING },
  user_availability: { type: Sequelize.STRING },
  user_color: { type: Sequelize.STRING }
});

Users.belongsTo(User_Profile, {
  foreignKey: {
    name: "user_profile_id",
    targetKey: "id",
    allowNull: false,
    unique: true
  },
  onDelete: "CASCADE"
});

const Teams = connection.define("teams", {
  team_name: { type: Sequelize.STRING, allowNull: true },
  solo_team: { type: Sequelize.BOOLEAN, allowNull: false }
});

const Team_Users = connection.define("team_users", {});

User_Profile.hasMany(Team_Users, {
  foreignKey: { name: "user_id", targetKey: "id" },
  onDelete: "CASCADE"
});
Teams.hasMany(Team_Users, {
  foreignKey: { name: "team_id", targetKey: "id" },
  onDelete: "CASCADE"
});

const Projects = connection.define("projects", {
  project_name: { type: Sequelize.STRING, allowNull: false },
  phase_order: { type: Sequelize.STRING, allowNull: true },
  complete: { type: Sequelize.BOOLEAN, defaultValue: false }
});

Projects.belongsTo(User_Profile, {
  foreignKey: { name: "user_id", target: "id" },
  onDelete: "CASCADE"
});
Projects.belongsTo(Teams, {
  foreignKey: { name: "team_id", targetKey: "id" },
  onDelete: "CASCADE"
});

const Phases = connection.define("phases", {
  phase_name: { type: Sequelize.STRING, allowNull: false },
  phase_color: { type: Sequelize.STRING, allowNull: false },
  phase_order: { type: Sequelize.INTEGER, allowNull: true },
  phase_status: { type: Sequelize.STRING, allowNull: false }
});

Phases.belongsTo(Projects, {
  foreignKey: { name: "project_id", targetKey: "id" },
  onDelete: "CASCADE"
});

const Tasks = connection.define("tasks", {
  task_name: { type: Sequelize.STRING },
  complete: { type: Sequelize.BOOLEAN, defaultValue: false },
  task_color: { type: Sequelize.STRING },
  task_weight: { type: Sequelize.INTEGER, defaultValue: 1 },
  stage: { type: Sequelize.STRING, allowNull: false }
});
Tasks.belongsTo(Phases, {
  foreignKey: { name: "phase_id", targetKey: "id" },
  onDelete: "CASCADE"
});

const User_Tasks = connection.define("user_tasks", {});

Tasks.hasMany(User_Tasks, {
  foreignKey: { name: "task_id", targetKey: "id" },
  onDelete: "CASCADE"
});
User_Profile.hasMany(User_Tasks, {
  foreignKey: { name: "user_id", targetKey: "id" },
  onDelete: "CASCADE"
});

Teams.hasMany(User_Tasks, {
  foreignKey: { name: "team_id", targetKey: "id" },
  onDelete: "CASCADE"
});

Projects.hasMany(User_Tasks, {
  foreignKey: { name: "project_id", targetKey: "id" },
  onDelete: "CASCADE"
});

const Messages = connection.define("messages", {
  message: { type: Sequelize.TEXT }
});
User_Profile.hasMany(Messages, {
  foreignKey: { name: "user_id", targetKey: "id" },
  onDelete: "CASCADE"
});
Teams.hasMany(Messages, {
  foreignKey: { name: "team_id", targetKey: "id" },
  onDelete: "CASCADE"
});

const Announcements = connection.define("announcements", {
  announcement: { type: Sequelize.STRING, allowNull: false }
});
User_Profile.hasMany(Announcements, {
  foreignKey: { name: "user_id", targetKey: "id" },
  onDelete: "CASCADE"
});
Teams.hasMany(Announcements, {
  foreignKey: { name: "team_id", targetKey: "id" },
  onDelete: "CASCADE"
});

const Shared_Resources = connection.define("shared_resources", {
  URL: { type: Sequelize.STRING },
  notes: { type: Sequelize.TEXT }
  // type: { type: Sequelize.STRING, allowNull: false }
});
User_Profile.hasMany(Shared_Resources, {
  foreignKey: { name: "user_id", targetKey: "id" },
  onDelete: "CASCADE"
});
Teams.hasMany(Shared_Resources, {
  foreignKey: { name: "team_id", targetKey: "id" },
  onDelete: "CASCADE"
});

const Team_Colors = connection.define("team_colors", {
  color: { type: Sequelize.STRING, allowNull: false }
});
Users.hasMany(Team_Colors, {
  foreignKey: { name: "user_id", targetKey: "auth_token" },
  onDelete: "CASCADE"
});
Teams.hasMany(Team_Colors, {
  foreignKey: { name: "team_id", targetKey: "id" },
  onDelete: "CASCADE"
});

connection.sync({}).then(() => {}).catch(error => {
  console.log(error);
});

exports.Users = Users;
exports.User_Profile = User_Profile;
exports.Teams = Teams;
exports.Team_Users = Team_Users;
exports.Projects = Projects;
exports.Phases = Phases;
exports.Tasks = Tasks;
exports.User_Tasks = User_Tasks;
exports.Messages = Messages;
exports.Announcements = Announcements;
exports.Shared_Resources = Shared_Resources;
exports.Team_Colors = Team_Colors;
