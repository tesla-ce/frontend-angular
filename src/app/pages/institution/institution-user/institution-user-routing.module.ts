import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InstitutionUserComponent } from './institution-user.component';
import { InstitutionUserReadComponent } from './institution-user-read/institution-user-read.component';
import { InstitutionUserCreateComponent } from './institution-user-create/institution-user-create.component';
import { InstitutionUserUpdateComponent } from './institution-user-update/institution-user-update.component';
import { InstitutionUserListComponent } from './institution-user-list/institution-user-list.component';

const routes: Routes = [{
  path: '',
  component: InstitutionUserComponent,
  children: [
    {
      path: '',
      component: InstitutionUserListComponent,
    },
    {
      path: 'create',
      component: InstitutionUserCreateComponent,
    },
    {
      path: ':id/update',
      component: InstitutionUserUpdateComponent,
    },
    {
      path: ':id',
      component: InstitutionUserReadComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InstitutionUserRoutingModule { }
