import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { InstructionRoutingModule } from './instruction-routing.module';
import { QnaComponent } from './qna/qna.component';
import { FeaturesComponent } from './features/features.component';
import { InstructionComponent } from './instruction.component';
import { FeatureDetailComponent } from './features/feature-detail/feature-detail.component';
import { QnaDetailComponent } from './qna/qna-detail/qna-detail.component';


@NgModule({
  declarations: [
    InstructionComponent,
    FeaturesComponent,
    QnaComponent,
    FeatureDetailComponent,
    QnaDetailComponent
  ],
  imports: [
    SharedModule,
    InstructionRoutingModule
  ]
})
export class InstructionModule { }
