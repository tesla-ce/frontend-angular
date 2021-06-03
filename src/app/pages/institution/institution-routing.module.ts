import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { InstitutionComponent } from './institution.component';
import { SendComponent } from './send/send.component';
import { CourseComponent } from './course/course.component';
import { DataManagementComponent } from './data-management/data-management.component';
import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [{
  path: '',
  component: InstitutionComponent,
  children: [
    {
      path: 'user',
      loadChildren: () => import('./institution-user/institution-user.module')
        .then(m => m.InstitutionUserModule),
    },
    {
      path: 'ic',
      loadChildren: () => import('./institution-ic/institution-ic.module')
        .then(m => m.InstitutionIcModule),
    },
    {
      path: 'send',
      component: SendComponent,
    },
    {
      path: 'course',
      component: CourseComponent,
    },
    {
      path: 'data-management',
      component: DataManagementComponent,
    },
    {
      path: 'settings',
      component: SettingsComponent,
    },
    // {
    //   path: 'course',
    //   loadChildren: () => import('./institution-course/institution-course.module')
    //     .then(m => m.InstitutionCourseModule),
    // },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InstitutionRoutingModule {
}
