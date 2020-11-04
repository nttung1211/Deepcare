import { NgModule } from '@angular/core';

import { DoctorsRoutingModule } from './doctors-routing.module';
import { DoctorsComponent } from './doctors.component';
import { SharedModule } from '../shared/shared.module';
import { DoctorDetailComponent } from './doctor-detail/doctor-detail.component';


@NgModule({
  declarations: [DoctorsComponent, DoctorDetailComponent],
  imports: [
    SharedModule,
    DoctorsRoutingModule
  ]
})
export class DoctorsModule { }
