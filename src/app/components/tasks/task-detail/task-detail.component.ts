import { Location } from '@angular/common';

import { Component, OnInit, Input } from '@angular/core';

import { TaskFacade } from '../../../store/task/task.facade'
import { TagFacade } from '../../../store/tag/tag.facade'

import { Task } from '../../../models/task';
import { Tag } from '../../../models/tag';

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
  tags: Tag[];
  
  constructor(
    // private messageService: MessageService,
    private location: Location,
    private snackBar: MatSnackBar,
    private taskFacade: TaskFacade,
    private tagFacade: TagFacade,
  ) {
    this.tags$.subscribe((tags) => this.tags = tags as Tag[]);
  }

  ngOnInit(): void { }

  selectTag(tag: Tag) {
    if (this.task.tags.includes(tag.id)) {
      var hasTag: Tag[] = this.tags.filter(t => t.path && t.path.includes(tag.id));
      hasTag.push(tag);
      this.task.tags = this.task.tags.filter(id => !hasTag.some(t => t.id == id));
    } else {
      if (tag.path) {
        this.task.tags = [...this.task.tags, ...tag.path.filter(i => this.task.tags.indexOf(i) < 0)];
      }
      this.task.tags = [...this.task.tags, tag.id];
    }
  }

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
