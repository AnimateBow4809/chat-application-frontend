import { AfterViewChecked, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UserGlobalService } from '../../services/user-global.service';
import { Chat } from '../../entity/chat';
import { ChatService } from '../../services/chat.service';
import { ChatMessage } from '../../entity/message';
import { formatDate } from '@angular/common';
import { RxStompService } from '../../services/rx-stomp.service';
import { User } from '../../entity/user';
import { Router } from '@angular/router';


@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrl: './message.component.css'
})
export class MessageComponent implements OnInit,AfterViewChecked {

  chat: Chat = new Chat(0, "", null);
  messages: ChatMessage[];
  Recivers: User[];
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;

  scrollToBottom(): void {
    try {
        this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch(err) { }                 
  }

  
  ngAfterViewChecked() {        
    this.scrollToBottom();        
  } 

  constructor(private router: Router, private chatService: ChatService, protected userGloabal: UserGlobalService, private rxStompService: RxStompService) {
    this.chat = userGloabal.getChat();
  }

  public formatDate(date: Date, str1: string, str2: string) {
    return formatDate(date, str1, str2);
  }

  checkCharacterLimit(input: HTMLInputElement): void {
    if (input.value.length > 150) {
        input.value = input.value.slice(0, 150); // Limiting input to 200 characters
    }
  }

  formatMessageContent(messageContent: string): string {
    const maxLength = 75;
    let formattedContent = '';
    for (let i = 0; i < messageContent.length; i += maxLength) {
        formattedContent += messageContent.substring(i, i + maxLength) + '<br>';
    }
    return formattedContent;
}

  ngOnInit(): void {
    this.userGloabal.chat$.subscribe(data => {
      this.chat = data;
      this.chatService.getMessagesAndUsers(this.chat).subscribe(res => {
        if (res.status == 200) {
          this.messages = res.body.messages
          this.Recivers = res.body.users
        } else {
          console.log("Error nastyyy whenn getting massages")
        }
      });
    })
    this.rxStompService.stompClient.connect({}, () => {
      this.rxStompService.stompClient.subscribe(`/topic/public/${this.userGloabal.getUser().userName}`, (message) => {
        this.messages.push(JSON.parse(message.body));
      });
    });
    this.scrollToBottom();        
  }

  sendMessage(content: string): void {
    let message: ChatMessage = new ChatMessage(null, this.chat.id, this.userGloabal.getUser().id, content, new Date(), this.userGloabal.getUser())
    for (let user of this.Recivers) {
      this.rxStompService.sendMessage(`/app/chat/send/${user.userName}`, message);
    }
  }
}
