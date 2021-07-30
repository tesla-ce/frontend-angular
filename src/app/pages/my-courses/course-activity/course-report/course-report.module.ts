// import { JsonFormsAngularMaterialModule } from '@jsonforms/angular-material';
// import { JsonFormsModule } from '@jsonforms/angular';
import { NgModule } from '@angular/core';

import { ThemeModule } from '../../../../@theme/theme.module';
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
import { SideMenuModule } from '../../../../side-menu/side-menu.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators'; // <-- #2 import module

import { ListModule } from '../../../../crud/list/list.module';
import { CreateModule } from '../../../../crud/create/create.module';
import { CourseReportComponent } from './course-report.component';
// import { DataDisplayComponent } from '../course-report/control';
import { CourseReportListComponent } from './course-report-list/course-report-list.component';
import { CourseReportUpdateComponent } from './course-report-update/course-report-update.component';
import { CourseReportReadComponent } from './course-report-read/course-report-read.component';
import { SharedModule } from '../../../../shared/shared.module';
import { ListCellInstrumentComponent } from './course-report-list/list-cell-instrument.component';
import { ListCellSumaryComponent } from './course-report-list/list-cell-sumary.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { CourseReportAuditComponent } from './course-report-audit/course-report-audit.component';


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
    NbToggleModule,
    NbFormFieldModule,
    RxReactiveFormsModule,
    NbIconModule,
    ListModule,
    CreateModule,
    NbActionsModule,
    NbTabsetModule,
    SharedModule,
    NbIconModule,
    // CHARTS
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    }),
  ],
  declarations: [
    // DataDisplayComponent,
    CourseReportComponent,
    CourseReportListComponent,
    CourseReportReadComponent,
    CourseReportUpdateComponent,
    CourseReportAuditComponent,
    ListCellInstrumentComponent,
    ListCellSumaryComponent,
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

