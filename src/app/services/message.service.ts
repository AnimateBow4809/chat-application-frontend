import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Chat } from '../entity/chat';
import { User } from '../entity/user';
import { Observable, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  
  private baseUrl = 'http://localhost:8080/api/search'; // Change this to match your backend server URL

  constructor(private http: HttpClient) { }

  public getSearchResults(search: string,user:string): Observable<HttpResponse<SearchChatHelper>> {
    return this.http.post<SearchChatHelper>(`${this.baseUrl}/chats/and/user`, {"query":search,"user":user}, { observe: 'response' })
      .pipe(
        catchError((error) => {
          console.error('An error occurred:', error);
          return of(new HttpResponse<SearchChatHelper>({ status: 400, body: null }));
        })
      );
  }

  makeNewChat(userSender:User,userReciver:User): Observable<HttpResponse<Chat>> {
    let list:User[]=[userSender,userReciver];
    return this.http.post<Chat>(`${this.baseUrl}/new/chat`,list, { observe: 'response' })
      .pipe(
        catchError((error) => {
          console.error('An error occurred:', error);
          return of(new HttpResponse<Chat>({ status: 400, body: null }));
        })
      );
  }

}

export interface SearchChatHelper{
  chats:Chat[];
  user:User[];

}