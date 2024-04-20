import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EssaiComponent } from './essai/essai.component';
import { DealComponent } from './components/deal/deal.component';
import { PostComponent } from './components/post/post.component';
import { LoginComponent } from './components/login/login.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { RegisterComponent } from './components/register/register.component';
import { UserComponent } from './components/user/user.component';
import { SimpleUserComponent } from './components/simple-user/simple-user.component';



const routes: Routes = [{ path: 'essai', component: EssaiComponent },
{ path: 'deal', component: DealComponent },
{ path: 'post', component: PostComponent },
{ path:'admin', component: UserComponent},
{ path: 'user', component: SimpleUserComponent},
{ path: 'login', component: LoginComponent},
{ path : 'sidebar' , component : SideBarComponent},
{ path: 'register', component:RegisterComponent},




];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
