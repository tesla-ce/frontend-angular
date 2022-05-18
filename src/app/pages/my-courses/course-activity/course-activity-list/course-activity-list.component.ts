import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListCellActionsComponent } from '../../../../crud/list/list-cell-actions.component';
import { AuthService } from '../../../../@core/auth/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { DatePipe, Location } from '@angular/common';
import { Institution, InstitutionUser } from '../../../../@core/models/user';
import { ApiInstitutionService } from '../../../../@core/data/api-institution.service';
import { dateFormat } from '../../../../@core/utils/utils';

@Component({
  selector: 'ngx-course-activity-list',
  templateUrl: './course-activity-list.component.html',
  styleUrls: ['./course-activity-list.component.scss'],
})
export class CourseActivityListComponent implements OnInit {
  courseId: number;
  endpoint: string;
  loading = true;
  settings: any;
  institution: Institution;
  @Input() course: any;

  constructor(
    private authService: AuthService,
    public translate: TranslateService,
    private apiInstitutionService: ApiInstitutionService,
    private location: Location,
    private datePipe: DatePipe,
    private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      if (params['courseId'] != null) {
        this.courseId = params['courseId'];
      }
    });
  }

  ngOnInit(): void {
    this.authService.getUser().subscribe((user: InstitutionUser) => {
      if (user) {
        this.apiInstitutionService.getInstitutionById(user.institution.id).subscribe((institution: Institution) => {
          this.institution = institution;
          this.endpoint = `/institution/${user.institution.id}/course/${this.courseId}/activity`;
          this.settings = {
            addNew: false,
            search: false,
            columns: {
              actions: {
                title: this.translate.instant('ACTIONS.ACTIONS'),
                type: 'custom',
                sort: false,
                filter: false,
                renderComponent: ListCellActionsComponent,
                defaultValue: {
                  update: {
                    enabled: (this.course.user_roles.indexOf('LEARNER') === -1 && user.roles.indexOf('GLOBAL_ADMIN') === -1 ),
                    path: 'activity',
                  },
                  read: {
                    enabled: this.course.user_roles.indexOf('LEARNER') === -1,
                    path: 'activity',
                  },
                  delete: {
                    enabled: false,
                  },
                  report: {
                    enabled: this.course.user_roles.indexOf('LEARNER') === -1 ||
                    (this.course.user_roles.indexOf('LEARNER') !== -1 && this.institution.allow_learner_report),
                    path: 'activity',
                  },
                },
              },
              name: {
                title: this.translate.instant('ENTITIES.ACTIVITY.NAME'),
              },
              vle_activity_type: {
                title: this.translate.instant('ENTITIES.ACTIVITY.TYPE'),
              },
              start: {
                title: this.translate.instant('ENTITIES.ACTIVITY.START'),
                valuePrepareFunction: value => {
                  return this.datePipe.transform(value, dateFormat);
                },
              },
              end: {
                title: this.translate.instant('ENTITIES.ACTIVITY.END'),
                valuePrepareFunction: value => {
                  return this.datePipe.transform(value, dateFormat);
                },
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
          this.loading = false;
        });
      }
    });
  }

}
