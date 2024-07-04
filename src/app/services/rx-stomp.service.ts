import { Injectable, OnDestroy } from '@angular/core';
import { CompatClient, Stomp} from '@stomp/stompjs';
import { ChatMessage } from '../entity/message';
import SockJS from 'sockjs-client';


@Injectable({
  providedIn: 'root'
})

export class RxStompService  {
  
  
  constructor() {
    this.initializeWebSocketConnection();
  }
  public stompClient: CompatClient;

  initializeWebSocketConnection() {
    const serverUrl = "http://localhost:8080/websocket";
    console.log(serverUrl);
    const ws = new SockJS(serverUrl);
    this.stompClient = Stomp.over(ws);
    const that = this;
    // tslint:disable-next-line:only-arrow-functions
  }

  sendMessage(url:string,message: ChatMessage) {
    this.stompClient.send(url, {}, JSON.stringify(message));
  }
}
