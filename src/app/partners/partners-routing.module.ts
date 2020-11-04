import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompaniesComponent } from './companies/companies.component';
import { CompanyDetailComponent } from './companies/company-detail/company-detail.component';


const routes: Routes = [
  { 
    path: '', 
    redirectTo: 'companies',
    pathMatch: 'full'
  },
  { 
    path: 'companies', 
    component: CompaniesComponent
  },
  { 
    path: 'companies/:id', 
    component: CompanyDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PartnersRoutingModule { }
