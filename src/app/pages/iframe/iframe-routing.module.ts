import { IcIframeComponent } from './ic-iframe/ic-iframe.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { IframeComponent } from './iframe.component';

const routes: Routes = [{
  path: '',
  component: IframeComponent,
  children: [
    {
      path: 'ic-iframe/:id',
      component: IcIframeComponent,
      // loadChildren: () => import('./ic-iframe/ic-iframe.module')
      //   .then(m => m.IcIframeModule),
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IframeRoutingModule {
}
