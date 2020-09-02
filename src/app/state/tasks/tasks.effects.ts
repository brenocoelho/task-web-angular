import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as TasksActions from './tasks.actions';
import { Task } from '../../models/task';
import { TaskService } from '../../services/task/task.service'

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TasksEffects {
  constructor(private http: HttpClient, private action$: Actions) {}

  private url: string = `${environment.api}/v1/tasks`;

  GetTasks$: Observable<Action> = createEffect(() =>
    this.action$.pipe(
      ofType(TasksActions.BeginGetTasksAction),
      mergeMap(action =>
        this.http.get(this.url).pipe(
          map((response) => {
            return TasksActions.SuccessGetTasksAction({ payload: response["data"] });
          }),
          catchError((error: Error) => {
            return of(TasksActions.ErrorTaskAction(error));
          })
        )
      )
    )
  );

//   CreateToDos$: Observable<Action> = createEffect(() =>
//     this.action$.pipe(
//       ofType(ToDoActions.BeginCreateToDoAction),
//       mergeMap(action =>
//         this.http
//           .post(this.ApiURL, JSON.stringify(action.payload), {
//             headers: { 'Content-Type': 'application/json' }
//           })
//           .pipe(
//             map((data: ToDo) => {
//               return ToDoActions.SuccessCreateToDoAction({ payload: data });
//             }),
//             catchError((error: Error) => {
//               return of(ToDoActions.ErrorToDoAction(error));
//             })
//           )
//       )
//     )
//   );
}