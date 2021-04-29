import { LearnerIcComponent } from './learner-ic/learner-ic.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { LearnerComponent } from './learner.component';

const routes: Routes = [{
  path: '',
  component: LearnerComponent,
  children: [
    {
      path: 'ic',
      component: LearnerIcComponent,
      // loadChildren: () => import('./ic-iframe/ic-iframe.module')
      //   .then(m => m.IcUserModule),
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LearnerRoutingModule {
}
