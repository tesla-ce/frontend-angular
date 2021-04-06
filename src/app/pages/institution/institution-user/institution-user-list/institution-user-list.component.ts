import { AuthService } from './../../../../@core/auth/auth.service';
import { Component, OnInit } from '@angular/core';
// import { apiConstants } from '../../../../@core/data/api-constants';
import { ListCellActionsComponent } from '../../../../crud/list/list-cell-actions.component';

@Component({
  selector: 'ngx-institution-user-list',
  templateUrl: './institution-user-list.component.html',
  styleUrls: ['./institution-user-list.component.scss'],
})
export class InstitutionUserListComponent implements OnInit {
  endPoint: string
  institution: number
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

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.getInstitution().subscribe(id => this.endPoint = `/institution/${id}/user`)
  }


}
