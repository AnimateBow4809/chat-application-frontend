import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserGlobalService } from '../../services/user-global.service';
import { UserService } from '../../services/user.service';
import { User } from '../../entity/user';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css',
  host: {ngSkipHydration: 'true'}
})
export class LoginPageComponent implements OnInit {
  username: string = "";
  password: string = "";
  userInvalid: boolean = false;

  ngOnInit(): void {
  }

  constructor(private router: Router, private userSerivce: UserService,private userGloabal:UserGlobalService) { }

  submitForm():void{
    this.userInvalid=false;

    let temp: User = new User(0, this.username, this.password);
      this.userSerivce.login(temp).subscribe(res => {
        if (res.status == 200) {
          //set user and navigate
          this.userGloabal.setUser(res.body);
          this.router.navigate(["chats"]);
        } else {
          this.userInvalid=true;
        }
      })

  }
}
