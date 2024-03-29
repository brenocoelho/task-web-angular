import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
 
import { Task } from '../../models/task'
import { Tag } from '../../models/tag'

export const TASK_FEATURE_KEY = "tasks";

export interface State extends EntityState<Task> {
  // additional entities state properties
  loading: boolean;
  selectedTags: Array<Tag>;
  selectedTask: Task;
  filter: string;
}
 
export function selectTaskId(a: Task): string {
  //In this case this would be optional since primary key is id
  return a.id;
}
 
export function sortTasks(a: Task, b: Task): number {
  
  var a_priority: boolean = (!!a.tags && a.tags.includes("priority"));
  var b_priority: boolean = (!!b.tags && b.tags.includes("priority"));

  if (a_priority && !b_priority) {
    return -1;
  } else if (!a_priority && b_priority) {
    return 1;
  } else if (a.due_date == b.due_date) {
    return 0
  } else if (!a.due_date) {
    return 1;
  } else if (!b.due_date) {
    return -1;
  } else if (a.due_date > b.due_date) {
    return 1;
  } else { // ( a.due_date < b.due_date)
    return -1;
  }
}
 
export const adapter: EntityAdapter<Task> = createEntityAdapter<Task>({
  selectId: selectTaskId,
  sortComparer: sortTasks,
});

export interface TaskPartialState {
  readonly [TASK_FEATURE_KEY]: State;
}

export const initialState: State = adapter.getInitialState({
    // additional entity state properties
    loading: false,
    selectedTags: [],
    selectedTask: null,
    filter: 'OR',
});