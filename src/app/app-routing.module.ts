import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import {
  NbAuthComponent,
  NbLoginComponent,
  NbLogoutComponent,
} from '@nebular/auth';
import {AuthGuardAuthenticated} from './@core/auth/guards/auth-guard-authenticated';
import {UserManagementComponent} from './admin/user-management/user-management.component';
import {IcManagementComponent} from './ic-management/ic-management.component';

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
    path: 'users',
    component: UserManagementComponent,
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
  { path: '', redirectTo: 'admin/dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: 'admin/dashboard', pathMatch: 'full' },
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
