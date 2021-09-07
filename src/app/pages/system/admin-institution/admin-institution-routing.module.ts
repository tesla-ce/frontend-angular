import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminInstitutionComponent } from './admin-institution.component';
import { AdminInstitutionReadComponent } from './admin-institution-read/admin-institution-read.component';
import { AdminInstitutionCreateComponent } from './admin-institution-create/admin-institution-create.component';
import { AdminInstitutionUpdateComponent } from './admin-institution-update/admin-institution-update.component';
import { AdminInstitutionListComponent } from './admin-institution-list/admin-institution-list.component';

const routes: Routes = [{
  path: '',
  component: AdminInstitutionComponent,
  children: [
    {
      path: '',
      component: AdminInstitutionListComponent,
    },
    {
      path: ':id',
      component: AdminInstitutionReadComponent,
    },
    {
      path: 'create',
      component: AdminInstitutionCreateComponent,
    },
    {
      path: ':id/update',
      component: AdminInstitutionUpdateComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminInstitutionRoutingModule { }
