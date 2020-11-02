import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostDetailComponent } from '../posts/post-detail/post-detail.component';

import { NewsComponent } from './news.component';

const routes: Routes = [
  { 
    path: '', 
    component: NewsComponent 
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
export class NewsRoutingModule { }
