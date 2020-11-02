import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { SharedModule } from './shared/shared.module';
import { ServiceFormModalComponent } from './services/service-form-modal/service-form-modal.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DownloadAppComponent } from './download-app/download-app.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DownloadAppComponent,
    FooterComponent,
    ErrorPageComponent,
    ServiceFormModalComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    SharedModule,
    BrowserAnimationsModule // only once
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
