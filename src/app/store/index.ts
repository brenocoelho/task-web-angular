import {
    createSelector,
    createFeatureSelector,
    ActionReducerMap,
  } from '@ngrx/store';
  
  import * as taskState from './task/task.state';
  import * as taskReducer from './task/task.reducer';

  import * as tagState from './tag/tag.state';
  import * as tagReducer from './tag/tag.reducer';
   
  export interface State {
    tasks: taskState.State;
    tags:  tagState.State;
  }
   
  export const reducers: ActionReducerMap<State> = {
    tasks: taskReducer.reducer,
    tags:  tagReducer.reducer,
  };
