# tiny-task

## Team

  - __Product Owner__: [Kevin Nguyen]()
  - __Scrum Master__: [Brian Leung]()
  - __Development Team Members__: [Beth Stevic](), [David Hsiao]()

## Table of Contents
1. [API Routes](#routes)
  1. [User](#user)
  1. [Project](#project)

## Routes
Content-type: json/application

### User
* ### `GET /api/users/:auth_token`
Retrieve User Profile

Request Example:
```JSON
{
  "auth_token": "google-auth0-2903","
}
```

Response Example:
```JSON
{
  "user_profile": {
    "full_name": "Kevin Nguyen",
    "email": "kev_win@gmail.com",
    "user_availability": "true",
    "User_status": "Working"
  },
  "project_ids": [1, 2, 3, 4]
}
```


* ### `POST /api/users`
Create a user

Request Example:
```JSON
{
  "auth_token": "google-auth0-2903",
  "full_name": "Kevin Nguyen",
  "Email": "kevinn@tinytask.com",
  "User_status": "slacking off",
  "User_availability: "false"
}
```

Response Example:
```JSON
{
  "something": "Hello"
}
```

* ### `PUT /api/users`
Updates a user

Request Example:
```JSON
{
  "auth_token": "google-auth0-2903",
  "full_name": "Kevin Nguyen"
}
```

Response Example:
  {}

* ### `DELETE /api/users`
Delete a User

Request Example:
```JSON
{
  "auth_token": "google-auth0-2903",
}
```

Response Example:
  "Deleted User"

### Project
* ### `GET /api/project/:project_id`
Retrieve a project

Request Example:
```JSON
{
  "projectId": 1
}
```

Response Example:
```JSON
{
  "project_info": {
    "id": 1,
    "user_id": "google-auth0-2903",
    "team_id": 1,
    "project_name": "Tremendous Task",
    "complete": false
  },
  "team_info": {
    "id": 1,
    "team_name": "Storm Taskers"
  },
  "user_info": [
    {
      "id": 1,
      "full_name": "Kevin Nguyen",
      "email": "kev_win@gmail.com",
      "user_availability": "true",
      "User_status": "Working"
    }
  ]
}
```

* ### `POST /api/project/:project_id`
Create a project

Request Example:
```JSON
{
  "project_name": "Tiny Task",
  "auth_token": "google-auth0-2903",
  "team_id": 1
}
```

Response Example:
```JSON
{
  "project_info":{
    "id": 1,
    "user_id": "google-auth0-2903",
    "team_id": 1,
    "project_name": "Tremendous Task",
    "complete": "false"
  },
  "team_info": {
    "id": 1,
    "team_name": "Storm Taskers"
  },
  "user_info": [
    {
      "id": 1,
      "full_name": "Kevin Nguyen",
      "email": "kev_win@gmail.com",
      "user_availability": "true",
      "User_status": "Working"
    }
  ]
}
```

* ### `PUT /api/project/:project_id`
Update Project Info

Properties you can update:
  projectName,
  complete

Request Example:
```JSON
  {
    "projectId": 1,
    "projectChanges": {
      "projectName": "Tremendous Task"
    }
  }
```

Response Example:
```JSON
{
  "project_info": {
    "id": 1,
    "user_id": "google-auth0-2903",
    "team_id": 1,
    "project_name": "Tremendous Task",
    "complete": "false"
  },
  "team_info": {
    "id": "1",
    "team_name": "Storm Taskers"
  },
  "user_info": [
    {
      "id": 1,
      "full_name": "Kevin Nguyen",
      "email": "kev_win@gmail.com",
      "user_availability": "true",
      "User_status": "Working"
    }
  ]
}
```

* ### `DELETE /api/project/:project_id`
Gets Project Info

Request Example:
```JSON
{
  "projectId": 1
}
```

Response Example:
e.g. `"Delete Successful"`



// router.get('/api/teams', handler.teams.retrieveTeams);
router.post('/teams', handler.teams.createNewTeams);
// router.put('/api/teams', handler.teams.updateTeams);
// router.delete('/api/teams', handler.teams.deleteTeams);

// router.get('/api/messages', handler.messages.retrieveMessages);
// router.post('/api/messages', handler.messages.createNewMessages);
// router.delete('/api/messages', handler.messages.deleteMessages);

// router.get('/api/announcements', handler.announcements.retrieveAnnouncements);
// router.post('/api/announcements', handler.announcements.createNewAnnouncements);
// router.put('/api/announcements', handler.announcements.updateAnnouncements);
// router.delete('/api/announcements', handler.announcements.deleteAnnouncements);

// router.post('/phases', handler.phases.createNewPhases);
// router.put('/phases', handler.phases.updatePhases);
// router.delete('/phases', handler.phases.deletePhases);

// router.post('/tasks/:phase_id', handler.tasks.createNewTasks);
// router.put('/tasks', handler.tasks.updateTasks);
// router.delete('/tasks', handler.tasks.deleteTasks);

// router.get('/resources', handler.resources.retrieveResources);
// router.post('/resources', handler.resources.createNewResources);
// router.put('/resources', handler.resources.updateResources);
// router.delete('/resources', handler.resources.deleteResources);