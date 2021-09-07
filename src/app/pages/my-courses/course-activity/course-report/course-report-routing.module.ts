import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CourseReportComponent } from './course-report.component';
import { CourseReportListComponent } from './course-report-list/course-report-list.component';
import { CourseReportReadComponent } from './course-report-read/course-report-read.component';
import { CourseReportUpdateComponent } from './course-report-update/course-report-update.component';
import { CourseReportAuditComponent } from './course-report-audit/course-report-audit.component';



const routes: Routes = [{
  path: '',
  component: CourseReportComponent,
  children: [
    {
      path: '',
      component: CourseReportListComponent,
    },
    {
      path: ':reportId',
      component: CourseReportReadComponent,
    },
    {
      path: ':reportId/update',
      component: CourseReportUpdateComponent,
    },
    {
      path: ':reportId/audit/:instrumentId',
      component: CourseReportAuditComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CourseRoutingModule { }
