import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RxStompService } from './services/rx-stomp.service';
import { rxStompServiceFactory } from './rx-stomp-service-factory';
import { ChatListComponent } from './components/chat-list/chat-list.component';
import { MessageComponent } from './components/message/message.component';
import { SignUpPageComponent } from './components/sign-up-page/sign-up-page.component';
import { ChatPageComponent } from './components/chat-page/chat-page.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { UserService } from './services/user.service';
import { MessageService } from './services/message.service';
import { ChatService } from './services/chat.service';
import { UserGlobalService } from './services/user-global.service';

@NgModule({
  declarations: [
    AppComponent,
    ChatListComponent,
    MessageComponent,
    SignUpPageComponent,
    ChatPageComponent,
    LoginPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    RxStompService,
    provideClientHydration(),
    UserService,
    MessageService,
    ChatService,
    UserGlobalService,
    provideHttpClient(withFetch())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
