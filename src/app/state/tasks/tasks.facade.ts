import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';

import { TasksState } from './tasks.reducer';
import { tasksQuery } from './tasks.selectors';
import { LoadTasks } from './tasks.actions';

@Injectable({
  providedIn: 'root'
})
export class TasksFacade {
  loaded$       = this.store.select(tasksQuery.getLoaded);
  allTasks$      = this.store.select(tasksQuery.getAllTasks);
  selectedTasks$ = this.store.select(tasksQuery.getSelectedTasks);

  constructor(private store: Store<TasksState>) {}

  loadAll() {
    this.store.dispatch(new LoadTasks());
  }
}
