import { Component, Inject } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';

import { PhasesComponent } from '../../projects/project-details/phases/phases.component';

import { ProjectsService } from '../../services/projects-service/projects.service';

@Component({
  selector: 'app-assign-user-task',
  templateUrl: './assign-user-task.component.html',
  styleUrls: ['./assign-user-task.component.css']
})

export class AssignUserTaskComponent {

  private results: Object = this.data;
  constructor(
    @Inject(MD_DIALOG_DATA) public data: any,
    private dialogRef: MdDialogRef<AssignUserTaskComponent>,
    private projectsService: ProjectsService
  ) { }

  changeResults(userId: number): void {
    this.results[userId] = !this.results[userId];
  }
}
