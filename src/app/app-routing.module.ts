import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignUpPageComponent } from './components/sign-up-page/sign-up-page.component';
import { AppComponent } from './app.component';
import { ChatPageComponent } from './components/chat-page/chat-page.component';
import { LoginPageComponent } from './components/login-page/login-page.component';

const routes: Routes = [
  {path:"signup",component:SignUpPageComponent},
  {path:"login",component:LoginPageComponent},
  {path:"chats",component:ChatPageComponent},
  {path: '', redirectTo: '/signup', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
