import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import {
  NbAuthComponent,
  NbLoginComponent,
  NbLogoutComponent,
} from '@nebular/auth';
import { AuthGuardAuthenticated } from './@core/auth/guards/auth-guard-authenticated';
// import { AuthGuardAdmin } from './@core/auth/guards/auth-guard-admin';

import { LauncherComponent } from './@core/launcher/launcher.component';
import { PluginComponent } from './@core/plugin/plugin.component';

export const routes: Routes = [
  {
    path: 'auth/launcher',
    component: LauncherComponent,
  },
  {
    path: 'plugin/ic',
    component: PluginComponent,
  },
  {
    path: 'plugin/activity/reports',
    component: PluginComponent,
  },
  {
    path: 'plugin/activity/report',
    component: PluginComponent,
  },
  {
    path: 'plugin/activity/configuration',
    component: PluginComponent,
  },
  {
    path: 'plugin/course',
    component: PluginComponent,
  },
  {
    path: 'plugin/enrolment',
    component: PluginComponent,
  },
  {
    path: 'plugin/test-page',
    component: PluginComponent,
  },
  {
    path: 'plugin/dashboard',
    component: PluginComponent,
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./pages/dashboard/dashboard.module')
      .then(m => m.DashboardModule),
    canActivate: [AuthGuardAuthenticated],
  },
  {
    path: 'test',
    loadChildren: () => import('./pages/test/test.module')
      .then(m => m.TestModule),
    canActivate: [AuthGuardAuthenticated],
  },
  {
    path: 'statistics',
    loadChildren: () => import('./pages/statistics/statistics.module')
      .then(m => m.StatisticsModule),
    canActivate: [AuthGuardAuthenticated],
  },
  {
    path: 'monitoring',
    loadChildren: () => import('./pages/monitoring/monitoring.module')
      .then(m => m.MonitoringModule),
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
    path: 'course',
    loadChildren: () => import('./pages/my-courses/course.module')
      .then(m => m.CourseModule),
    canActivate: [AuthGuardAuthenticated],
  },
  {
    path: 'learner',
    loadChildren: () => import('./pages/learner/learner.module')
      .then(m => m.LearnerModule),
    canActivate: [AuthGuardAuthenticated],
  },
  // {
  //   path: 'enrolment',
  //   loadChildren: () => import('./pages/enrolment/enrolment.module')
  //     .then(m => m.EnrolmentModule),
  //   canActivate: [AuthGuardAuthenticated],
  // },
  {
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.module')
      .then(m => m.ProfileModule),
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
  paramsInheritanceStrategy: 'always',
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
