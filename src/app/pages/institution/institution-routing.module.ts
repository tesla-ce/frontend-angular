import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { InstitutionComponent } from './institution.component';
import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [{
  path: '',
  component: InstitutionComponent,
  children: [
    {
      path: 'user',
      loadChildren: () => import('./institution-user/institution-user.module')
        .then(m => m.InstitutionUserModule),
    },
    {
      path: 'ic',
      loadChildren: () => import('./institution-ic/institution-ic.module')
        .then(m => m.InstitutionIcModule),
    },
    {
      path: 'send',
      loadChildren: () => import('./institution-send/institution-send.module')
        .then(m => m.InstitutionSendModule),
    },
    {
      path: 'settings',
      component: SettingsComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InstitutionRoutingModule {
}
