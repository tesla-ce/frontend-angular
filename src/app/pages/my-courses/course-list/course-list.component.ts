import { AuthService } from './../../../@core/auth/auth.service';
// import { apiConstants } from './../../../@core/data/api-constants';
import { Component, OnInit } from '@angular/core';
import { ListCellActionsComponent } from '../../../crud/list/list-cell-actions.component';
import { TranslateService } from '@ngx-translate/core';
import { InstitutionUser } from '../../../@core/models/user';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'ngx-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss'],
})
export class CourseListComponent implements OnInit {
  endpoint: string;
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
      start: {
        title: 'Start',
        valuePrepareFunction: value => {
          return this.datePipe.transform(value, 'dd-mm-yy hh:mm');
        },
      },
      end: {
        title: 'End',
        valuePrepareFunction: value => {
          return this.datePipe.transform(value, 'dd-mm-yy hh:mm');
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
    addNew: false,
  };

  constructor(private authService: AuthService, public translate: TranslateService, private datePipe: DatePipe,
  ) { }

  ngOnInit(): void {
    this.authService.getUser().subscribe((user: InstitutionUser) => {
      if (user) this.endpoint = `/institution/${user.institution.id}/course`;
    });
  }

}
