import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';

import * as fromSelectors from './app.selectors';
import * as fromActions from './app.actions';

import { AppState } from './app.state';

import { Task } from '../models/task';
import { Tag } from '../models/tag';


@Injectable({
  providedIn: 'root'
})
export class AppFacade {

  constructor(private store: Store<AppState>) {}

  tasks$ = this.store.pipe(select(fromSelectors.selectVisibleTasks));
  tags$ = this.store.pipe(select(fromSelectors.selectAllTags));
  selectedTags$ = this.store.pipe(select(fromSelectors.selectTags));  
  task$ = this.store.pipe(select(fromSelectors.selectTask));  

  loadTasks() {
    this.store.dispatch(fromActions.loadTasksAction());
  }

  loadTags() {
    this.store.dispatch(fromActions.loadTagsAction());
  }

  selectTag(tag: Tag): void {
    this.store.dispatch(fromActions.selectTagAction(tag));
  }

  beginCreateTaskAction(task: Task) {
    this.store.dispatch(fromActions.beginCreateTaskAction({ payload: task }));
  }

  successCreateTaskAction(task: Task) {
    this.store.dispatch(fromActions.successCreateTaskAction({ payload: task }));
  }

  beginUpdateTaskAction(task: Task) {
    this.store.dispatch(fromActions.beginUpdateTaskAction({ payload: task }));
  }

  successUpdateTaskAction(task: Task) {
    this.store.dispatch(fromActions.successUpdateTaskAction({ payload: task }));
  }

  beginCreateTagAction(tag: Tag) {
    this.store.dispatch(fromActions.beginCreateTagAction({ payload: tag }));
  }

  successCreateTagAction(tag: Tag) {
    this.store.dispatch(fromActions.successCreateTagAction({ payload: tag }));
  }

  beginUpdateTagAction(tag: Tag) {
    this.store.dispatch(fromActions.beginUpdateTagAction({ payload: tag }));
  }

  successUpdateTagAction(tag: Tag) {
    this.store.dispatch(fromActions.successUpdateTagAction({ payload: tag }));
  }

  unselectTag(tag: Tag): void {
    this.store.dispatch(fromActions.unselectTagAction(tag));
  }

  selectTask(task: Task): void {
    this.store.dispatch(fromActions.selectTaskAction(task));
  }

}