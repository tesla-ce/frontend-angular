import { AuthService } from './../../../../@core/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { ListCellActionsComponent } from '../../../../crud/list/list-cell-actions.component';

@Component({
  selector: 'ngx-institution-course-list',
  templateUrl: './institution-course-list.component.html',
  styleUrls: ['./institution-course-list.component.scss'],
})
export class InstitutionCourseListComponent implements OnInit {
  endPoint: string;

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

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.getInstitution().subscribe(id => {
      this.endPoint = `/institution/${id}/course`;
    });

  }

}
