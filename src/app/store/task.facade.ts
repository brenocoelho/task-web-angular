import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';

import { State } from './task/task.state';
import * as fromSelectors from './task/task.selectors';
import * as fromActions from './task/task.actions';

import { Task } from '../models/task';
import { Tag } from '../models/tag';

@Injectable({
  providedIn: 'root'
})
export class TaskFacade {

  constructor(private store: Store<State>) {}

  tasks$ = this.store.pipe(select(fromSelectors.selectVisibleTasks));

  selectedTags$ = this.store.pipe(select(fromSelectors.selectedTags));

  selectedTask$ = this.store.pipe(select(fromSelectors.selectedTask));

  loadTasks() {
    this.store.dispatch(fromActions.loadTasks());
  }

  addTask(task: Task) {
    this.store.dispatch(fromActions.addTask({task}));
  }

  updateTask(task: Task) {
    this.store.dispatch(fromActions.updateTask({task}));
  }

  deleteTask(task: Task) {
    this.store.dispatch(fromActions.deleteTask({task}));
  }

  selectTag(tag: Tag) {
    this.store.dispatch(fromActions.selectTag({tag}));
  }

  unselectTag(tag: Tag) {
    this.store.dispatch(fromActions.unselectTag({tag}));
  }

  setFilter(filter: string) {
    this.store.dispatch(fromActions.setFilter({filter}));
  }

  selectTask(task: Task) {
    this.store.dispatch(fromActions.selectTask({task}));
  }

  cleanTask() {
    this.store.dispatch(fromActions.cleanTask());
  }
}