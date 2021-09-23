import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnrolmentStatusComponent } from './enrolment-status.component';
import {NgxEchartsModule} from 'ngx-echarts';


@NgModule({
  declarations: [
    EnrolmentStatusComponent,
  ],
  imports: [
    CommonModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    }),
  ],
  exports: [
    EnrolmentStatusComponent,
  ],
})
export class EnrolmentStatusModule { }
