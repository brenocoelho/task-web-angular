import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TasksState } from './tasks.state';

// Lookup the 'Tasks' feature state managed by NgRx
const getTasksState = createFeatureSelector<TasksState>('tasks');

const getLoaded = createSelector( getTasksState, (state: TasksState) => state.loaded );
const getError = createSelector( getTasksState, (state: TasksState) => state.error );
const getSelectedId = createSelector(getTasksState, (state: TasksState) =>state.selectedId);

const getAllTasks = createSelector(getTasksState, getLoaded, (state:TasksState, isLoaded) => {
  return isLoaded ? state.list : [ ];
});
const getSelectedTasks = createSelector( getAllTasks, getSelectedId, (tasks, id) => {
  const result = tasks.find(it => it['id'] === id);
  return result ? Object.assign({}, result) : undefined;
});

export const tasksQuery = {
  getLoaded,
  getError,
  getAllTasks,
  getSelectedTasks
};