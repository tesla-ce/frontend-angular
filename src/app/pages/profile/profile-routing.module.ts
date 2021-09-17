import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { ProfileComponent } from './profile.component';
import {CourseListComponent} from "../my-courses/course-list/course-list.component";
import {CourseReadComponent} from "../my-courses/course-read/course-read.component";
import {BasicComponent} from "./basic/basic.component";
import {BiometricComponent} from "./biometric/biometric.component";

const routes: Routes = [{
  path: '',
  component: ProfileComponent,
  children: [
    {
      path: '',
      component: BiometricComponent,
    },
    {
      path: 'basic',
      component: BasicComponent,
    }
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule {
}
