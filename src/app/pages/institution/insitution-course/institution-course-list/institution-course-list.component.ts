import { Component, OnInit } from '@angular/core';
import { ListCellActionsComponent } from '../../../../crud/list/list-cell-actions.component';

@Component({
  selector: 'ngx-institution-course-list',
  templateUrl: './institution-course-list.component.html',
  styleUrls: ['./institution-course-list.component.scss'],
})
export class InstitutionCourseListComponent implements OnInit {
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
  };

  endPoint = '/institution/1/course';

  constructor() { }

  ngOnInit(): void {
  }

}
