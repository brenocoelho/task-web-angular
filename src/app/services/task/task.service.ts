import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Subject, BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, map, tap, retry } from 'rxjs/operators';
import { Task } from '../../models/task';
import { environment } from './../../../environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private _tasks: Subject<Array<Task>> = new BehaviorSubject<Array<Task>>([]);
  public readonly tasks: Observable<Array<Task>> = this._tasks.asObservable();

  private url = `${environment.api}/v1/tasks`;

  constructor(private http: HttpClient, private snackBar: MatSnackBar,) { }

  getTasks() {
    const httpOptions = { headers: new HttpHeaders() }
    return this.http.get(this.url, httpOptions)
    .pipe(
      map(response => response["data"]),
      retry(1),
      catchError(this.handleError));    
  }

  getTask(id: string): Observable<Task> {

    // Headers
    const httpOptions = { headers: new HttpHeaders() }

    const url = `${this.url}/${id}`;

    return this.http.get(url, httpOptions)
    .pipe(
      map(response => response["data"]),
      retry(1),
      catchError(this.handleError));
  }

  /** POST: create the task on the server */
  createTask(task: Task): Observable<any> {

    // Headers
    const httpOptions = {
      headers: new HttpHeaders()
      .set('content-type', 'application/json')
    }

    return this.http.post(this.url, task, httpOptions)
    .pipe(
      map(response => { 
        this.snackBar.open('Task Created!', '', { duration: 2000 });
        return response["data"];
      }),
      catchError(this.handleError));
  }  

  /** PUT: update the task on the server */
  updateTask(task: Task): Observable<any> {

    // Headers
    const httpOptions = {
      headers: new HttpHeaders()
      .set('content-type', 'application/json')
    }

    const url = `${this.url}/${task.id}`;

    return this.http.put(url, task, httpOptions)
    .pipe(
      map(response => { 
        this.snackBar.open('Task Updated!', '', { duration: 2000 });
        return response["data"];
      }),
      catchError(this.handleError)
    );
  }


  /** PUT: update the hero on the server */
  deleteTask(task: Task): Observable<any> {

    // Headers
    const httpOptions = {
      headers: new HttpHeaders()
      .set('content-type', 'application/json')
    }

    const url = `${this.url}/${task.id}`;

    return this.http.delete(url, httpOptions)
    .pipe(
      map(() => { 
        this.snackBar.open('Task Deleted!', '', { duration: 2000 });
      }),      
      catchError(this.handleError)
    );
  }  


  // Manipulação de erros
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  };

}
