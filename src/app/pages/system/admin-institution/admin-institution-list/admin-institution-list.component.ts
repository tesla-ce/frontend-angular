import { Component, OnInit } from '@angular/core';
import { ListCellActionsComponent } from '../../../../crud/list/list-cell-actions.component';

@Component({
  selector: 'ngx-admin-institution-list',
  templateUrl: './admin-institution-list.component.html',
  styleUrls: ['./admin-institution-list.component.scss'],
})
export class AdminInstitutionListComponent implements OnInit {
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
      name: {
        title: 'Name',
      },
      acronym: {
        title: 'Acronym',
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
    addNew: true,
  };

  endpoint = '/admin/institution';

  constructor() { }

  ngOnInit(): void {
  }

}
