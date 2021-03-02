import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { InstitutionComponent } from './institution.component';
import { InstitutionDashboardComponent } from './institution-dashboard/institution-dashboard.component';

const routes: Routes = [{
  path: '',
  component: InstitutionComponent,
  children: [
    {
      path: 'dashboard',
      component: InstitutionDashboardComponent,
    },
    {
      path: 'institution-user',
      loadChildren: () => import('./institution-user/institution-user.module')
      .then(m => m.InstitutionUserModule),
    },
    {
      path: 'institution-ic',
      loadChildren: () => import('./institution-ic/institution-ic.module')
      .then(m => m.InstitutionIcModule),
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
export class InstitutionRoutingModule {
}
