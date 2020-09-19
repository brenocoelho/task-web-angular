import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Task } from 'src/app/models/task';
import { Tag } from 'src/app/models/tag';

import { TaskFacade } from './../../../store/task.facade';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss']
})
export class TaskItemComponent implements OnInit {

  @Input() task: Task;
  @Input() tags: Tag[];

  constructor(
    private router: Router,
    private taskFacade: TaskFacade,
  ) { }

  ngOnInit(): void {
  }

  goToTask() {
    this.router.navigate([ '/tasks/' + this.task.id ]);
  }

  hasTag(tag: Tag): boolean {
    return !!this.task && !!this.task.tags && this.task.tags.includes(tag.id);
  }

  done():void {

    var task = {...this.task};

    if (task.frequency == 'o') {
      this.taskFacade.deleteTask(task);
    } else {
      let date: Date = new Date(task.due_date.replace(/-/g, '\/').replace(/T.+/, ''));

      switch(task.frequency) { 
        case 'd':
          date.setDate(date.getDate() + 1);
          break;
        case 'w':
          date.setDate(date.getDate() + 7);
          break;
        case 'm':
          date.setMonth(date.getMonth() + 1);
          break;
        case 'a':
          date.setMonth(date.getMonth() + 12)
          break;
      }

      task.due_date = formatDate(date);

      this.taskFacade.updateTask(task);
    }
    // this.task = null;

    function formatDate(date) {
      var d = new Date(date),
          month = '' + (d.getMonth() + 1),
          day = '' + d.getDate(),
          year = d.getFullYear();
  
      if (month.length < 2) 
          month = '0' + month;
      if (day.length < 2) 
          day = '0' + day;
  
      return [year, month, day].join('-');
    }

  }
}
