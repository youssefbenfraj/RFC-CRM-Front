import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DealComponent } from './components/deal/deal.component';
import { PostComponent } from './components/post/post.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { RegisterComponent } from './components/register/register.component';
import { UserComponent } from './components/user/user.component';
import { SimpleUserComponent } from './components/simple-user/simple-user.component';
import { CommentListComponent } from './components/comment-list/comment-list.component';
import { ChatComponent } from './components/chat/chat.component';



@NgModule({
  declarations: [
    AppComponent,
    DealComponent,
    PostComponent,
    LoginComponent,
    SideBarComponent,
    RegisterComponent,
    UserComponent,
    SimpleUserComponent,
    CommentListComponent,
    ChatComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
