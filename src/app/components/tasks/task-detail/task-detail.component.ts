import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Component, OnInit, Input } from '@angular/core';

import { AppFacade } from '../../../state/app.facade';

import { TaskFacade } from '../../../store/task/task.facade'
import { TagFacade } from '../../../store/tag/tag.facade'

import { Task } from '../../../models/task';
import { Tag } from '../../../models/tag';

import { TaskService }  from '../../../services/task/task.service';
import { TagService } from '../../../services/tag/tag.service';

import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss'],
  // providers: [MessageService],
})
export class TaskDetailComponent implements OnInit {

  @Input() task: Task;

  tags$ = this.tagFacade.tags$;
  
  constructor(
    // private messageService: MessageService,
    private location: Location,
    private snackBar: MatSnackBar,
    private taskFacade: TaskFacade,
    private tagFacade: TagFacade,
  ) { 
    // this.task$.subscribe((task) => this.task = task);
  }

  ngOnInit(): void { }

  save(): void {
    if (this.task.id) {
      this.taskFacade.updateTask(this.task);
    } else {
      this.taskFacade.addTask(this.task);  
    }
    this.task = null;
  }

  delete(): void {
    this.taskFacade.deleteTask(this.task);
    this.task = null;
  }
  
  showSuccess(description: string) {
    // this.messageService.add({severity:'success', summary: 'Success', detail: description});
    let snackBarRef = this.snackBar.open(description, '', { duration: 2000 });
  }

  goBack(): void {
    this.location.back();
  }   

}
