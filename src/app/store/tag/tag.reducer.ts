import { Action, createReducer, on } from '@ngrx/store';
import { State, initialState, adapter } from './tag.state';
import { Update } from '@ngrx/entity';
import * as fromActions from './tag.actions';

import { Tag } from '../../models/tag';

const _reducer = createReducer(
    initialState,
    on(fromActions.loadTagsSuccess, (state, { tags }) => {
        return adapter.setAll(tags, state);
    }),
    on(fromActions.addTagSuccess, (state, { tag }) => {
        return adapter.addOne(tag, state)
    }), 
    on(fromActions.updateTagSuccess, (state, { tag }) => {
        const update: Update<Tag> = {
            id: tag.id,
            changes: {
              ...tag
            }
        };
        return adapter.updateOne(update, state);
    }),
    on(fromActions.deleteTagSuccess, (state, { tag }) => {
      return adapter.removeOne(tag.id, state);
    }),
    on(fromActions.editTag, (state, { tag }) => {
        return {...state, editTag: tag};
    }),
    on(fromActions.cleanTag, (state) => {
      return {...state, editTag: null};
    }),
);

export function reducer(state: State | undefined, action: Action) {
  return _reducer(state, action);
}