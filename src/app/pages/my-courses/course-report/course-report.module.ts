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

import { CourseRoutingModule } from './course-report-routing.module';
import { SideMenuModule } from '../../../side-menu/side-menu.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators'; // <-- #2 import module

import { ListModule } from '../../../crud/list/list.module';
import { CreateModule } from '../../../crud/create/create.module';
import { CourseReportComponent } from './course-report.component';
// import { DataDisplayComponent } from '../course-report/control';
import { CourseReportListComponent } from './course-report-list/course-report-list.component';
import { CourseReportUpdateComponent } from './course-report-update/course-report-update.component';
import { CourseReportReadComponent } from './course-report-read/course-report-read.component';
import { CourseReportInstrumentComponent } from './instrument/course-report-instrument.component';
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
    CourseReportComponent,
    CourseReportListComponent,
    CourseReportReadComponent,
    CourseReportUpdateComponent,
    CourseReportInstrumentComponent,
  ],
  exports: [
    CourseReportListComponent,
  ],
  entryComponents: [
    // DataDisplayComponent,
  ],

})
export class CourseReportModule {
}

