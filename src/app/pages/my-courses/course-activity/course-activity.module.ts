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

import { CourseRoutingModule } from './course-activity-routing.module';
import { SideMenuModule } from '../../../side-menu/side-menu.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators'; // <-- #2 import module

import { ListModule } from '../../../crud/list/list.module';
import { CreateModule } from '../../../crud/create/create.module';
import { CourseActivityComponent } from './course-activity.component';
// import { DataDisplayComponent } from '../course-activity/control';
import { CourseActivityListComponent } from './course-activity-list/course-activity-list.component';
import { CourseActivityUpdateComponent } from './course-activity-update/course-activity-update.component';
import { CourseActivityReadComponent } from './course-activity-read/course-activity-read.component';
import { CourseActivityInstrumentComponent } from './instrument/course-activity-instrument.component';
import { SharedModule } from '../../../shared/shared.module';


@NgModule({
  imports: [
    CourseRoutingModule,
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
    ListModule,
    CreateModule,
    NbActionsModule,
    NbTabsetModule,
    SharedModule,
  ],
  declarations: [
    // DataDisplayComponent,
    CourseActivityComponent,
    CourseActivityListComponent,
    CourseActivityReadComponent,
    CourseActivityUpdateComponent,
    CourseActivityInstrumentComponent,
  ],
  exports: [
    CourseActivityListComponent,
  ],
  entryComponents: [
    // DataDisplayComponent,
  ],

})
export class CourseActivityModule {
}

