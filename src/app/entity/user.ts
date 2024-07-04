import { Chat } from "./chat";

export class User {
    id: number;
    userName: string;
    password: string|null;
    chats:Chat[]|null;
  
    constructor(id: number, userName: string, password: string,chats:Chat[]|null=null) {
      this.id = id;
      this.userName = userName;
      this.password = password;
      this.chats=chats;
    }
  }
  