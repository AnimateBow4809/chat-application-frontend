import { Injectable } from '@angular/core';
import { Observable, catchError, of, throwError } from 'rxjs';
import { User } from '../entity/user';
import { HttpClient, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:8080/api/user'; // Change this to match your backend server URL

  constructor(private http: HttpClient) { }

  public login(user: User): Observable<HttpResponse<User>> {
    return this.http.post<User>(`${this.baseUrl}/login`, user, { observe: 'response' })
    .pipe(
      catchError((error) => {
        console.error('An error occurred:', error);
        return of(new HttpResponse<User>({ status: 400, body: null }));
      })
    );
  }

  public signUp(user: User): Observable<HttpResponse<User>> {
    return this.http.post<User>(`${this.baseUrl}/sign`, user, { observe: 'response' })
    .pipe(
      catchError((error) => {
        console.error('error:', error);
        return of(new HttpResponse<User>({ status: 400, body: null }));
      })
    );
  }
}
