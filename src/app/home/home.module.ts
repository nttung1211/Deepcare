import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { HomeFeaturesComponent } from './home-features/home-features.component';
import { HomePartnersComponent } from './home-partners/home-partners.component';
import { HomeDoctorsComponent } from './home-doctors/home-doctors.component';
import { HomeLandingComponent } from './home-landing/home-landing.component';
import { HomeNewsComponent } from './home-news/home-news.component';
import { HomeServicesComponent } from './home-services/home-services.component';



@NgModule({
  declarations: [
    HomeComponent,
    HomeLandingComponent,
    HomeFeaturesComponent,
    HomeDoctorsComponent,
    HomeNewsComponent,
    HomePartnersComponent,
    HomeServicesComponent
  ],
  imports: [
    SharedModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
