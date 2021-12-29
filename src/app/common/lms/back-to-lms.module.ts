import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackToLMSComponent } from './back-to-lms.component';
import { SharedModule } from '../../shared/shared.module';
import { NbButtonModule } from '@nebular/theme';

@NgModule({
  declarations: [
    BackToLMSComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    NbButtonModule,
  ],
  exports: [
    BackToLMSComponent,
  ],
})
export class BackToLMSModule { }
