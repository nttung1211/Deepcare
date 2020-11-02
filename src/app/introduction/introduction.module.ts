import { NgModule } from '@angular/core';
import { IntroductionRoutingModule } from './introduction-routing.module';
import { IntroductionComponent } from './introduction.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [IntroductionComponent],
  imports: [
    SharedModule,
    IntroductionRoutingModule
  ]
})
export class IntroductionModule { }
