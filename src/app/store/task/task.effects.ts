import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { EMPTY, Observable, of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';

import * as TaskActions from "./task.actions";
import { TaskService } from "../../services/task/task.service";
import { Task } from '../../models/task';

@Injectable()
export class TaskEffects {

  constructor(
    private actions$: Actions,
    private taskService: TaskService
  ) {}

  loadTasks$: Observable<Action> = createEffect(() => 
    this.actions$.pipe(
      ofType(TaskActions.loadTasks),
      mergeMap(() => this.taskService.getTasks()
        .pipe(
          map((tasks: Task[]) => {
              return TaskActions.loadTasksSuccess({ tasks: tasks });
          }),          
          catchError(() => EMPTY)
        )
      )
    )
  );


  createTask$: Observable<Action> = createEffect(() => 
    this.actions$.pipe(
      ofType(TaskActions.addTask),
      mergeMap(action => this.taskService.createTask(action.task)
        .pipe(
          map((task: Task) => {
            return TaskActions.addTaskSuccess({ task: task });
          }),
          catchError(() => EMPTY)
          // catchError((error: Error) => { return of(appActions.ErrorToDoAction(error)); })
        )
      )
    )
  ); 

  updateTask$: Observable<Action> = createEffect(() => this.actions$.pipe(
      ofType(TaskActions.updateTask),
      mergeMap(action => this.taskService.updateTask(action.task).pipe(
          map((task: Task) => {
            return TaskActions.updateTaskSuccess({ task: task });
          }),
          catchError(() => EMPTY)
          // catchError((error: Error) => { return of(appActions.ErrorToDoAction(error)); })
        )
      )
    )
  );  

  deleteTask$: Observable<Action> = createEffect(() => 
    this.actions$.pipe(
      ofType(TaskActions.deleteTask),
      mergeMap(action => this.taskService.deleteTask(action.task)
        .pipe(
          map(() => {
            return TaskActions.deleteTaskSuccess({ task: action.task });
          }),
          catchError(() => EMPTY)
          // catchError((error: Error) => { return of(appActions.ErrorToDoAction(error)); })
        )
      )
    )
  ); 
 

}