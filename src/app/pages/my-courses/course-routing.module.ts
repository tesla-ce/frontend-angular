import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CourseComponent } from './course.component';
import { CourseListComponent } from './course-list/course-list.component';
import { CourseReadComponent } from './course-read/course-read.component';

const routes: Routes = [{
  path: '',
  component: CourseComponent,
  children: [
    {
      path: '',
      component: CourseListComponent,
    },
    {
      path: ':id',
      component: CourseReadComponent,
    },
    {
      path: ':id/activity',
      loadChildren: () => import('./course-activity/course-activity.module')
        .then(m => m.CourseActivityModule),
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CourseRoutingModule { }
