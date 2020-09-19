import { Action, createReducer, on } from '@ngrx/store';
import { State, initialState, adapter } from './task.state';
import { Update, EntityMap, Predicate } from '@ngrx/entity';
import * as fromActions from './task.actions';

import { Task } from '../../models/task'

const _reducer = createReducer(
    initialState,
    on(fromActions.loadTasksSuccess, (state, { tasks }) => {
        return adapter.setAll(tasks, state);
    }),
    on(fromActions.addTaskSuccess, (state, { task }) => {
        return adapter.addOne(task, state)
    }), 
    on(fromActions.updateTaskSuccess, (state, { task }) => {
        const update: Update<Task> = {
            id: task.id,
            changes: {
              ...task
            }
        };
        return adapter.updateOne(update, state);
    }),
    on(fromActions.deleteTaskSuccess, (state, { task }) => {
      return adapter.removeOne(task.id, state);
    }),   
    on(fromActions.selectTag, (state: State, { tag }) => {
      return { ...state, selectedTags: [...state.selectedTags, tag] };
    }),
    on(fromActions.unselectTag, (state: State, { tag }) => {
      return { ...state, selectedTags: state.selectedTags.filter(t => t.id !== tag.id) };
    }),
    on(fromActions.setFilter, (state: State, { filter }) => {
      return { ...state, filter: filter };
    }),
    on(fromActions.selectTask, (state: State, { task }) => {
      return { ...state, selectedTask: task };
    }),
    on(fromActions.cleanTask, (state) => {
      return {...state, selectedTask: null};
    }),
);

export function reducer(state: State | undefined, action: Action) {
  return _reducer(state, action);
}