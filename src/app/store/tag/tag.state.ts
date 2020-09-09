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
 
export function sortTags(a: Tag, b: Tag): number {

  if(a.path && a.path.includes(b.id)) {
    return 1
  } else if(b.path && b.path.includes(a.id)) {
    return -1
  } else {
    var a_path = a.id;
    if (a.path) { a_path =  a.path.join() + a.id; }
  
    var b_path = b.id;
    if (b.path) { b_path =  b.path.join() + b.id; }
  
    return a_path.localeCompare(b_path);
  }
}

 
export const adapter: EntityAdapter<Tag> = createEntityAdapter<Tag>({
  selectId: selectTagId,
  sortComparer: sortTags,
});

export interface TagPartialState {
  readonly [TAG_FEATURE_KEY]: State;
}

export const initialState: State = adapter.getInitialState({
    // additional entity state properties
    editTag: null,
});