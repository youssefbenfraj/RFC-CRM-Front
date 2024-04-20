import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EssaiComponent } from './essai/essai.component';
import { DealComponent } from './components/deal/deal.component';
import { PostComponent } from './components/post/post.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { RegisterComponent } from './components/register/register.component';
import { UserComponent } from './components/user/user.component';
import { SimpleUserComponent } from './components/simple-user/simple-user.component';


@NgModule({
  declarations: [
    AppComponent,
    EssaiComponent,
    DealComponent,
    PostComponent,
    LoginComponent,
    SideBarComponent,
    RegisterComponent,
    UserComponent,
    SimpleUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
