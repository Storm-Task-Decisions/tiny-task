import { Component, Input } from '@angular/core';

import { ProjectsService } from '../../../../services/projects-service/projects.service';

import { Task } from './Task';

@Component({
  selector: 'tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})

export class TasksComponent {
  @Input() task: Task;

  constructor(private projectsService: ProjectsService) { }

  editTaskName(taskId: number, newName: string): void {
    this.projectsService.editTaskName(taskId, newName)
      .then((updatedTask) => {
        this.task = updatedTask;
      });
  }

  handleError(): void {
    alert("144 Character Limit Exceeded");
  }
}
