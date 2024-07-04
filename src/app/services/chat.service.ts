import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Chat } from '../entity/chat';
import { ChatMessage } from '../entity/message';
import { Observable, catchError, of } from 'rxjs';
import { User } from '../entity/user';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private baseUrl = 'http://localhost:8080/api/chat'; // Change this to match your backend server URL

  constructor(private http: HttpClient) { }

  public getMessages(chat: Chat): Observable<HttpResponse<ChatMessage[]>> {
    return this.http.post<ChatMessage[]>(`${this.baseUrl}/getmessages`, chat, { observe: 'response' })
      .pipe(
        catchError((error) => {
          console.error('An error occurred:', error);
          return of(new HttpResponse<ChatMessage[]>({ status: 400, body: null }));
        })
      );
  }


  public getMessagesAndUsers(chat: Chat): Observable<HttpResponse<ResponseHelper>> {
    return this.http.post<ResponseHelper>(`${this.baseUrl}/getmessagesnew`, chat, { observe: 'response' })
      .pipe(
        catchError((error) => {
          console.error('An error occurred:', error);
          return of(new HttpResponse<ResponseHelper>({ status: 400, body: null }));
        })
      );
  }


}
interface ResponseHelper {
  messages: ChatMessage[],
  users: User[]
}
