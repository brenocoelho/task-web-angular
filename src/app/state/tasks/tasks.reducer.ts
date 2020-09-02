import { Action, createReducer, on } from '@ngrx/store';
import * as TasksActions from './tasks.actions';
import { Task } from '../../models/task';
import TasksState, { initializeState } from './tasks.state';

export const intialState = initializeState();

const reducer = createReducer(
  intialState,
  on(TasksActions.GetTasksAction, state => state),
  on(TasksActions.CreateTaskAction, (state: TasksState, task: Task) => {
    return { ...state, list: [...state.list, task], error: null };
  }),
  on(TasksActions.SuccessGetTasksAction, (state: TasksState, { payload }) => {
    return { ...state, list: payload };
  }),
  on(TasksActions.SuccessCreateTaskAction, (state: TasksState, { payload }) => {
    return { ...state, list: [...state.list, payload], ToDoError: null };
  }),
  on(TasksActions.ErrorTaskAction, (state: TasksState, error: Error) => {
    console.log(error);
    return { ...state, ToDoError: error };
  })
);

export function TasksReducer(state: TasksState | undefined, action: Action) {
  return reducer(state, action);
}