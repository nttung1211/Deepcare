import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostDetailComponent } from '../posts/post-detail/post-detail.component';
import { CompaniesComponent } from './companies/companies.component';
import { DoctorsComponent } from './doctors/doctors.component';


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
    component: PostDetailComponent
  },
  { 
    path: 'doctors', 
    component: DoctorsComponent
  },
  { 
    path: 'doctors/:id', 
    component: PostDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PartnersRoutingModule { }
