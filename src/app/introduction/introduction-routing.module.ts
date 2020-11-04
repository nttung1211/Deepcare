import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IntroductionDetailComponent } from './introduction-detail/introduction-detail.component';
import { IntroductionComponent } from './introduction.component';


const routes: Routes = [
  { 
    path: '', 
    component: IntroductionComponent
  },
  { 
    path: ':id', 
    component: IntroductionDetailComponent 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IntroductionRoutingModule { }
