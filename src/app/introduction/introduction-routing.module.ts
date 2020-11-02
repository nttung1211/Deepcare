import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostDetailComponent } from '../posts/post-detail/post-detail.component';
import { IntroductionComponent } from './introduction.component';


const routes: Routes = [
  { 
    path: '', 
    component: IntroductionComponent
  },
  { 
    path: ':id', 
    component: PostDetailComponent 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IntroductionRoutingModule { }
