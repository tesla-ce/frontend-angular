import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CourseReadComponent } from './course-read.component';
import { CourseReadActivityListComponent } from './activity-list/course-read-activity-list.component';
import { CourseReadActivityReadComponent } from './activity-read/course-read-activity-read.component';
import { CourseReadActivityUpdateComponent } from './activity-update/course-read-activity-update.component';


const routes: Routes = [{
  path: '',
  component: CourseReadComponent,
  children: [
    {
      path: '',
      component: CourseReadActivityListComponent,
    },
    {
      path: 'read/:activityId',
      component: CourseReadActivityReadComponent,
    },
    {
      path: 'update/:activityId',
      component: CourseReadActivityUpdateComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CourseReadRoutingModule { }
