import { createAction, props, Action } from '@ngrx/store';
import { Task } from '../../models/task';

export const GetTasksAction = createAction('[Tasks] Get Tasks');

export const CreateTaskAction = createAction(
  '[Tasks] Create Task',
  props<Task>()
);

export const BeginGetTasksAction = createAction('[Tasks] Begin Get Task');

export const SuccessGetTasksAction = createAction(
  '[Tasks] Success Get Task',
  props<{ payload: Task[] }>()
);

export const BeginCreateTaskAction = createAction(
  '[Tasks] Begin Create Task',
  props<{ payload: Task }>()
);

export const SuccessCreateTaskAction = createAction(
  '[Tasks] Success Create Task',
  props<{ payload: Task }>()
);

export const ErrorTaskAction = createAction('[Tasks] Error', props<Error>());