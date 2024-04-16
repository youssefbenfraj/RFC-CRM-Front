import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EssaiComponent } from './essai/essai.component';
import { DealComponent } from './components/deal/deal.component';
import { PostComponent } from './components/post/post.component';



const routes: Routes = [{ path: 'essai', component: EssaiComponent },
{ path: 'deal', component: DealComponent },
{ path: 'post', component: PostComponent },

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
