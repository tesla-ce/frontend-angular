import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { StatisticsComponent } from './statistics.component';
import { StatisticsDefaultComponent } from './statistics-default/statistics-default.component';

const routes: Routes = [{
  path: '',
  component: StatisticsComponent,
  children: [
    {
      path: '',
      component: StatisticsDefaultComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StatisticsRoutingModule {
}
