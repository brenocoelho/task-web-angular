import { createAction, props } from '@ngrx/store';
 
import { Task } from '../../models/task'
import { Tag } from '../../models/tag'

export const loadTasks = createAction('[Task Component] Load Tasks');
export const loadTasksSuccess = createAction('[Task API] Load Tasks Success', props<{ tasks: Task[] }>());

export const addTask = createAction('[Task Component] Add Task', props<{ task: Task }>());
export const addTaskSuccess = createAction('[Task API] Add Task Success', props<{ task: Task }>());

export const updateTask = createAction('[Task Component] Update Task', props<{ task: Task }>());
export const updateTaskSuccess = createAction('[Task API] Update Task Success', props<{ task: Task }>());

export const deleteTask = createAction('[Task Component] Delete Task', props<{ task: Task }>());
export const deleteTaskSuccess = createAction('[Task API] Delete Task Success', props<{ task: Task }>());

export const setFilter = createAction('[Task Component] Set Filter', props<{ filter: string }>());
// export const updateTaskSuccess = createAction('[Task API] Update Task Success', props<{ task: Task }>());

export const selectTag = createAction('[Tag Component] Select Tag', props<{ tag: Tag }>());
export const unselectTag = createAction('[Tag Component] Unselect Tag', props<{ tag: Tag }>());

export const selectTask = createAction('[Task Component] Select Task', props<{ task: Task }>());
export const cleanTask = createAction('[Task Component] Clean Task');