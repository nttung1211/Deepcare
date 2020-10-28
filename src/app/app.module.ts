import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { MarkdownModule } from 'ngx-markdown';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DropdownDirective } from './shared/Dropdown.directive';
import { RevealAnimateDirective } from './shared/reveal-animate.directive';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { NewsSectionComponent } from './home/news-section/news-section.component';
import { PartnersComponent } from './home/partners/partners.component';
import { LandingComponent } from './home/landing/landing.component';
import { FeaturesComponent } from './home/features/features.component';
import { DownloadAppComponent } from './home/download-app/download-app.component';
import { DoctorsComponent } from './home/doctors/doctors.component';
import { NewsComponent } from './news/news.component';
import { NewsDetailComponent } from './news/news-detail/news-detail.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ServicesComponent } from './services/services.component';
import { ServiceFormModalComponent } from './services/service-form-modal/service-form-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


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
    NewsSectionComponent,
    PartnersComponent,
    HomeComponent,
    NewsComponent,
    NewsDetailComponent,
    ErrorPageComponent,
    ServicesComponent,
    ServiceFormModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MarkdownModule.forRoot(),
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
