import {Component, Input, OnInit, ViewChild} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListCellActionsComponent } from '../../../../crud/list/list-cell-actions.component';
import { AuthService } from '../../../../@core/auth/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { DatePipe, Location } from '@angular/common';
import { Institution, InstitutionUser } from '../../../../@core/models/user';
import { ApiInstitutionService } from '../../../../@core/data/api-institution.service';
import { dateFormat } from '../../../../@core/utils/utils';
import {NbGlobalPhysicalPosition, NbToastrService} from '@nebular/theme';
import {ListComponent} from '../../../../crud/list/list.component';
import {ApiCourseService} from '../../../../@core/data/api-course.service';

@Component({
  selector: 'ngx-course-activity-list',
  templateUrl: './course-activity-list.component.html',
  styleUrls: ['./course-activity-list.component.scss'],
})
export class CourseActivityListComponent implements OnInit {
  @ViewChild('list') list: ListComponent;
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
    private route: ActivatedRoute,
    private apiCourseService: ApiCourseService,
    private toastrService: NbToastrService
  ) {
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
                onComponentInitFunction: (instance) => {
                  instance.remove.subscribe(data => {
                    this.remove(data);
                  });
                },
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
                    enabled: (user.roles.indexOf('DATA') !== -1)
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

  remove(data): void {
    // check if enrolment data or user data
    this.apiCourseService.deleteActivityIdCourseByCourseIdActivityId(this.institution.id, data.course_id, data.id).subscribe(() => {
      this.toastrService.show(
        'Activity deleted',
        '',
        {
          position: NbGlobalPhysicalPosition.TOP_RIGHT,
          status: 'success',
          icon: 'save-outline',
          duration: 2000,
        });
      this.list.refresh();
    }, () => {
      this.toastrService.show(
        'Error',
        '',
        {
          position: NbGlobalPhysicalPosition.TOP_RIGHT,
          status: 'danger',
          icon: 'save-outline',
          duration: 2000,
        });
    });
  }
}
