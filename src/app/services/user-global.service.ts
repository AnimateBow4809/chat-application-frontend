import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../entity/user';
import { Chat } from '../entity/chat';

@Injectable({
  providedIn: 'root'
})
export class UserGlobalService {
  private userSubject: BehaviorSubject<User|null> = new BehaviorSubject<User|null>(null);
  public user$ = this.userSubject.asObservable();

  private chatSubject: BehaviorSubject<Chat|null> = new BehaviorSubject<Chat|null>(null);
  public chat$ = this.chatSubject.asObservable();


  constructor() { }

  setUser(user: User|null): void {
    if(user.chats==null){
      user.chats=[];
    }
    this.userSubject.next(user);
  }

  getUser(): User|null {
    return this.userSubject.getValue();
  }


  setChat(Chat: Chat|null): void {
    this.chatSubject.next(Chat);
  }

  getChat(): Chat|null {
    return this.chatSubject.getValue();
  }

}
