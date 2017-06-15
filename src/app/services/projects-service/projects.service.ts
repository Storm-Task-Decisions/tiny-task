import { Headers, Http } from '@angular/http';
import { Injectable } from '@angular/core';

// Import ReactiveJS toPromise
import 'rxjs/add/operator/toPromise';

import { Project } from '../../projects/Project';
import { Phase } from '../../projects/project-details/phases/Phase';
import { Task } from '../../projects/project-details/phases/tasks/Task';
import { User } from '../../projects/project-details/project-user/User';
import { environment } from '../../../environments/environment';


@Injectable()
export class ProjectsService {
  private headers = new Headers({'Content-type': 'application/JSON'});
  private baseUrl: string = environment.serverUrl;

  public projectIds: number[] = [];

  public projects: Project[] = [];
  public currentProject: Project;
  public phases: Phase[] = [];
  public usersOnProject: User[];
  public totalWeight: number;
  public completeWeight: number;
  public progress: number;

  constructor(private http: Http) { }

  private handleError(error: any): Promise<any> {
    console.error('An error occured', error);
    return Promise.reject(error.message || error);
  }

  // Fetch Information
  getProject(projectId: number, mainView: boolean): void {
    this.http.get(`${this.baseUrl}/api/projects/${projectId}`)
      .toPromise()
      .then( (response) => {
        this.projects.push(response.json().project_info);
        if ( !mainView ) {
          this.totalWeight = 0;
          this.completeWeight = 0;
          this.progress = 0;
          this.usersOnProject = response.json().user_info;
          this.phases = response.json().phase_info;
          this.currentProject = response.json().project_info;
        }
      })
      .catch(this.handleError);
  }

  getProjectIds(userId: number): void {
    this.http.get(`${this.baseUrl}/api/projects/user/${userId}`)
      .toPromise()
      .then( (response) => {
        this.projectIds = response.json();
      })
  }

  getTasks(phaseId: number): Promise<Task[]> {
    return this.http.get(`${this.baseUrl}/api/tasks/${phaseId}`)
            .toPromise()
            .then((response) => {
              response.json().task_info.forEach((task) => {
                if ( task.complete ) {
                  this.completeWeight += task.task_weight;
                }

                this.totalWeight += task.task_weight;
                this.progress = Math.floor((this.completeWeight / this.totalWeight) * 100);
              });
              return response.json();
            })
            .catch(this.handleError);
  }

  getUsersOnTask(taskId: number): Promise<any> {
    return this.http.get(`${this.baseUrl}/api/tasks/users/${taskId}`)
            .toPromise()
            .then(response => {
              return response.json();
            })
            .catch(this.handleError);
  }

  getUserTasks(userId: number, projectId: number): Promise<Task[]> {
    return this.http.get(`${this.baseUrl}/api/tasks/${projectId}/users/${userId}`)
            .toPromise()
            .then( (response) => {
              return response.json();
            })
            .catch(this.handleError);
  }

  getTeamProjects(teamId: number): Promise<any> {
    return this.http.get(`${this.baseUrl}/api/projects/teams/${teamId}`)
      .toPromise()
      .then( (response) => {
        this.projectIds = response.json();
      })
      .catch(this.handleError);
  }

  getUserProjects(userId: number): Promise<any> {
    return this.http.get(`${this.baseUrl}/api/users/projects/${userId}`)
      .toPromise()
      .then( (response) => {
        this.projectIds = response.json();
      })
      .catch(this.handleError);
  }

  getUserProjectsAndTasks(userId: number, teamId): Promise<any> {
    return this.http.get(`${this.baseUrl}/api/projects/teams/${teamId}/users/${userId}`)
      .toPromise()
      .then( (response) => {
        return response.json();
      })
      .catch(this.handleError);
  }

  // Post Information
  createProject(teamId: number, userId: number): void {
    this.http.post(
      `${this.baseUrl}/api/projects`,
      JSON.stringify({project_name: 'New Project', user_id: userId, team_id: teamId}),
      {headers: this.headers})
      .toPromise()
      .then( (response) => {
        this.projects.push(response.json().project_info);
        this.projectIds.push(response.json().project_info.id);
      })
      .catch(this.handleError);
  }

  createPhase(projectId: number): void {
    this.http.post(
      `${this.baseUrl}/api/phases/${projectId}`,
      JSON.stringify({phase_name: "New Phase"}),
      {headers: this.headers})
      .toPromise()
      .then( (response) => {
        this.phases.push(response.json());
      })
      .catch(this.handleError);
  }

  createTask(phaseId: number): Promise<Task> {
    return this.http.post(
            `${this.baseUrl}/api/tasks/${phaseId}`,
            JSON.stringify({task_name: 'New Task'}),
            {headers: this.headers})
            .toPromise()
            .then( (response) => {
              this.totalWeight += 1;
              this.progress = Math.floor((this.completeWeight / this.totalWeight) * 100);
              return response.json();
            })
            .catch(this.handleError);
  }

  // Edit Information
  editProjectName(projectId: number, projectName: string): void {
    this.http.put(
      `${this.baseUrl}/api/projects/${projectId}`,
      JSON.stringify({projectId: projectId, projectChanges: {project_name: projectName}}),
      {headers: this.headers})
      .toPromise()
      .then( (response) => {
        this.projects.find(project => project.id === projectId).project_name = projectName;
      })
      .catch(this.handleError);
  }

  editProjectCompleteStatus(projectId: number, projectName: string, projectCompleted: boolean): void {
    this.http.put(
      `${this.baseUrl}/api/projects/${projectId}`,
      JSON.stringify({projectId: projectId, projectChanges: {project_name: projectName, complete: projectCompleted}}),
      {headers: this.headers})
      .toPromise()
      .then( (response) => {
        this.projects.find(project => project.id === projectId).complete = projectCompleted;
      })
      .catch(this.handleError);
  }

  editPhaseName(phaseId: number, phaseName: string): void {
    this.http.put(
      `${this.baseUrl}/api/phases/${phaseId}`,
      JSON.stringify({phase_name: phaseName}),
      {headers: this.headers})
      .toPromise()
      .then( (response) => {
        this.phases.find(phase => phase.id === phaseId).phase_name = phaseName;
      })
      .catch(this.handleError);
  }

  editTaskName(taskId: number, taskName: string): Promise<Task> {
    return this.http.put(
            `${this.baseUrl}/api/tasks/${taskId}`,
            JSON.stringify({taskChanges: {
                task_name: taskName
              }
            }),
            {headers: this.headers})
            .toPromise()
            .then(response => {
              return response.json();
            })
            .catch(this.handleError);
  }

  assignToTask(userId: number, taskId: number, teamId: number): void {
    this.http.put(
      `${this.baseUrl}/api/tasks/${taskId}`,
      JSON.stringify({user_id: userId, team_id: teamId, project_id: this.currentProject.id}),
      {headers: this.headers})
      .toPromise()
      .then()
      .catch(this.handleError);
  }

  updateTaskStatus(taskId: number, taskStatus: boolean): void {
    this.http.put(
      `${this.baseUrl}/api/tasks/${taskId}`,
      JSON.stringify({taskChanges: {complete: taskStatus}}),
      {headers: this.headers})
      .toPromise()
      .then( (response) => {
        if ( response.json().complete ) {
          this.completeWeight += response.json().task_weight;
        } else {
          this.completeWeight -= response.json().task_weight;
        }
        this.progress = Math.floor((this.completeWeight / this.totalWeight) * 100);
      })
      .catch(this.handleError);
  }

  updatePhaseOrder(projectId: number, phaseOrder: string): void {
    this.http.put(`${this.baseUrl}/api/projects/phases/${projectId}`, JSON.stringify({phase_order: phaseOrder}),
    {headers: this.headers})
    .toPromise()
    .then( (response) => {
    })
    .catch(this.handleError);
  }

  updateTaskPhaseId(taskId: number, phaseId: number): void {
    // console.log(taskId, phaseId);
    this.http.put(`${this.baseUrl}/api/tasks/${taskId}`, JSON.stringify({taskChanges: {phase_id: phaseId}}),
    {headers: this.headers})
    .toPromise()
    .then( (response) => {
    })
    .catch(this.handleError);
  }

  // Delete Information
  deleteProject(projectId: number): void {
    this.http.delete(`${this.baseUrl}/api/projects/${projectId}`)
      .toPromise()
      .then( (response) => {
        let projectToRemove = this.projects.findIndex(project => project.id === projectId);
        this.projects.splice(projectToRemove, 1);
      })
      .catch(this.handleError);
  }

  deletePhase(phaseId: number, tasks: Task[]): void {
    this.http.delete(`${this.baseUrl}/api/phases/${phaseId}`)
      .toPromise()
      .then( (response) => {
        let phaseToRemove = this.phases.findIndex(phase => phase.id === phaseId);
        this.phases.splice(phaseToRemove, 1);
        tasks.forEach((task) => {
          if ( task.complete ) {
            this.completeWeight -= task.task_weight;
          }

          this.totalWeight -= task.task_weight;
        });
        this.progress = this.totalWeight !== 0 ? Math.floor((this.completeWeight / this.totalWeight) * 100) : 0;
      })
      .catch(this.handleError);
  }

  deleteTask(taskId: number, task: Task): void {
    this.http.delete(`${this.baseUrl}/api/tasks/${taskId}`)
      .toPromise()
      .then( (response) => {
        if ( task.complete ) {
          this.completeWeight -= task.task_weight;
        }

        this.totalWeight -= task.task_weight;
        this.progress = this.totalWeight !== 0 ? Math.floor((this.completeWeight / this.totalWeight) * 100) : 0;
      })
      .catch(this.handleError);
  }

  removeUserFromTask(userId: number, taskId: number): void {
    this.http.delete(
      `${this.baseUrl}/api/tasks/users/${userId}/${taskId}`)
      .toPromise()
      .then()
      .catch(this.handleError);
  }
}