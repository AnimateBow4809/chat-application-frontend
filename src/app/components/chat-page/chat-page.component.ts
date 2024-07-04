import { Component, OnInit } from '@angular/core';
import { UserGlobalService } from '../../services/user-global.service';
import { UserService } from '../../services/user.service';
import { User } from '../../entity/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrl: './chat-page.component.css'
})
export class ChatPageComponent implements OnInit {

  user:User|null;
  constructor(private router: Router, private userSerivce: UserService,private userGloabal:UserGlobalService) {
    this.user=userGloabal.getUser();
   }

  ngOnInit(): void {
      this.userGloabal.user$.subscribe(data=>{
          this.user=data;
      })  
  }

}
