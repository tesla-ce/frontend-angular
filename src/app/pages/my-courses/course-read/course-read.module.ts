import { CourseReadActivityReadComponent } from './activity-read/course-read-activity-read.component';
import { JsonFormsAngularMaterialModule } from '@jsonforms/angular-material';
import { JsonFormsModule } from '@jsonforms/angular';
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
  NbToggleModule
} from '@nebular/theme';

import { CourseReadRoutingModule } from './course-read-routing.module';
import { SideMenuModule } from '../../../side-menu/side-menu.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators'; // <-- #2 import module

import { ListModule } from '../../../crud/list/list.module';
import { CreateModule } from '../../../crud/create/create.module';
import { CourseReadComponent } from './course-read.component';
import { DataDisplayComponent } from '../course-read/control';
import { CourseReadActivityListComponent } from './activity-list/course-read-activity-list.component';


@NgModule({
  imports: [
    CourseReadRoutingModule,
    ThemeModule,
    FormsModule,
    ReactiveFormsModule,
    SideMenuModule,
    NbCardModule,
    NbButtonModule,
    NbInputModule,
    NbSelectModule,
    JsonFormsModule,
    JsonFormsAngularMaterialModule,
    NbToggleModule,
    NbFormFieldModule,
    RxReactiveFormsModule,
    NbIconModule,
    ListModule,
    CreateModule,
    NbTabsetModule,
  ],
  declarations: [
    DataDisplayComponent,
    CourseReadComponent,
    CourseReadActivityListComponent,
    CourseReadActivityReadComponent
  ],
  entryComponents: [DataDisplayComponent],

})
export class CourseModule {
}

