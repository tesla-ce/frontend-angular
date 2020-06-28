import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import {
  NbAuthComponent,
  NbLoginComponent,
  NbLogoutComponent,
} from '@nebular/auth';
import {DashboardComponent} from './dashboard/dashboard.component';
import {DashboardModule} from './dashboard/dashboard.module';
import {AuthGuardAuthenticated} from './@core/auth/guards/auth-guard-authenticated';
import {LauncherComponent} from './@core/launcher/launcher.component';

export const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuardAuthenticated],
  },
  {
    path: 'auth/launcher',
    component: LauncherComponent,
  },
  {
    path: 'learner',
    loadChildren: () => import('./learner/learner.module')
      .then(m => m.LearnerModule),
  },
  {
    path: 'instructor',
    loadChildren: () => import('./instructor/instructor.module')
      .then(m => m.InstructorModule),
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module')
      .then(m => m.AdminModule),
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
  { path: '**', component: DashboardComponent },
];

const config: ExtraOptions = {
  useHash: false,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config), DashboardModule],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
