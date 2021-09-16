import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { EnrolmentComponent } from './enrolment.component';
import { EnrolmentDefaultComponent } from './enrolment-default/enrolment-default.component';
import {SendComponent} from "./enrolment-default/send/send.component";

const routes: Routes = [{
  path: '',
  component: EnrolmentComponent,
  children: [
    {
      path: '',
      component: EnrolmentDefaultComponent,
    },
    {
      path: 'send/:instrument_id',
      component: SendComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EnrolmentRoutingModule {
}
