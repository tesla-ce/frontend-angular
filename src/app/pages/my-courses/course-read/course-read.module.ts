// import { JsonFormsAngularMaterialModule } from '@jsonforms/angular-material';
// import { JsonFormsModule } from '@jsonforms/angular';
import { NgModule } from '@angular/core';

import { ThemeModule } from '../../../@theme/theme.module';
import {
  NbButtonModule,
  NbCardModule,
  NbInputModule,
  NbSelectModule,
  NbIconModule,
  NbFormFieldModule,
  NbTabsetModule,
  NbToggleModule,
  NbActionsModule,
} from '@nebular/theme';

// import { CourseReadRoutingModule } from './course-read-routing.module';
import { SideMenuModule } from '../../../side-menu/side-menu.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators'; // <-- #2 import module

import { ListModule } from '../../../crud/list/list.module';
import { CreateModule } from '../../../crud/create/create.module';
import { CourseReadComponent } from './course-read.component';
// import { DataDisplayComponent } from '../course-read/control';
import { CourseActivityModule } from '../course-activity/course-activity.module';
import { CourseActivityListComponent } from '../course-activity/course-activity-list/course-activity-list.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';


@NgModule({
  imports: [
    CommonModule,
    // CourseReadRoutingModule,
    ThemeModule,
    FormsModule,
    ReactiveFormsModule,
    SideMenuModule,
    NbCardModule,
    NbButtonModule,
    NbInputModule,
    NbSelectModule,
    // JsonFormsModule,
    // JsonFormsAngularMaterialModule,
    NbToggleModule,
    NbFormFieldModule,
    RxReactiveFormsModule,
    NbIconModule,
    NbActionsModule,
    ListModule,
    CreateModule,
    NbTabsetModule,
    CourseActivityModule,
    SharedModule,
  ],
  declarations: [
    // DataDisplayComponent,
    CourseReadComponent,
    // CourseReadActivityListComponent,
    // CourseReadActivityReadComponent,
    // CourseReadActivityUpdateComponent,
  ],
  entryComponents: [
    // DataDisplayComponent,
    CourseActivityListComponent,
  ],

})
export class CourseModule {
}

