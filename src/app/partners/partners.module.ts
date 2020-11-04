import { NgModule } from '@angular/core';
import { PartnersRoutingModule } from './partners-routing.module';
import { PartnersComponent } from './partners.component';
import { CompaniesComponent } from './companies/companies.component';
import { SharedModule } from '../shared/shared.module';
import { CompanyDetailComponent } from './companies/company-detail/company-detail.component';


@NgModule({
  declarations: [
    PartnersComponent, 
    CompaniesComponent, 
    CompanyDetailComponent
  ],
  imports: [
    SharedModule,
    PartnersRoutingModule
  ]
})
export class PartnersModule { }
