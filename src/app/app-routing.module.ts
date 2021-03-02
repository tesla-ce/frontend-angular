import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import {
  NbAuthComponent,
  NbLoginComponent,
  NbLogoutComponent,
} from '@nebular/auth';
import {AuthGuardAuthenticated} from './@core/auth/guards/auth-guard-authenticated';
import {IcManagementComponent} from './ic-management/ic-management.component';
import { AuthGuardAdmin } from './@core/auth/guards/auth-guard-admin';
import { DashboardComponent } from './dashboard/dashboard.component';

export const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module')
      .then(m => m.AdminModule),
    canActivate: [AuthGuardAuthenticated],
  },
  {
    path: 'institution',
    loadChildren: () => import('./institution/institution.module')
      .then(m => m.InstitutionModule),
    canActivate: [AuthGuardAuthenticated],
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuardAuthenticated],
  },
  {
    path: 'informed-consent/update',
    component: IcManagementComponent,
  },
  {
    path: 'auth',
    component: NbAuthComponent,
    children: [
      {
        path: '',
        component: NbLoginComponent,
      },
      {
        path: 'login',
        component: NbLoginComponent,
      },
      {
        path: 'logout',
        component: NbLogoutComponent,
      },
    ],
  },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: '/dashboard', pathMatch: 'full' },
];

const config: ExtraOptions = {
  useHash: false,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
