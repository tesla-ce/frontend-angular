import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { AdminComponent } from './admin.component';

const routes: Routes = [{
  path: '',
  component: AdminComponent,
  children: [
    {
      path: 'admin-user',
      loadChildren: () => import('./admin-user/admin-user.module')
      .then(m => m.AdminUserModule),
    },
    {
      path: 'admin-institution',
      loadChildren: () => import('./admin-institution/admin-institution.module')
      .then(m => m.AdminInstitutionModule),
    },
    {
      path: 'admin-instrument',
      loadChildren: () => import('./admin-instrument/admin-instrument.module')
      .then(m => m.AdminInstrumentModule),
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {
}
