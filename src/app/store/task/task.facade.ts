import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { State } from './task.state';
import * as fromSelectors from './task.selectors';
import * as fromActions from './task.actions';

import { Task } from '../../models/task';
import { Tag } from '../../models/tag';

@Injectable({
  providedIn: 'root'
})
export class TaskFacade {

  constructor(private store: Store<State>) {}

  tasks$ = this.store.pipe(select(fromSelectors.selectVisibleTasks));

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

}