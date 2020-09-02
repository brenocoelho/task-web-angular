import { createFeatureSelector, createSelector } from "@ngrx/store";
import { State, adapter, TAG_FEATURE_KEY } from './tag.state';

// Lookup the 'Tag' feature state managed by NgRx
export const getTagState = createFeatureSelector<State>(TAG_FEATURE_KEY);

// get the selectors
const {
    selectIds,
    selectAll,
    selectTotal,
  } = adapter.getSelectors();

// select the array of Tag ids
export const selectTagIds = createSelector(
    getTagState,
    selectIds
  );
  
  // select the array of Tags
  export const selectAllTags = createSelector(
    getTagState,
    selectAll
  );
  
  // select the total Tag count
  export const selectTagCount = createSelector(
    getTagState,
    selectTotal
  );

export const selectEditTag = createSelector(
  getTagState,
  (state: State) => state.editTag
); 