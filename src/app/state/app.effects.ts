import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, Observable, of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';

import { TaskService } from '../services/task/task.service'
import { TagService } from '../services/tag/tag.service'

import { Task } from '../models/task';
import { Tag } from '../models/tag';

import * as appActions from './app.actions';

@Injectable()
export class TasksEffects {
  
  constructor(
    private actions$: Actions,
    private taskService: TaskService
  ) {}

  loadTasks$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(appActions.loadTasksAction),
    mergeMap(() => this.taskService.getTasks().pipe(
        map((tasks: Task[]) => {
            return appActions.successLoadTasksAction({ payload: tasks });
          }),          
        catchError(() => EMPTY)
      ))
    )
  );

  createTask$: Observable<Action> = createEffect(() => this.actions$.pipe(
      ofType(appActions.beginCreateTaskAction),
      mergeMap(action => this.taskService.createTask(action.payload).pipe(
          map((data: Task) => {
            return appActions.successCreateTaskAction({ payload: data });
          }),
          catchError(() => EMPTY)
          // catchError((error: Error) => { return of(appActions.ErrorToDoAction(error)); })
        )
      )
    )
  ); 

  updateTask$: Observable<Action> = createEffect(() => this.actions$.pipe(
      ofType(appActions.beginUpdateTaskAction),
      mergeMap(action => this.taskService.updateTask(action.payload).pipe(
          map((data: Task) => {
            return appActions.successUpdateTaskAction({ payload: data });
          }),
          catchError(() => EMPTY)
          // catchError((error: Error) => { return of(appActions.ErrorToDoAction(error)); })
        )
      )
    )
  );  
 
}

@Injectable()
export class TagsEffects {
 
  constructor(
    private actions$: Actions,
    private tagService: TagService
  ) {}
 
  loadTags$ = createEffect(() => this.actions$.pipe(
    ofType(appActions.loadTagsAction),
    mergeMap(() => this.tagService.fetchTags()
      .pipe(
        map((response) => {
            return appActions.successLoadTagsAction({ payload: response["data"] });
          }),          
        // map(tasks => ({ type: '[Movies API] Movies Loaded Success', payload: tasks })),
        catchError(() => EMPTY)
      ))
    )
  );

}