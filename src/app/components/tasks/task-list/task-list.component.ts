import { Component, OnInit } from '@angular/core';

import { Task } from '../../../models/task';
// import TasksState from '../../../modules/tasks/tasks.state'
// import * as TasksActions from '../../../modules/tasks/tasks.actions'

import { Tag } from '../../../models/tag';

import { MatDialog } from '@angular/material/dialog';

// import { AppFacade } from '../../../state/app.facade'
import { TaskFacade } from '../../../store/task.facade'
import { TagFacade } from '../../../store/tag.facade'

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  tags$ = this.tagFacade.tags$;
  // selectedTags$ = this.appFacade.selectedTags$;

  tasks$ = this.taskFacade.tasks$;

  public tasks: Task[];
  tags: Tag[];
  selectedTagAll: boolean = true;
  
  selectedTags: Tag[] = [];

  constructor(
    public dialog: MatDialog,
    private taskFacade: TaskFacade,
    private tagFacade: TagFacade,
    ) { }

  ngOnInit(): void { }

  onSelect(task: Task): void {
    this.taskFacade.selectTask({...task});
  }

  createTask(): void {
    var task: Task = <Task>{
      name: "",
      due_date: null,
      frequency: "o",
      status: "o",
      notes: "",
      tags: [],
      subtasks: []
    };
    this.taskFacade.selectTask(task);
  }

}