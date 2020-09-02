import { createAction, props, } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { Task } from '../models/task'
import { Tag } from '../models/tag'

// Tasks
export const loadTasksAction = createAction('[Tasks Page] Load Tasks');

export const successLoadTasksAction = createAction(
    '[Tasks API] Success Load Tasks',
    props<{ payload: Task[] }>()
);

export const loadTagsAction = createAction('[Tags Page] Load Tags');

export const successLoadTagsAction = createAction(
    '[Tags API] Success Load Tags',
    props<{ payload: Tag[] }>()
);

export const beginCreateTaskAction = createAction(
  '[Task Detail Component] Begin Create Task',
  props<{ payload: Task }>()
);

export const successCreateTaskAction = createAction(
  '[Tasks] Success Create Task',
  props<{ payload: Task }>()
);

export const beginUpdateTaskAction = createAction(
  '[Task Detail Component] Begin Update Task',
  props<{ payload: Task }>()
);

export const successUpdateTaskAction = createAction(
  '[Task Detail Page] Success Update Task',
  props<{ payload: Task }>()
);

export const selectTaskAction = createAction(
  '[Task List Component] Select Task',
  props<Task>()
);

// Tags
export const beginCreateTagAction = createAction(
  '[Tag Detail Page] Begin Create Tag',
  props<{ payload: Tag }>()
);

export const successCreateTagAction = createAction(
  '[Tag Detail Page] Success Create Tag',
  props<{ payload: Tag }>()
);

export const beginUpdateTagAction = createAction(
  '[Tag Detail Page] Begin Update Tag',
  props<{ payload: Tag }>()
);

export const successUpdateTagAction = createAction(
  '[Tag Detail Page] Success Update Tag',
  props<{ payload: Tag }>()
);

export const selectTagAction = createAction(
    '[Tags Component] Select Tag',
    props<Tag>()
);

export const unselectTagAction = createAction(
    '[Tags Component] Unselect Tag',
    props<Tag>()
);

// Error
export const ErrorTaskAction = createAction(
    '[Tasks] Error', 
    props<Error>()
);




export const loadTasks = createAction(
  '[Tasks List] Load Tasks via Service',
);

export const tasksLoaded = createAction(
  '[Tasks Effect] Tasks Loaded Successfully',
  props<{tasks: Task[]}>()
);

export const updateTask = createAction(
  '[Tasks List Operations] Update Task',
  props<{update: Update<Task>}>()
);

export const taskActionTypes = {
  loadTasks,
  tasksLoaded,
  updateTask
};