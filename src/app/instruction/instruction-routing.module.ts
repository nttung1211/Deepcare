import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostDetailComponent } from '../posts/post-detail/post-detail.component';
import { FeaturesComponent } from './features/features.component';
import { QnaComponent } from './qna/qna.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'features',
    pathMatch: 'full'
  },

  {
    path: 'features',
    component: FeaturesComponent
  },

  {
    path: 'features/:id',
    component: PostDetailComponent
  },

  {
    path: 'qna',
    component: QnaComponent
  },

  {
    path: 'qna/:id',
    component: PostDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InstructionRoutingModule { }