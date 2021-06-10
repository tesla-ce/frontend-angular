import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { AdminComponent } from './admin.component';
import { InstitutionComponent } from './institution/institution.component';
import { InstrumentComponent } from './instrument/instrument.component';
import { ServiceComponent } from './service/service.component';
import { StatusComponent } from './status/status.component';

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
      path: 'institution',
      component: InstitutionComponent,
    },
    {
      path: 'instrument',
      component: InstrumentComponent,
    },
    {
      path: 'service',
      component: ServiceComponent,
    },
    {
      path: 'status',
      component: StatusComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {
}
