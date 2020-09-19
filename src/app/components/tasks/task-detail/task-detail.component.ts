import { Location } from '@angular/common';

import { Component, OnInit, Input } from '@angular/core';

import { TaskFacade } from '../../../store/task.facade'
import { TagFacade } from '../../../store/tag.facade'

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

  task: Task = null;

  selectedTask$ = this.taskFacade.selectedTask$;

  tags$ = this.tagFacade.tags$;
  tags: Tag[];
  expanded: string[] = [];

  isTagTreeVisible: boolean = false;
  isDateVisible: boolean = false;
  isNotesVisible: boolean = false;

  constructor(
    private location: Location,
    private snackBar: MatSnackBar,
    private taskFacade: TaskFacade,
    private tagFacade: TagFacade,
  ) { }

  ngOnInit(): void { 
    this.tags$.subscribe( tags => this.tags = tags as Tag[] );

    this.selectedTask$.subscribe ( task => {
      if (!!task && !!task.tags) {
        //Find expanded tags
        var tags = this.tags.filter(t => task.tags.includes(t.id));
        var expanded = tags.filter(t1 => tags.some(t2 => !!t2.path && t2.path.includes(t1.id)));
        this.expanded = expanded.map(t => t.id);
      }

      this.task = !!task ? {...task} : null;
      this.isTagTreeVisible = false;
      this.isDateVisible = !!task && !!task.due_date;
      this.isNotesVisible = !!task && !!task.notes;
     });
  }

  selectTag(tag: Tag) {
    if (!!this.task.tags && this.task.tags.includes(tag.id)) {
      var hasTag: Tag[] = this.tags.filter(t => !!t.path && t.path.includes(tag.id));
      hasTag.push(tag);
      this.task.tags = this.task.tags.filter(id => !hasTag.some(t => t.id == id));
    } else {
      if (!!tag.path) {
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

  showExpandIcon(tag: Tag) {
    if (!this.tags.some(t => !!t.path && t.path.length > 0 && t.path.includes(tag.id))) {
      return 'no';
    } else if (!!this.expanded && this.expanded.length > 0 && this.expanded.includes(tag.id)) {
      return 'collapse';
    } else {
      return 'expand';
    }
  }

  showTag(tag: Tag) {
    //tag doesn't have parent
    if (!tag.path || (!!tag.path && tag.path.length == 0)) {
      return true;
    //tag parent is in EXPANDED
    } else if (!!this.expanded && this.expanded.length > 0 && this.expanded.includes(tag.path[tag.path.length-1])) {
      return true;
    } else {
      return false;
    }
  }

  expandTag(tag: Tag) {
    this.expanded.push(tag.id);
  }

  collapseTag(tag: Tag) {
    var all: Tag[] = this.tags.filter(t => !!t.path && t.path.length > 0 && t.path.includes(tag.id));
    all.push(tag);
    this.expanded = this.expanded.filter(id => !all.some(t => t.id == id));
  }

  isTagChecked(tag: Tag): boolean {
    return !!this.task && !!this.task.tags && this.task.tags.includes(tag.id);
  }

  hasTag(tag: Tag): boolean {
    return !!this.task && !!this.task.tags && this.task.tags.includes(tag.id);
  }

  showTagTree() {
    this.isTagTreeVisible = true;
  }

  showDate() {
    this.isDateVisible = true;
  }

  showNotes() {
    this.isNotesVisible = true;
  }

}
