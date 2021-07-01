import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { EnrolmentComponent } from './enrolment.component';
import { EnrolmentDefaultComponent } from './enrolment-default/enrolment-default.component';

const routes: Routes = [{
  path: '',
  component: EnrolmentComponent,
  children: [
    {
      path: '',
      component: EnrolmentDefaultComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EnrolmentRoutingModule {
}
