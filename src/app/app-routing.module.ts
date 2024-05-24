import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DealComponent } from './components/deal/deal.component';
import { PostComponent } from './components/post/post.component';
import { LoginComponent } from './components/login/login.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { RegisterComponent } from './components/register/register.component';
import { UserComponent } from './components/user/user.component';
import { SimpleUserComponent } from './components/simple-user/simple-user.component';
import { ChatComponent } from './components/chat/chat.component';



const routes: Routes = [
{ path: 'deal', component: DealComponent },
{ path: 'post', component: PostComponent },
{ path:'admin', component: UserComponent},
{ path: 'user', component: SimpleUserComponent},
{ path: 'login', component: LoginComponent},
{ path : 'sidebar' , component : SideBarComponent},
{ path: 'register', component:RegisterComponent},
{ path: 'chat', component: ChatComponent},
{ path: '', redirectTo: '/login', pathMatch: 'full' },
{ path: '**', redirectTo: '/login', pathMatch: 'full' },
{ path: 'chat', component: ChatComponent }




];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
