import { NgModule } from '@angular/core';
import { IntroductionRoutingModule } from './introduction-routing.module';
import { IntroductionComponent } from './introduction.component';
import { SharedModule } from '../shared/shared.module';
import { IntroductionDetailComponent } from './introduction-detail/introduction-detail.component';


@NgModule({
  declarations: [IntroductionComponent, IntroductionDetailComponent],
  imports: [
    SharedModule,
    IntroductionRoutingModule
  ]
})
export class IntroductionModule { }
