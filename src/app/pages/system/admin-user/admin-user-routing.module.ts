import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminUserComponent } from './admin-user.component';
import { AdminUserReadComponent } from './admin-user-read/admin-user-read.component';
import { AdminUserCreateComponent } from './admin-user-create/admin-user-create.component';
import { AdminUserUpdateComponent } from './admin-user-update/admin-user-update.component';
import { AdminUserListComponent } from './admin-user-list/admin-user-list.component';

const routes: Routes = [{
  path: '',
  component: AdminUserComponent,
  children: [
    {
      path: '',
      component: AdminUserListComponent,
    },
    {
      path: ':id',
      component: AdminUserReadComponent,
    },
    {
      path: 'create',
      component: AdminUserCreateComponent,
    },
    {
      path: ':id/update',
      component: AdminUserUpdateComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminUserRoutingModule { }
