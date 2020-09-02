import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Subject, BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, map, tap, retry } from 'rxjs/operators';
import { Tag } from '../../models/tag';
import { environment } from './../../../environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class TagService {

  private _tags: Subject<Array<Tag>> = new BehaviorSubject<Array<Tag>>([]);
  public readonly tags: Observable<Array<Tag>> = this._tags.asObservable();

  private url = `${environment.api}/v1/tags`;

  constructor(private http: HttpClient, private snackBar: MatSnackBar,) { }

  getTags() {
    const httpOptions = { headers: new HttpHeaders() }
    return this.http.get(this.url, httpOptions)
    .pipe(
      map(response => response["data"]),
      retry(1),
      catchError(this.handleError));    
  }

  getTag(id: string): Observable<Tag> {

    // Headers
    const httpOptions = { headers: new HttpHeaders() }

    const url = `${this.url}/${id}`;

    return this.http.get(url, httpOptions)
    .pipe(
      map(response => response["data"]),
      retry(1),
      catchError(this.handleError));
  }

  /** POST: create the tag on the server */
  createTag(tag: Tag): Observable<any> {

    // Headers
    const httpOptions = {
      headers: new HttpHeaders()
      .set('content-type', 'application/json')
    }

    return this.http.post(this.url, tag, httpOptions)
    .pipe(
      map(response => { 
        this.snackBar.open('Tag Created!', '', { duration: 2000 });
        return response["data"];
      }),
      catchError(this.handleError));
  }  

  /** PUT: update the tag on the server */
  updateTag(tag: Tag): Observable<any> {

    // Headers
    const httpOptions = {
      headers: new HttpHeaders()
      .set('content-type', 'application/json')
    }

    const url = `${this.url}/${tag.id}`;

    return this.http.put(url, tag, httpOptions)
    .pipe(
      map(response => { 
        this.snackBar.open('Tag Updated!', '', { duration: 2000 });
        return response["data"];
      }),
      catchError(this.handleError)
    );
  }


  /** PUT: update the hero on the server */
  deleteTag(tag: Tag): Observable<any> {

    // Headers
    const httpOptions = {
      headers: new HttpHeaders()
      .set('content-type', 'application/json')
    }

    const url = `${this.url}/${tag.id}`;

    return this.http.delete(url, httpOptions)
    .pipe(
      map(() => { 
        this.snackBar.open('Tag Deleted!', '', { duration: 2000 });
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
