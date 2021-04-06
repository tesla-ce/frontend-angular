import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CourseComponent } from './course.component';
import { CourseListComponent } from './course-list/course-list.component';

const routes: Routes = [{
  path: '',
  component: CourseComponent,
  children: [
    {
      path: '',
      component: CourseListComponent,
    },
    {
      path: 'read/:id',
      loadChildren: () => import('./course-read/course-read.module')
        .then(m => m.CourseModule),
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CourseRoutingModule { }
