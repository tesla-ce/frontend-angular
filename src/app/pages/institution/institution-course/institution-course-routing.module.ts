import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InstitutionCourseComponent } from './institution-course.component';
import { InstitutionCourseReadComponent } from './institution-course-read/institution-course-read.component';
import { InstitutionCourseListComponent } from './institution-course-list/institution-course-list.component';

const routes: Routes = [{
  path: '',
  component: InstitutionCourseComponent,
  children: [
    {
      path: '',
      component: InstitutionCourseListComponent,
    },
    {
      path: 'read/:id',
      component: InstitutionCourseReadComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InstitutionCourseRoutingModule { }
