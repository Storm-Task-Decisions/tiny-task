# tiny-task

## Team

  - __Product Owner__: [Kevin Nguyen]()
  - __Scrum Master__: [Brian Leung]()
  - __Development Team Members__: [Beth Stevic](), [David Hsiao]()

## Table of Contents
1. [API Routes](#routes)
    1. [Users](#users)
    1. [Teams](#teams)
    1. [Projects](#projects)
    1. [Phases](#phases)
    1. [Tasks](#tasks)

## Routes
Content-type: json/application

### Users
  * #### `GET /api/users/profile/:user_id`
  Retrieve User Profile

  Response Example:
  ```JSON
  {
      "id": 1,
      "full_name": "Kevin Nguyen",
      "email": "kevinN@tinytask.com",
      "user_status": "Newly Created Account!",
      "user_availability": "Available",
      "user_color": null,
      "createdAt": "2017-06-15T18:20:00.000Z",
      "updatedAt": "2017-06-15T18:20:00.000Z"
  }
  ```
    * #### `GET /api/users/search/:query`
  Search for a User Profile = query is the letter(s) that is(are) typed in the input box
    returns all profiles that with full_names that match

  Response Example:
  ```JSON
  [
    {
      "id": 2,
      "full_name": "Brian Leung",
      "email": "brianl@tinytask.com",
      "user_status": "Newly Created Account!",
      "user_availability": "Available",
      "user_color": null,
      "createdAt": "2017-06-15T18:20:01.000Z",
      "updatedAt": "2017-06-15T18:20:01.000Z"
    },
    {
      "id": 4,
      "full_name": "Beth Stevic",
      "email": "beths@tinytask.com",
      "user_status": "Newly Created Account!",
      "user_availability": "Available",
      "user_color": null,
      "createdAt": "2017-06-15T18:20:03.000Z",
      "updatedAt": "2017-06-15T18:20:03.000Z"
    }
  ]
  ```
    * #### `GET /api/users/project/:user_id`
  Retrieve User Project Ids

  Response Example:
  ```JSON
  [
    1, 2, 6
  ]
  ```


  * #### `POST /api/users/auth_info`
  Looks for a user, creates a new profile if none found

  auth_info Example:
  ```JSON
  {
    "name": "Kevin Nguyen",
    nickname": "kevinN@tinytask.com"
  }
  ```

  Response Example:
  ```JSON
  {
    "project_id": [],
    "user_profile": {
      "user_id": "1",
      "name": "Kevin Nguyen",
      "nickname": "kevin@tinytask.com",
      "user_status": "Newly Created Account!",
      "user_availability: "Available",
      "createdAt": "2017-06-15T18:20:00.000Z",
      "updatedAt": "2017-06-15T18:20:00.000Z"
    }
  }
  ```

  * #### `PUT /api/users/user_id`
  Updates a user
    Pass in the information you want changed in the request body

  Request Example:
  ```JSON
  {
    "full_name": "Kevin L Nguyen"
  }
  ```

  Response Example:
  {
    "id": 1,
    "full_name": "Kevin L Nguyen",
    "email": "kevinN@tinytask.com",
    "user_status": "Newly Created Account!",
    "user_availability": "Available",
    "user_color": null,
    "createdAt": "2017-06-15T18:20:00.000Z",
    "updatedAt": "2017-06-15T18:48:02.000Z"
  }
  ```

  * #### `DELETE /api/users/user_id`
  Delete a User

  Response Example:
    "user deleted"

### Teams
  * #### `GET /api/teams/:team_id`
  Retrieve Teams

  Response Example:
  ```JSON
    {
  "team_info": [
    {
      "id": 1,
      "team_name": "Storm Taskers",
      "solo_team": false,
      "createdAt": "2017-06-15T18:20:04.000Z",
      "updatedAt": "2017-06-15T18:20:04.000Z"
    }
  ],
  "user_info": [
    {
      "id": 2,
      "full_name": "Brian Leung",
      "email": "brianl@tinytask.com",
      "user_status": "Newly Created Account!",
      "user_availability": "Available",
      "createdAt": "2017-06-15T18:20:01.000Z",
      "updatedAt": "2017-06-15T18:20:01.000Z"
    },
    {
      "id": 3,
      "full_name": "David Hsiao",
      "email": "davidh@tinytask.com",
      "user_status": "Newly Created Account!",
      "user_availability": "Available",
      "createdAt": "2017-06-15T18:20:02.000Z",
      "updatedAt": "2017-06-15T18:20:02.000Z"
    },
    {
      "id": 4,
      "full_name": "Beth Stevic",
      "email": "beths@tinytask.com",
      "user_status": "Newly Created Account!",
      "user_availability": "Available",
      "createdAt": "2017-06-15T18:20:03.000Z",
      "updatedAt": "2017-06-15T18:20:03.000Z"
    }
  ]
  ```
* #### `GET /api/teams/users/user_id`
Retrieve all teams for a specific user

  Response Example:
  ```JSON
    [
  {
    "id": 1,
    "team_name": "Storm Taskers",
    "solo_team": false,
    "createdAt": "2017-06-15T18:20:04.000Z",
    "updatedAt": "2017-06-15T18:20:04.000Z"
  },
  {
    "id": 2,
    "team_name": "My Own Project",
    "solo_team": true,
    "createdAt": "2017-06-15T18:20:04.000Z",
    "updatedAt": "2017-06-15T18:20:04.000Z"
  }
]
  ```

  * #### `POST /api/teams`

  Request Example:

  ```JSON
    {
      "team_name": "The Destroyers",
      "user_id": "2",
      "solo_team": false
    }
  ```

  Response Example:
  ```JSON
    {
      "team_info": {
        "id": 3,
        "team_name": "The Destroyers",
        "solo_team": false,
        "updatedAt": "2017-06-15T18:58:35.000Z",
        "createdAt": "2017-06-15T18:58:35.000Z"
      },
      "user_info": {
        "id": 6,
        "team_id": 3,
        "user_id": "2",
        "updatedAt": "2017-06-15T18:58:35.000Z",
        "createdAt": "2017-06-15T18:58:35.000Z"
      }
    }
  ```
  * #### `PUT/api/teams/:team_id`
  **Add a team user
  Request Example:

  ```JSON
    {
      "user_id": "3",
    }
  ```
  Response Example:

  ```JSON
    {
      "team_info": [
        {
          "id": 2,
          "team_name": "The Destroyers",
          "solo_team": false,
          "createdAt": "2017-06-15T18:43:01.000Z",
          "updatedAt": "2017-06-15T18:43:01.000Z"
        }
      ],
      "user_info": [
        {
          "id": 5,
          "full_name": "Kevin Nguyen",
          "email": "kevinN@tinytask.com",
          "user_status": "Newly Created Account!",
          "user_availability": "Available",
          "user_color": null,
          "createdAt": "2017-06-15T18:43:01.000Z",
          "updatedAt": "2017-06-15T18:43:01.000Z"
        },
        {
          "id": 3,
          "full_name": "David Hsiao",
          "email": "davidh@tinytask.com",
          "user_status": "Newly Created Account!",
          "user_availability": "Available",
          "user_color": null,
          "createdAt": "2017-06-15T18:20:02.000Z",
          "updatedAt": "2017-06-15T18:20:02.000Z"
        },
      ]
    }
  ```

  * #### `DELETE /api/teams/:team_id`
  Remove a team

  Response Example:
    "team deleted"

  * #### `DELETE /api/teams/:user_id/:team_id`
  Remove a team

  Response Example:
    "team user deleted from team"

### Projects
  * #### `GET /api/projects/:project_id`
  Retrieve a project

  Response Example:
  ```JSON
    {
      "project_info": {
        "id": 1,
        "project_name": "Tiny Task",
        "phase_order": "1, 2, 3",
        "complete": false,
        "createdAt": "2017-06-15T19:14:47.000Z",
        "updatedAt": "2017-06-15T19:14:47.000Z",
        "user_id": 1,
        "team_id": 1
      },
      "team_info": [
        {
          "id": 1,
          "team_name": "Storm Taskers",
          "solo_team": false,
          "createdAt": "2017-06-15T19:14:43.000Z",
          "updatedAt": "2017-06-15T19:14:43.000Z"
        }
      ],
      "user_info": [
        {
          "id": 1,
          "full_name": "Kevin Nguyen",
          "email": "kevinN@tinytask.com",
          "user_status": "Newly Created Account!",
          "user_availability": "Available",
          "user_color": null,
          "createdAt": "2017-06-15T19:14:39.000Z",
          "updatedAt": "2017-06-15T19:14:39.000Z"
        },
        {
          "id": 2,
          "full_name": "Brian Leung",
          "email": "brianl@tinytask.com",
          "user_status": "Newly Created Account!",
          "user_availability": "Available",
          "user_color": null,
          "createdAt": "2017-06-15T19:14:40.000Z",
          "updatedAt": "2017-06-15T19:14:40.000Z"
        },
        {
          "id": 3,
          "full_name": "David Hsiao",
          "email": "davidh@tinytask.com",
          "user_status": "Newly Created Account!",
          "user_availability": "Available",
          "user_color": null,
          "createdAt": "2017-06-15T19:14:41.000Z",
          "updatedAt": "2017-06-15T19:14:41.000Z"
        },
        {
          "id": 4,
          "full_name": "Beth Stevic",
          "email": "beths@tinytask.com",
          "user_status": "Newly Created Account!",
          "user_availability": "Available",
          "user_color": null,
          "createdAt": "2017-06-15T19:14:42.000Z",
          "updatedAt": "2017-06-15T19:14:42.000Z"
        }
      ],
      "phase_info": [
        {
          "id": 1,
          "phase_name": "Phase 1",
          "phase_color": "red",
          "phase_order": 1,
          "phase_status": "In Progress",
          "createdAt": "2017-06-15T19:14:48.000Z",
          "updatedAt": "2017-06-15T19:14:48.000Z",
          "project_id": 1
        },
        {
          "id": 2,
          "phase_name": "Phase 2",
          "phase_color": "red",
          "phase_order": 1,
          "phase_status": "In Progress",
          "createdAt": "2017-06-15T19:14:49.000Z",
          "updatedAt": "2017-06-15T19:14:49.000Z",
          "project_id": 1
        },
        {
          "id": 3,
          "phase_name": "Phase 3",
          "phase_color": "red",
          "phase_order": 1,
          "phase_status": "In Progress",
          "createdAt": "2017-06-15T19:14:50.000Z",
          "updatedAt": "2017-06-15T19:14:50.000Z",
          "project_id": 1
        }
      ]
    }
  ```

  * #### `GET /api/projects/teams/:team_id`
  Retrieve project id for a specific team

  Response Example:
  ```JSON
  {
    [
      1
    ]
  }
  ```

  * #### `GET /api/projects/user/:user_id`
  Retrieve project ids for a specific user

  Response Example:
  ```JSON
  {
    [
      1, 4, 7
    ]
  }
  ```

  * #### `GET /api/projects/teams/:team_id/users/:user_id`
  Retrieve all projects and tasks for a specific user


  Response Example:
  ```JSON
    [
      {
        "project_info": {
          "id": 1,
          "project_name": "Tiny Task",
          "phase_order": "1, 2, 3",
          "complete": false,
          "createdAt": "2017-06-15T19:14:47.000Z",
          "updatedAt": "2017-06-15T19:14:47.000Z",
          "user_id": 1,
          "team_id": 1
        },
        "tasks_info": [
          {
            "id": 1,
            "task_name": "Create back-end",
            "complete": false,
            "task_color": "green",
            "task_weight": 1,
            "stage": "in progress",
            "createdAt": "2017-06-15T19:14:51.000Z",
            "updatedAt": "2017-06-15T19:14:51.000Z",
            "phase_id": 1
          },
          {
            "id": 4,
            "task_name": "Write more functions",
            "complete": true,
            "task_color": "orange",
            "task_weight": 1,
            "stage": "done",
            "createdAt": "2017-06-15T19:14:54.000Z",
            "updatedAt": "2017-06-15T19:14:54.000Z",
            "phase_id": 2
          }
        ]
      }
    ]
  ```

  * #### `POST /api/projects/`
  Create a project

  Request Example:
  ```JSON
  {
    "project_name": "Tiny Task",
    "user_id": "1",
    "team_id": 1,
    "phase_order": "[]"
  }
  ```

  Response Example:
  ```JSON
    {
      "project_info": {
        "complete": false,
        "id": 2,
        "project_name": "Tiny Task",
        "user_id": "1",
        "team_id": 1,
        "phase_order": "[]",
        "updatedAt": "2017-06-15T19:24:52.000Z",
        "createdAt": "2017-06-15T19:24:52.000Z"
      },
      "team_info": [
        {
          "id": 1,
          "team_name": "Storm Taskers",
          "solo_team": false,
          "createdAt": "2017-06-15T19:14:43.000Z",
          "updatedAt": "2017-06-15T19:14:43.000Z"
        }
      ],
      "user_info": [
        {
          "id": 1,
          "full_name": "Kevin Nguyen",
          "email": "kevinN@tinytask.com",
          "user_status": "Newly Created Account!",
          "user_availability": "Available",
          "user_color": null,
          "createdAt": "2017-06-15T19:14:39.000Z",
          "updatedAt": "2017-06-15T19:14:39.000Z"
        },
        {
          "id": 2,
          "full_name": "Brian Leung",
          "email": "brianl@tinytask.com",
          "user_status": "Newly Created Account!",
          "user_availability": "Available",
          "user_color": null,
          "createdAt": "2017-06-15T19:14:40.000Z",
          "updatedAt": "2017-06-15T19:14:40.000Z"
        },
        {
          "id": 3,
          "full_name": "David Hsiao",
          "email": "davidh@tinytask.com",
          "user_status": "Newly Created Account!",
          "user_availability": "Available",
          "user_color": null,
          "createdAt": "2017-06-15T19:14:41.000Z",
          "updatedAt": "2017-06-15T19:14:41.000Z"
        },
        {
          "id": 4,
          "full_name": "Beth Stevic",
          "email": "beths@tinytask.com",
          "user_status": "Newly Created Account!",
          "user_availability": "Available",
          "user_color": null,
          "createdAt": "2017-06-15T19:14:42.000Z",
          "updatedAt": "2017-06-15T19:14:42.000Z"
        }
      ]
    }
  ```

  * #### `PUT /api/projects/:project_id`
  Update Project Info


  Request Example:
  ```JSON
    {
      "projectChanges": {
        "project_name": "Tremendous Task"
      }
    }
  ```

  Response Example:
  ```JSON
    {
      "project_info": {
        "id": 2,
        "project_name": "Tremendous Task",
        "phase_order": "[]",
        "complete": false,
        "createdAt": "2017-06-15T19:24:52.000Z",
        "updatedAt": "2017-06-15T19:24:52.000Z",
        "user_id": 1,
        "team_id": 1
      },
      "team_info": [
        {
          "id": 1,
          "team_name": "Storm Taskers",
          "solo_team": false,
          "createdAt": "2017-06-15T19:14:43.000Z",
          "updatedAt": "2017-06-15T19:14:43.000Z"
        }
      ],
      "user_info": [
        {
          "id": 1,
          "full_name": "Kevin Nguyen",
          "email": "kevinN@tinytask.com",
          "user_status": "Newly Created Account!",
          "user_availability": "Available",
          "user_color": null,
          "createdAt": "2017-06-15T19:14:39.000Z",
          "updatedAt": "2017-06-15T19:14:39.000Z"
        },
        {
          "id": 2,
          "full_name": "Brian Leung",
          "email": "brianl@tinytask.com",
          "user_status": "Newly Created Account!",
          "user_availability": "Available",
          "user_color": null,
          "createdAt": "2017-06-15T19:14:40.000Z",
          "updatedAt": "2017-06-15T19:14:40.000Z"
        },
        {
          "id": 3,
          "full_name": "David Hsiao",
          "email": "davidh@tinytask.com",
          "user_status": "Newly Created Account!",
          "user_availability": "Available",
          "user_color": null,
          "createdAt": "2017-06-15T19:14:41.000Z",
          "updatedAt": "2017-06-15T19:14:41.000Z"
        },
        {
          "id": 4,
          "full_name": "Beth Stevic",
          "email": "beths@tinytask.com",
          "user_status": "Newly Created Account!",
          "user_availability": "Available",
          "user_color": null,
          "createdAt": "2017-06-15T19:14:42.000Z",
          "updatedAt": "2017-06-15T19:14:42.000Z"
        }
      ]
    }
  ```

  * #### `PUT /api/projects/phases/:project_id`
  Update phase order

  Request Example:
  ```JSON
    {
      "phase_order": "1, 2, 3"
    }
  ```

  Response Example:
    "phase order updated"

  * #### `DELETE /api/projects/:project_id`
  Delete Project Info

  Response Example:
    "deleted"

### Phases
  * #### `POST /api/phases/:project_id`
  Create a phase for a project

  Request Example:
  ```JSON
  {
    "phase_name": "Phase 4",
    "phase_order": 4,
    "phase_status": "In progress",
    "phase_color": "green",
    "user_id": "1",
    "team_id": 1
  }
  ```

  Response Example:
  ```JSON
  {
    "id": 4,
    "project_id": "1",
    "phase_name": "Phase 4",
    "phase_order": 1,
    "phase_status": "In Progress",
    "phase_color": "red",
    "updatedAt": "2017-06-15T19:45:48.000Z",
    "createdAt": "2017-06-15T19:45:48.000Z"
  }
  ```

  * #### `PUT /api/phases/:phase_id`
  Update a phase for a project
    Only send the information that you need changed in the body

  Request Example:
  ```JSON
  {
    "phase_status": "complete"
  }
  ```

  Response Example:
  ```JSON
  {
    "id": 4,
    "phase_name": "Phase 4",
    "phase_color": "red",
    "phase_order": 1,
    "phase_status": "complete",
    "createdAt": "2017-06-15T19:45:48.000Z",
    "updatedAt": "2017-06-15T19:47:35.000Z",
    "project_id": 1
  }
  ```

  * #### `DELETE /api/phases/:project_id/:phase_id`
  Delete a phase for a project

  Response Example:
    "deleted"


### Tasks
  * #### `GET /api/tasks/:phase_id`
  Retrieve all tasks for a specific phase

  Response Example:
  ```JSON
    {
      "user_info": [],
      "task_info": [
        {
          "id": 1,
          "task_name": "Create back-end",
          "complete": false,
          "task_color": "green",
          "task_weight": 1,
          "stage": "in progress",
          "createdAt": "2017-06-15T19:49:41.000Z",
          "updatedAt": "2017-06-15T19:49:41.000Z",
          "phase_id": 1
        },
        {
          "id": 2,
          "task_name": "Create front-end",
          "complete": false,
          "task_color": "blue",
          "task_weight": 1,
          "stage": "in progress",
          "createdAt": "2017-06-15T19:49:42.000Z",
          "updatedAt": "2017-06-15T19:49:42.000Z",
          "phase_id": 1
        }
      ]
    }
  ```

  * #### `GET /api/tasks/:project_id/users/:user_id`
  Retrieve all tasks for a specific user on a specific project

  Response Example:
  ```JSON
    [
      {
        "id": 1,
        "task_name": "Create back-end",
        "complete": false,
        "task_color": "green",
        "task_weight": 1,
        "stage": "in progress",
        "createdAt": "2017-06-15T19:49:41.000Z",
        "updatedAt": "2017-06-15T19:49:41.000Z",
        "phase_id": 1
      },
      {
        "id": 4,
        "task_name": "Write more functions",
        "complete": true,
        "task_color": "orange",
        "task_weight": 1,
        "stage": "done",
        "createdAt": "2017-06-15T19:49:44.000Z",
        "updatedAt": "2017-06-15T19:49:44.000Z",
        "phase_id": 2
      }
    ]
  ```

  * #### `POST /api/tasks/:phase_id`
  Create a task for a phase

  Request Example:
  ```JSON
    {
     "task_name": "Start Project",
      "complete": false,
      "task_color": "yellow",
      "stage": "back-log"
    }
  ```

  Response Example:
  ```JSON
    {
      "task_weight": 1,
      "id": 7,
      "task_name": "Start Project",
      "task_color": "yellow",
      "complete": false,
      "stage": "back-log",
      "phase_id": "1",
      "updatedAt": "2017-06-15T20:01:58.000Z",
      "createdAt": "2017-06-15T20:01:58.000Z"
    }
  ```

  * #### `PUT /api/tasks/:task_id`
  Update a task


  Request Example:
  ```JSON
    {
      "taskChanges": {
        "complete": true,
      }
    }
  ```

  Response Example:
  ```JSON
    {
      "task_weight": 1,
      "id": 7,
      "task_name": "Start Project",
      "task_color": "yellow",
      "complete": false,
      "stage": "back-log",
      "phase_id": "1",
      "updatedAt": "2017-06-15T20:01:58.000Z",
      "createdAt": "2017-06-15T20:01:58.000Z"
    }
  ```

  * #### `DELETE /api/tasks/:task_id`
  Delete a task

  Response Example:
    "taskDeleted"

  * #### `DELETE /api/tasks/users/:user_id/:task_id`
  Delete a task

  Response Example:
    "user deleted from task"

### Announcements
  * #### `GET /api/announcements/:team_id`
  Retrieve all announcements for a specific team

  Response Example:
    ```JSON
    {
      "announcements": [
        {
          "id": 1,
          "announcement": "Scrum stand ups daily at 8:30am",
          "createdAt": "2017-06-15T19:49:53.000Z",
          "updatedAt": "2017-06-15T19:49:53.000Z",
          "user_id": 1,
          "team_id": 1,
          "userName": "Kevin Nguyen"
        },
        {
          "id": 2,
          "announcement": "Check out the new Angular documents posted in the resources",
          "createdAt": "2017-06-15T19:49:54.000Z",
          "updatedAt": "2017-06-15T19:49:54.000Z",
          "user_id": 2,
          "team_id": 1,
          "userName": "Brian Leung"
        },
        {
          "id": 3,
          "announcement": "Sign up to go to the game on Friday",
          "createdAt": "2017-06-15T19:49:55.000Z",
          "updatedAt": "2017-06-15T19:49:55.000Z",
          "user_id": 3,
          "team_id": 1,
          "userName": "David Hsiao"
        },
        {
          "id": 4,
          "announcement": "Weekly Meeting Moved to Mondays at 9am",
          "createdAt": "2017-06-15T19:49:56.000Z",
          "updatedAt": "2017-06-15T19:49:56.000Z",
          "user_id": 4,
          "team_id": 1,
          "userName": "Beth Stevic"
        }
      ]
    }
  ```
  * #### `POST /api/announcements`
  Create new announcement

  Request Example:
  ```JSON
  {
    "announcement": "Team Lunch on Friday",
    "user_id": 1,
    "team_id": 1
  }
  ```

  Response Example:
  ```JSON
  {
    "id": 5,
    "announcement": "Team Lunch on Friday",
    "user_id": 1,
    "team_id": 1,
    "updatedAt": "2017-06-15T20:21:25.000Z",
    "createdAt": "2017-06-15T20:21:25.000Z",
    "userName": "Kevin Nguyen"
  }
  ```

  * #### `PUT /api/announcements/:announcement_id`
  Update announcement

  Request Example:
  ```JSON
    {
      "announcementChanges": {
        "announcement": "Team Lunch on Thursday"
      }
    }
  ```

  Response Example:
  ```JSON
    {
      "id": 5,
      "announcement": "Team Lunch on Thursday",
      "createdAt": "2017-06-15T20:21:25.000Z",
      "updatedAt": "2017-06-15T20:23:03.000Z",
      "user_id": 1,
      "team_id": 1
    }
  ```

  * #### `DELETE /api/announcements/:announcement_id`
  Delete announcement

  Response Example:
    "announcementDeleted"

### Resources
  * #### `GET /api/resources/:team_id`
  Retrieve all resources for a specific team

  Response Example:
  ```JSON
    {
      [
        {
          "id": 1,
          "URL": "www.google.com",
          "notes": "best website ever, must see!!",
          "createdAt": "2017-06-15T19:49:57.000Z",
          "updatedAt": "2017-06-15T19:49:57.000Z",
          "user_id": 1,
          "team_id": 1
        },
        {
          "id": 2,
          "URL": "www.facebook.com",
          "notes": "great site to help you get some friends",
          "createdAt": "2017-06-15T19:49:58.000Z",
          "updatedAt": "2017-06-15T19:49:58.000Z",
          "user_id": 2,
          "team_id": 1
        },
        {
          "id": 3,
          "URL": "www.yahoo.com",
          "notes": "nobody uses this anymore",
          "createdAt": "2017-06-15T19:49:59.000Z",
          "updatedAt": "2017-06-15T19:49:59.000Z",
          "user_id": 3,
          "team_id": 1
        }
      ]
    }
  ```

  * #### `POST /api/resources`
  Create new resource

  Request Example:
  ```JSON
    {
      "URL": "www.tinytask.herokuapp.com",
      "notes": "The best project management app ever!!",
      "user_id": 1,
      "team_id": 1
    }
  ```

  Response Example:
  ```JSON
    {
      "id": 4,
      "URL": "www.tinytask.herokuapp.com",
      "notes": "The best project management app ever!!",
      "user_id": 1,
      "team_id": 1,
      "updatedAt": "2017-06-15T20:29:33.000Z",
      "createdAt": "2017-06-15T20:29:33.000Z"
    }
  ```

  * #### `PUT /api/resources/:resources_id`
  Update resources
    Only send the information that you need updated

  Request Example:
  ```JSON
    {
      "notes": "The absolute best project management app ever!!"
    }
  ```

  Response Example:
  ```JSON
    {
      "id": 4,
      "URL": "www.tinytask.herokuapp.com",
      "notes": "The absolute best project management app ever!!",
      "createdAt": "2017-06-15T20:29:33.000Z",
      "updatedAt": "2017-06-15T20:31:34.000Z",
      "user_id": 1,
      "team_id": 1
    }
  ```

  * #### `DELETE /api/resources/:resources_id`
  Delete resource

  Response Example:
    "resourceDeleted"

