import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private endpoint: string = `${environment.api}/v1`

  headers = new HttpHeaders().set('Content-Type', 'application/json');
  currentUser = {};

  constructor(
    private http: HttpClient,
    public router: Router
  ) {
  }

  // Sign-up
  signUp(user: User): Observable<any> {
    let api = `${this.endpoint}/signup`;
    return this.http.post(api, user)
      .pipe(
        catchError(this.handleError)
      )
  }

  // Login
  login(user: User) {

    const httpOptions = {
      headers: new HttpHeaders()
      .set('content-type', 'application/json')
    }    
    return this.http.post(`${this.endpoint}/login`,  user, httpOptions)
      .pipe( 
        tap(res => {
        localStorage.setItem('access_token', res['token'])
        this.currentUser = res['user'];
        this.router.navigate(['tasks']);
        }),
        catchError(this.handleError))      

    // return this.http.post<any>(`${this.endpoint}/login`, user)
    //   .subscribe((res: any) => {
    //     localStorage.setItem('access_token', res.token)
    //     this.currentUser = res.user;
    //     this.router.navigate(['tasks']);
    //   })
  }

  // Login
  getUser() {
    let api = `${this.endpoint}/user`;
    return this.http.get(api)
      .pipe(
        catchError(this.handleError)
      )
  }

  getToken() {
    return localStorage.getItem('access_token');
  }

  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('access_token');
    return (authToken !== null) ? true : false;
  }

  doLogout() {
    let removeToken = localStorage.removeItem('access_token');
    if (removeToken == null) {
      this.router.navigate(['log-in']);
    }
  }

  // Error 
  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }
}