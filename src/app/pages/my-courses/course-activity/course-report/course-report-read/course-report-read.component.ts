import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ListCellActionsComponent } from '../../../../../crud/list/list-cell-actions.component';
import { AuthService } from '../../../../../@core/auth/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { Location } from '@angular/common';
import { ListCellInstrumentComponent } from '../course-report-list/list-cell-instrument.component';
import { ListSubHeaderComponent } from '../course-report-list/list-sub-header-instrument.component';
import { ApiCourseService } from '../../../../../@core/data/api-course.service';
import { ListCellSumaryComponent } from '../course-report-list/list-cell-sumary.component';
import { InstitutionUser } from '../../../../../@core/models/user';
import { ApiReportService } from '../../../../../@core/data/api-report.service';

@Component({
  selector: 'ngx-course-report-read',
  templateUrl: './course-report-read.component.html',
  styleUrls: ['./course-report-read.component.scss'],
})
export class CourseReportReadComponent implements OnInit {
  courseId: number;
  activityId: number;
  reportId: number;
  report: any;
  reportChart: any;
  endPoint: string;
  loading: boolean = true;
  settings = {
    addNew: false,
    search: false,
    columns: {
      learner: {
        width: '400px',
        title: 'Learner',
        valuePrepareFunction: (value) => {
          return value.last_name + ', ' + value.first_name;
        },
        filter: false,
      },
      summary: {
        title: 'Summary',
        filter: false,
        type: 'custom',
        renderComponent: ListCellSumaryComponent,
      },

    },
    actions: {
      edit: false,
      add: false,
      delete: false,
    },
    mode: 'external',
    pager: {
      display: true,
      perPage: 10,
    },
    showFooter: false,
  };

  constructor(
    private authService: AuthService,
    private apiCourseService: ApiCourseService,
    private apiReportService: ApiReportService,
    public translate: TranslateService,
    private location: Location,
    private router: Router,
    private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.courseId = params['courseId'];
      this.activityId = params['activityId'];
      this.reportId = params['reportId'];
    });
  }

  back() { this.location.back(); }

  ngOnInit(): void {
    this.authService.getUser().subscribe((user: InstitutionUser) => {
      this.endPoint = `/institution/1/course/${this.courseId}/activity/${this.activityId}/report?id=${this.reportId}`;
      this.apiCourseService.getAllInstruments().subscribe((instruments: any[]) => {
        instruments.map((instrument: any) => {
          this.settings.columns['instrument-' + instrument.acronym] = {
            // title: '<nb-icon icon="instrument-' + instrument.acronym + '" pack="tesla"></nb-icon> ' + instrument.acronym,
            class: 'instrument',
            title: instrument.acronym,
            width: '1400px',
            type: 'custom',
            valuePrepareFunction: (value) => {
              return instrument;
            },
            filter: {
              type: 'custom',
              component: ListSubHeaderComponent,
              data: {instrument : instrument},
            },
            renderComponent: ListCellInstrumentComponent,
          };
          this.apiReportService.getActivityReport(this.courseId, this.activityId, this.reportId).subscribe(report => {
            this.report = report;
            this.apiReportService.getActivityReportChart(this.courseId, this.activityId, this.reportId).subscribe(reportChart => {
              this.reportChart = reportChart;
              console.log(reportChart);
              this.loading = false;
            });
          });
        });
      });
    });
  }

}
