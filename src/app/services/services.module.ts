import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ServiceDetailComponent } from './service-detail/service-detail.component';
import { ServicesRoutingModule } from './services-routing.module';
import { ServicesComponent } from './services.component';



@NgModule({
  declarations: [
    ServicesComponent,
    ServiceDetailComponent
  ],
  imports: [
    SharedModule,
    ServicesRoutingModule
  ]
})
export class ServicesModule { }
