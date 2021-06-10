import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { MonitoringComponent } from './monitoring.component';
import { MonitoringDefaultComponent } from './monitoring-default/monitoring-default.component';

const routes: Routes = [{
  path: '',
  component: MonitoringComponent,
  children: [
    {
      path: '',
      component: MonitoringDefaultComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MonitoringRoutingModule {
}
