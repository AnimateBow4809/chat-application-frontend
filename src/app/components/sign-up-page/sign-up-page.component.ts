import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../entity/user';
import { UserGlobalService } from '../../services/user-global.service';

@Component({
  selector: 'app-sign-up-page',
  templateUrl: './sign-up-page.component.html',
  styleUrl: './sign-up-page.component.css',
  host: { ngSkipHydration: 'true' }
})
export class SignUpPageComponent implements OnInit {
  username: string = "";
  password: string = "";
  usernameInvalid: boolean = false;
  passwordInvalid: boolean = false;
  userInvalid: boolean = false;


  ngOnInit(): void {
  }

  constructor(private router: Router, private userSerivce: UserService,private userGloabal:UserGlobalService) { }


  validateUsername() {
    this.usernameInvalid = !/^[a-zA-Z0-9]+$/.test(this.username);
  }

  validatePassword() {
    this.passwordInvalid = this.password.length < 8;
  }

  submitForm() {
    this.userInvalid=false;
    this.validateUsername();
    this.validatePassword();
    if (!this.usernameInvalid && !this.passwordInvalid) {
      let temp: User = new User(0, this.username, this.password);
      this.userSerivce.signUp(temp).subscribe(res => {
        if (res.status == 200) {
          //set user and navigate
          this.userGloabal.setUser(res.body)
          this.router.navigate(["chats"]);
        } else {
          this.userInvalid=true;
        }
      })

    }
  }
}
