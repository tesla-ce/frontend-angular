import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserManagementComponent } from './user-management.component';

const routes: Routes = [{
  path: '',
  component: UserManagementComponent,
  // children: [
  //   {
  //     path: 'dashboard',
  //     component: DashboardComponent,
  //   },
  //   {
  //     path: '',
  //     redirectTo: 'dashboard',
  //     pathMatch: 'full',
  //   },
  // ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserManagementRoutingModule { }
