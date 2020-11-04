import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DoctorDetailComponent } from './doctor-detail/doctor-detail.component';

import { DoctorsComponent } from './doctors.component';

const routes: Routes = [
  { 
    path: '', 
    component: DoctorsComponent
  },
  { 
    path: ':id', 
    component: DoctorDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DoctorsRoutingModule { }
