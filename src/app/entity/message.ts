import { User } from "./user";

export class ChatMessage {
    id: number;
    chatId: number;
    userId: number;
    content: string;
    sendDate: Date;
    sender:User;
  
    constructor(id: number, chatId: number, userId: number, content: string, sendDate: Date,sender:User) {
      this.id = id;
      this.chatId = chatId;
      this.userId = userId;
      this.content = content;
      this.sendDate = sendDate;
      this.sender=sender;
    }
  }
  