import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FeatureDetailComponent } from './features/feature-detail/feature-detail.component';
import { FeaturesComponent } from './features/features.component';
import { QnaDetailComponent } from './qna/qna-detail/qna-detail.component';
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
    component: FeatureDetailComponent
  },

  {
    path: 'qna',
    component: QnaComponent
  },

  {
    path: 'qna/:id',
    component: QnaDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InstructionRoutingModule { }