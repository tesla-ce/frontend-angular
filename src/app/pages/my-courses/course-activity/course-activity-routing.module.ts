import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CourseActivityComponent } from './course-activity.component';
import { CourseActivityListComponent } from './course-activity-list/course-activity-list.component';
import { CourseActivityReadComponent } from './course-activity-read/course-activity-read.component';
import { CourseActivityUpdateComponent } from './course-activity-update/course-activity-update.component';


const routes: Routes = [{
  path: '',
  component: CourseActivityComponent,
  children: [
    {
      path: ':activityId',
      component: CourseActivityReadComponent,
    },
    {
      path: ':activityId/update',
      component: CourseActivityUpdateComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CourseRoutingModule { }
