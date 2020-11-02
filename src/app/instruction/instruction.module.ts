import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { InstructionRoutingModule } from './instruction-routing.module';
import { QnaComponent } from './qna/qna.component';
import { FeaturesComponent } from './features/features.component';
import { InstructionComponent } from './instruction.component';


@NgModule({
  declarations: [
    InstructionComponent,
    FeaturesComponent,
    QnaComponent
  ],
  imports: [
    SharedModule,
    InstructionRoutingModule
  ]
})
export class InstructionModule { }
