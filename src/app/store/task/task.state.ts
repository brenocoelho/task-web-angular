import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
 
import { Task } from '../../models/task'
import { Tag } from '../../models/tag'

export const TASK_FEATURE_KEY = "tasks";

export interface State extends EntityState<Task> {
  // additional entities state properties
  loading: boolean;
  selectedTags: Array<Tag>;
  editTask: Task;
  filter: string;
}
 
export function selectTaskId(a: Task): string {
  //In this case this would be optional since primary key is id
  return a.id;
}
 
export function sortByName(a: Task, b: Task): number {
  if (a.due_date == b.due_date) {
    return 0
  }
  else if (a.due_date == null || a.due_date > b.due_date) {
    return 1;
  }
  else { // ( b.due_date == null || a.due_date < b.due_date)
    return -1;
  }
}
 
export const adapter: EntityAdapter<Task> = createEntityAdapter<Task>({
  selectId: selectTaskId,
  sortComparer: sortByName,
});

export interface TaskPartialState {
  readonly [TASK_FEATURE_KEY]: State;
}

export const initialState: State = adapter.getInitialState({
    // additional entity state properties
    loading: false,
    selectedTags: [],
    editTask: null,
    filter: 'OR',
});