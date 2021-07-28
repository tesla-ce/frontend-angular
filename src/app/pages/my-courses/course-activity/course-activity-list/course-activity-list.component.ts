import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ListCellActionsComponent } from '../../../../crud/list/list-cell-actions.component';
import { AuthService } from '../../../../@core/auth/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { Location } from '@angular/common';
import { InstitutionUser } from '../../../../@core/models/user';

@Component({
  selector: 'ngx-course-activity-list',
  templateUrl: './course-activity-list.component.html',
  styleUrls: ['./course-activity-list.component.scss'],
})
export class CourseActivityListComponent implements OnInit {
  courseId: number;
  endpoint: string;
  loading: boolean = true;
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
            enabled: true,
            path: 'activity',
          },
          read: {
            enabled: true,
            path: 'activity',
          },
          delete: {
            enabled: false,
          },
          report: {
            enabled: true,
            path: 'activity',
          },
        },
      },
      name: {
        title: 'Name',
      },
      vle_activity_type: {
        title: 'Type',
      },
      description: {
        title: 'Description',
      },
      start: {
        title: 'Start',
      },
      end: {
        title: 'End',
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

  constructor(private authService: AuthService, public translate: TranslateService,
    private location: Location, private router: Router, private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      if (params['courseId'] != null) {
        this.courseId = params['courseId'];
      } else {
        router.navigate(['../'], { relativeTo: this.route });
      }
    });
  }
  back() { this.location.back(); }

  ngOnInit(): void {
    this.authService.getUser().subscribe((user: InstitutionUser) => {
      if (user) {
        this.endpoint = `/institution/${user.institution.id}/course/${this.courseId}/activity`;
        this.loading = false;
      }
    });
  }

}
