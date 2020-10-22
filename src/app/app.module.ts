import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LandingComponent } from './landing/landing.component';
import { DropdownDirective } from './shared/Dropdown.directive';
import { FeaturesComponent } from './features/features.component';
import { DownloadAppComponent } from './download-app/download-app.component';
import { FooterComponent } from './footer/footer.component';
import { RevealAnimateDirective } from './shared/reveal-animate.directive';
import { DoctorsComponent } from './doctors/doctors.component';
import { NewsComponent } from './news/news.component';
import { PartnersComponent } from './partners/partners.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LandingComponent,
    DropdownDirective,
    FeaturesComponent,
    DownloadAppComponent,
    FooterComponent,
    RevealAnimateDirective,
    DoctorsComponent,
    NewsComponent,
    PartnersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
