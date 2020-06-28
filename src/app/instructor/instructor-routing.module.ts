import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { InstructorComponent } from './instructor.component';
import { DashboardComponent } from '../dashboard/dashboard.component';

const routes: Routes = [{
  path: '',
  component: InstructorComponent,
  children: [
    {
      path: 'dashboard',
      component: DashboardComponent,
    },
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InstructorRoutingModule {
}