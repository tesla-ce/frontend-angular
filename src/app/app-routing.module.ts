import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import {
  NbAuthComponent,
  NbLoginComponent,
  NbLogoutComponent,
} from '@nebular/auth';
import {AuthGuardAuthenticated} from './@core/auth/guards/auth-guard-authenticated';
// import { AuthGuardAdmin } from './@core/auth/guards/auth-guard-admin';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LauncherComponent } from './@core/launcher/launcher.component';

export const routes: Routes = [
  {
    path: 'auth/launcher',
    component: LauncherComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuardAuthenticated],
  },
  {
    path: 'institution',
    loadChildren: () => import('./pages/institution/institution.module')
      .then(m => m.InstitutionModule),
    canActivate: [AuthGuardAuthenticated],
  },
  {
    path: 'system',
    loadChildren: () => import('./pages/system/admin.module')
      .then(m => m.AdminModule),
    canActivate: [AuthGuardAuthenticated],
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
