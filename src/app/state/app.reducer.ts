import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import { AppState, initializeState } from './app.state';
import * as fromActions from './app.actions';
 
import { Tag } from '../models/tag'
import { Task } from '../models/task'

export interface TasksState extends EntityState<Task> {}
export interface TagsState extends EntityState<Tag> {}

export const adapter: EntityAdapter<Task> = createEntityAdapter<Task>();

export const initialTasksSate: TasksState = adapter.getInitialState();


export const intialState = initializeState();

const _reducer = createReducer(
    intialState,
    on(fromActions.successLoadTasksAction, (state: AppState, { payload }) => {
      return { ...state, allTasks: payload };
    }),
    on(fromActions.selectTaskAction, (state: AppState, task: Task) => {
      return { ...state, task: task };
    }),
    on(fromActions.successCreateTaskAction, (state: AppState, { payload }) => {
      return { ...state, allTasks: [...state.allTasks, payload], ToDoError: null };
    }),
    on(fromActions.successUpdateTaskAction, (state: AppState, { payload }) => {
      let items: Array<Task> = state.allTasks;
      let itemIndex = items.findIndex(item => item.id == payload.id);
      items[itemIndex] = payload;
      return { ...state, allTasks: items, ToDoError: null };
    }),
    on(fromActions.successLoadTagsAction, (state: AppState, { payload }) => {
      return { ...state, allTags: payload };
    }),
    on(fromActions.successCreateTagAction, (state: AppState, { payload }) => {
      return { ...state, allTags: [...state.allTags, payload], ToDoError: null };
    }),
    on(fromActions.selectTagAction, (state: AppState, tag: Tag) => {
      return { ...state, selectedTags: [...state.selectedTags, tag] };
    }),
    on(fromActions.unselectTagAction, (state: AppState, tag: Tag) => {
      return { ...state, selectedTags: state.selectedTags.filter(t => t.id !== tag.id) };
    }),
);

export function reducer(state: AppState | undefined, action: Action) {
  return _reducer(state, action);
}
