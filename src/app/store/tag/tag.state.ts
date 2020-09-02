import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
 
import { Tag } from '../../models/tag'

export const TAG_FEATURE_KEY = "tags";

export interface State extends EntityState<Tag> {
  // additional entities state properties
  editTag: Tag;
}
 
export function selectTagId(a: Tag): string {
  //In this case this would be optional since primary key is id
  return a.id;
}
 
export function sortByName(a: Tag, b: Tag): number {
  return a.name.localeCompare(b.name);
}
 
export const adapter: EntityAdapter<Tag> = createEntityAdapter<Tag>({
  selectId: selectTagId,
  sortComparer: sortByName,
});

export interface TagPartialState {
  readonly [TAG_FEATURE_KEY]: State;
}

export const initialState: State = adapter.getInitialState({
    // additional entity state properties
    editTag: null,
});