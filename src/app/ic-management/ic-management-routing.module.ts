import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IcManagementComponent } from './ic-management.component';

const routes: Routes = [{
  path: '',
  component: IcManagementComponent,
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
  exports: [RouterModule],
})
export class IcManagementRoutingModule { }
