import { Component, OnInit } from '@angular/core';
import { EmailValidator } from '@angular/forms';
import { ListCellActionsComponent } from '../../list/list-cell-actions.component';

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

  fields = [
    {
      key: 'username',
      dataType: 'string',
      label: 'Username',
      inputType: 'text',
      inputName: 'username-input-name',
      formControlName: 'username-form-control-name',
      placeholder: 'joedoe',
      disabled: true,
    },
    {
      key: 'firstName',
      dataType: 'string',
      label: 'First name',
      inputType: 'text',
      inputName: 'first-name-input-name',
      formControlName: 'first-name-form-control-name',
      placeholder: 'Joe',
      required: true,
    },
    {
      key: 'lastName',
      dataType: 'string',
      label: 'Last name',
      inputType: 'text',
      inputName: 'last-name-input-name',
      formControlName: 'last-name-form-control-name',
      placeholder: 'Doe',
    },
    {
      key: 'email',
      dataType: 'string',
      label: 'Email',
      inputType: 'email',
      inputName: 'email-input-name',
      formControlName: 'email-form-control-name',
      placeholder: 'joedoe@example.com',
      validator: 'email',
      required: true,
    },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
