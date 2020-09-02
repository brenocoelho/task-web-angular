import { Task } from '../../models/task';
import { Tag } from '../../models/tag';


export interface AppState {
  selectedTags: Tag[];
  allTasks: Task[];
}

export default class TasksState {
  list: Task[]; // list of Tasks; analogous to a sql normalized table
//   selectedId?: string | number; // which Tasks record has been selected
//   loaded: boolean; // has the Tasks list been loaded
  error: Error; // last none error (if any)
}

// export const initialState: TasksState = {
//   list: [],
//   loaded: false
// };

export const initializeState = (): TasksState => {
    return { list: Array<Task>(), error: null };
  };
