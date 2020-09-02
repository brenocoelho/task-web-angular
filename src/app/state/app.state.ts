import { Tag } from '../models/tag'
import { Task } from '../models/task'

export interface AppState {
  allTasks: Array<Task>;
  allTags: Array<Tag>;
  selectedTags: Array<Tag>;
  task: Task;
  error: Error;
}

export const initializeState = (): AppState => {
    return {
        allTasks: Array<Task>(),
        allTags: Array<Tag>(),
        selectedTags: Array<Tag>(),
        task: null,
        error: null,
    };
};