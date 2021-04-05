import { Component, OnInit } from '@angular/core';
import { apiConstants } from '../../../../@core/data/api-constants';
import { ListCellActionsComponent } from '../../../../crud/list/list-cell-actions.component';

@Component({
  selector: 'ngx-institution-user-list',
  templateUrl: './institution-user-list.component.html',
  styleUrls: ['./institution-user-list.component.scss'],
})
export class InstitutionUserListComponent implements OnInit {
  settings = {
    columns: {
      actions: {
        title: 'Actions',
        type: 'custom',
        sort: false,
        filter: false,
        renderComponent: ListCellActionsComponent,
      },
      id: {
        title: 'ID',
      },
      username: {
        title: 'Username',
      },
      email: {
        title: 'Email',
      },
      is_superuser: {
        title: 'Super User',
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

  endPoint = `/institution/${apiConstants.institution}/user`;

  constructor() { }

  ngOnInit(): void {
  }

}
