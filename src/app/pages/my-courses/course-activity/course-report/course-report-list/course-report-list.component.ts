import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ListCellActionsComponent } from '../../../../../crud/list/list-cell-actions.component';
import { AuthService } from '../../../../../@core/auth/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { Location } from '@angular/common';
import { ListCellInstrumentComponent } from './list-cell-instrument.component';
import { ListSubHeaderComponent } from './list-sub-header-instrument.component';
import { ApiCourseService } from '../../../../../@core/data/api-course.service';
import { ListCellSumaryComponent } from './list-cell-sumary.component';
import { InstitutionUser } from '../../../../../@core/models/user';
import { ListComponent } from '../../../../../crud/list/list.component';

@Component({
  selector: 'ngx-course-report-list',
  templateUrl: './course-report-list.component.html',
  styleUrls: ['./course-report-list.component.scss'],
})
export class CourseReportListComponent implements OnInit {

  @ViewChild('list') list: ListComponent;
  filter: any[] = [];
  courseId: number;
  activityId: number;
  endpoint: string;
  loading = true;
  settings = {
    addNew: false,
    search: false,
    columns: {
      actions: {
        title: 'Actions',
        type: 'custom',
        sort: false,
        filter: false,
        renderComponent: ListCellActionsComponent,
        defaultValue: {
          update: {
            enabled: false,
          },
          read: {
            enabled: true,
          },
          delete: {
            enabled: false,
          },
        },
      },
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
  };

  availableLevels = [
    // {
    //   value: 0,
    //   key: 'Pending',
    // },
    // {
    //   value: 1,
    //   key: 'No information',
    // },
    {
      value: 2,
      key: 'OK',
    },
    {
      value: 3,
      key: 'Warning',
    },
    {
      value: 4,
      key: 'Alert',
    },
  ];

  selectedIdentity: number;
  selectedContent: number;
  selectedIntegrity: number;

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
    });
  }

  back() { this.location.back(); }

  ngOnInit(): void {
    this.authService.getUser().subscribe((user: InstitutionUser) => {
      if (user) {
        this.apiCourseService.getCourseById(user.institution.id, this.courseId).subscribe((course: any) => {
          if (course.user_roles.indexOf('LEARNER') !== -1) {
            this.apiCourseService.getActivityReports(user.institution.id, this.courseId, this.activityId).subscribe(reports => {
              if (reports.length) {
                this.router.navigate([reports[0].id], { relativeTo: this.route });
              }
            });
          } else {
            this.endpoint = `/institution/${user.institution.id}/course/${this.courseId}/activity/${this.activityId}/report`;
            this.apiCourseService.getAllActivityInstruments(user.institution.id, this.courseId, this.activityId)
              .subscribe((instruments: any[]) => {
                instruments.map((instrument: any) => {
                  this.settings.columns['instrument-' + instrument.instrument.acronym] = {
                    class: 'instrument',
                    title: instrument.instrument.name,
                    width: '1400px',
                    type: 'custom',
                    valuePrepareFunction: () => {
                      return instrument.instrument;
                    },
                    filter: {
                      type: 'custom',
                      component: ListSubHeaderComponent,
                      data: {instrument : instrument.instrument},
                    },
                    renderComponent: ListCellInstrumentComponent,
                  };
                  this.loading = false;
              });
            });
          }
        });
      }
    });
  }

  selectedChangeIdentity(event) {
    this.filter.push({ field: 'identity_level__gte', search: event });
    this.list.setFilter(this.filter, true);
  }

  selectedChangeContent(event) {
    this.filter.push({ field: 'content_level__gte', search: event });
    this.list.setFilter(this.filter, true);
  }

  selectedChangeIntegrity(event) {
    this.filter.push({ field: 'integrity_level__gte', search: event });
    this.list.setFilter(this.filter, true);
  }

  resetFilters() {
    this.selectedIdentity = -1;
    this.selectedContent = -1;
    this.selectedIntegrity = -1;
    this.filter = [];
    this.list.setFilter(this.filter, true);
  }
}
