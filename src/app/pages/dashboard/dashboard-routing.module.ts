import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { DashboardComponent } from './dashboard.component';
import { DashboardDefaultComponent } from './dashboard-default/dashboard-default.component';

const routes: Routes = [{
  path: '',
  component: DashboardComponent,
  children: [
    {
      path: '',
      component: DashboardDefaultComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {
}
