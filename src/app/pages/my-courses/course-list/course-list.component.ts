import { AuthService } from './../../../@core/auth/auth.service';
// import { apiConstants } from './../../../@core/data/api-constants';
import { Component, OnInit } from '@angular/core';
import { ListCellActionsComponent } from '../../../crud/list/list-cell-actions.component';
import { TranslateService } from '@ngx-translate/core';
import { InstitutionUser } from '../../../@core/models/user';
import { DatePipe } from '@angular/common';
import { dateFormat } from '../../../@core/utils/utils';

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
        title: this.translate.instant('ACTIONS.ACTIONS'),
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
        title: this.translate.instant('ENTITIES.COURSE.ID'),
      },
      code: {
        title: this.translate.instant('ENTITIES.COURSE.CODE'),
      },
      start: {
        title: this.translate.instant('ENTITIES.COURSE.START'),
        valuePrepareFunction: value => {
          return this.datePipe.transform(value, dateFormat);
        },
      },
      end: {
        title: this.translate.instant('ENTITIES.COURSE.END'),
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
    addNew: false,
  };

  constructor(
    private authService: AuthService,
    public translate: TranslateService,
    private datePipe: DatePipe,
  ) { }

  ngOnInit(): void {
    this.authService.getUser().subscribe((user: InstitutionUser) => {
      if (user) this.endpoint = `/institution/${user.institution.id}/course`;
    });
  }

}
