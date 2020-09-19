import { createAction, props } from '@ngrx/store';
 
import { Tag } from '../../models/tag'

export const loadTags = createAction('[Tag Component] Load Tags');
export const loadTagsSuccess = createAction('[Tag API] Load Tags Success', props<{ tags: Tag[] }>());

export const addTag = createAction('[Tag Component] Add Tag', props<{ tag: Tag }>());
export const addTagSuccess = createAction('[Tag API] Add Tag Success', props<{ tag: Tag }>());

export const updateTag = createAction('[Tag Component] Update Tag', props<{ tag: Tag }>());
export const updateTagSuccess = createAction('[Tag API] Update Tag Success', props<{ tag: Tag }>());

export const deleteTag = createAction('[Tag Component] Delete Tag', props<{ tag: Tag }>());
export const deleteTagSuccess = createAction('[Tag API] Delete Tag Success', props<{ tag: Tag }>());

export const selectTag = createAction('[Tag Component] select Tag', props<{ tag: Tag }>());
export const cleanTag = createAction('[Tag Component] Clean Tag');
