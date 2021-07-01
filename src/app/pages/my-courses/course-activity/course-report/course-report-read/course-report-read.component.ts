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

@Component({
  selector: 'ngx-course-report-read',
  templateUrl: './course-report-read.component.html',
  styleUrls: ['./course-report-read.component.scss'],
})
export class CourseReportReadComponent implements OnInit {
  courseId: number;
  activityId: number;
  reportId: number;
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
    this.authService.getInstitution().subscribe(id => {
      this.endPoint = `/institution/${id}/course/${this.courseId}/activity/${this.activityId}/report?id=${this.reportId}`;
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
          this.loading = false;
        });
      });
    });
  }

}
