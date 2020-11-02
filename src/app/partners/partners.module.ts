import { NgModule } from '@angular/core';
import { PartnersRoutingModule } from './partners-routing.module';
import { PartnersComponent } from './partners.component';
import { CompaniesComponent } from './companies/companies.component';
import { DoctorsComponent } from './doctors/doctors.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    PartnersComponent, 
    CompaniesComponent, 
    DoctorsComponent
  ],
  imports: [
    SharedModule,
    PartnersRoutingModule
  ]
})
export class PartnersModule { }
