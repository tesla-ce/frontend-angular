import { AuthService } from './../../../@core/auth/auth.service';
// import { apiConstants } from './../../../@core/data/api-constants';
import { Component, OnInit } from '@angular/core';
import { ListCellActionsComponent } from '../../../crud/list/list-cell-actions.component';
import { TranslateService } from '@ngx-translate/core';
import { InstitutionUser } from '../../../@core/models/user';

@Component({
  selector: 'ngx-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss'],
})
export class CourseListComponent implements OnInit {
  endPoint: string;
  settings = {
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
          delete: {
            enabled: false,
          },
        },
      },
      id: {
        title: 'ID',
      },
      code: {
        title: 'Code',
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
    addNew: false,
  };

  constructor(private authService: AuthService, public translate: TranslateService,
  ) { }

  ngOnInit(): void {
    this.authService.getUser().subscribe((user: InstitutionUser) => {
      if (user) this.endPoint = `/institution/${user.institution.id}/course`;
    });

  }

}
