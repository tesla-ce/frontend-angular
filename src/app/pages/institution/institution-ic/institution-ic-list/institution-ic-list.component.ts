import { Component, OnInit } from '@angular/core';
import { ListCellActionsComponent } from '../../../../crud/list/list-cell-actions.component';

@Component({
  selector: 'ngx-institution-ic-list',
  templateUrl: './institution-ic-list.component.html',
  styleUrls: ['./institution-ic-list.component.scss'],
})
export class InstitutionIcListComponent implements OnInit {
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
      'institution.name': {
        title: 'Institution',
      },
      version: {
        title: 'Version',
      },
      valid_from: {
        title: 'Valid from',
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

  endPoint = '/institution/1/ic';

  constructor() { }

  ngOnInit(): void {
  }

}
