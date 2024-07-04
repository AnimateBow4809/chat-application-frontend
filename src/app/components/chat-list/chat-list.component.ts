import { Component, OnInit } from '@angular/core';
import { User } from '../../entity/user';
import { UserGlobalService } from '../../services/user-global.service';
import { Chat } from '../../entity/chat';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrl: './chat-list.component.css',
  host: { ngSkipHydration: 'true' }
})
export class ChatListComponent implements OnInit {
  user: User | null;
  chatsSearch:Chat[];
  userSearch:User[];
  searchMode: boolean = false;

  constructor( private userGloabal: UserGlobalService,private messageService:MessageService) {
    this.user = userGloabal.getUser();
  }

  handleChatClick(chat:Chat): void {
    this.userGloabal.setChat(chat)
  }

  handleUserClick(user:User): void {
    this.messageService.makeNewChat(this.user,user).subscribe(res=>{
      if (res.status==200) {
        this.userGloabal.setChat(res.body);
        this.user.chats.push(res.body);
      }else{
        console.log("feiled to make new chat")
      }
    });
  }

  getRandomColor(): string {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
  }

  ngOnInit(): void {
    this.userGloabal.user$.subscribe(data => {
      this.user = data;
    })
  }

  searchChats(search:string):void{
    this.messageService.getSearchResults(search,this.userGloabal.getUser().userName).subscribe(data=>{
      if(data.status==200){
        this.userSearch=data.body.user;
        this.chatsSearch=data.body.chats;
        this.enterSearchMode();
      }else{
        console.log("couldent get search Resualts");
      }
    })
  }

  enterSearchMode(): void {
    this.searchMode = true;
  }
  
  exitSearchMode(): void {
    this.searchMode = false;
  }
}
