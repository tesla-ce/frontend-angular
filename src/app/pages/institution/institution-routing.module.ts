import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { InstitutionComponent } from './institution.component';

const routes: Routes = [{
  path: '',
  component: InstitutionComponent,
  children: [
    {
      path: 'institution-user',
      loadChildren: () => import('./institution-user/institution-user.module')
        .then(m => m.InstitutionUserModule),
    },
    {
      path: 'institution-ic',
      loadChildren: () => import('./institution-ic/institution-ic.module')
        .then(m => m.InstitutionIcModule),
    },
    {
      path: 'course',
      loadChildren: () => import('./institution-course/institution-course.module')
        .then(m => m.InstitutionCourseModule),
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InstitutionRoutingModule {
}
