import { Component, OnInit } from '@angular/core';
import { ListCellActionsComponent } from './list/list-cell-actions.component';

@Component({
  selector: 'ngx-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss'],
})
export class UserManagementComponent implements OnInit {

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

  endPoint = '/admin/user';

  constructor() { }

  ngOnInit(): void {
  }

}
