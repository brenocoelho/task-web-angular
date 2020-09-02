import { createSelector, createFeatureSelector } from '@ngrx/store';

import { Tag } from '../models/tag'
import { Task } from '../models/task'

import { AppState } from './app.state';
 
export const selectState = createFeatureSelector<AppState>("appState");

export const selectAllTasks = createSelector(
    selectState,
    (state: AppState) => state.allTasks
);

export const selectAllTags = createSelector(
    selectState,
    (state: AppState) => state.allTags
);

export const selectTags = createSelector(
    selectState,
    (state: AppState) => state.selectedTags
);

export const selectTask = createSelector(
  selectState,
  (state: AppState) => state.task
);
 
export const selectVisibleTasks = createSelector(
  selectTags,
  selectAllTasks,
  (selectedTags: Tag[], allTasks: Task[]) => {
    if (selectedTags && allTasks && selectedTags.length != 0) {
      return allTasks.filter((task: Task) =>  selectedTags.some(tag => task.tags.includes(tag.id)));
    } else {
      return allTasks;
    }
  }
);