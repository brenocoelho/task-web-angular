import { createFeatureSelector, createSelector } from "@ngrx/store";
import { State, adapter, TASK_FEATURE_KEY } from './task.state';

import { Task } from '../../models/task';

// Lookup the 'Task' feature state managed by NgRx
export const getTaskState = createFeatureSelector<State>(TASK_FEATURE_KEY);

export const selectedTags = createSelector(
  getTaskState,
  (state: State) => state.selectedTags
);

export const selectedFilter = createSelector(
  getTaskState,
  (state: State) => state.filter
);

export const selectedTask = createSelector(
  getTaskState,
  (state: State) => state.selectedTask
);

// get the selectors
const {
  selectIds,
  selectAll,
  selectTotal,
} = adapter.getSelectors();

// select the array of Task ids
export const selectTaskIds = createSelector(
  getTaskState,
  selectIds
);
  
// select the array of Tasks
export const selectAllTasks = createSelector(
  getTaskState,
  selectAll
);

// select the total Task count
export const selectTaskCount = createSelector(
  getTaskState,
  selectTotal
);

export const selectVisibleTasks = createSelector(
  selectAllTasks,
  selectedTags,
  selectedFilter,
  (tasks, tags, filter) => {
    if (tags && tasks && tags.length != 0) {
      if (filter == 'OR') {
        return tasks.filter((task: Task) => tags.some(tag => task.tags.includes(tag.id)));
      } else if (filter == 'NOT') {
        return tasks.filter((task: Task) => !tags.some(tag => task.tags.includes(tag.id)));
      } else { //(filter == 'AND')
        return tasks.filter((task: Task) => tags.every(tag => task.tags.includes(tag.id)));
      }
    } else {
      return tasks;
    }
  }
);