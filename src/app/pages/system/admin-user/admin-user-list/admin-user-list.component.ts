import { Component, ViewChild } from '@angular/core';
import { NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { ApiUserService } from '../../../../@core/data/api-user.service';
import { ListCellActionsComponent } from '../../../../crud/list/list-cell-actions.component';
import { ListComponent } from '../../../../crud/list/list.component';

@Component({
  selector: 'ngx-admin-user-list',
  templateUrl: './admin-user-list.component.html',
  styleUrls: ['./admin-user-list.component.scss'],
})
export class AdminUserListComponent {
  @ViewChild('list') list: ListComponent;

  settings = {
    columns: {
      actions: {
        title: 'Actions',
        type: 'custom',
        sort: false,
        filter: false,
        renderComponent: ListCellActionsComponent,
        onComponentInitFunction: (instance) => {
          instance.remove.subscribe(data => {
              this.remove(data);
          });
        },
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

  endpoint = '/admin/user';

  constructor(
    private apiUserService: ApiUserService,
    private toastrService: NbToastrService,
  ) { }

  remove(data): void {
    this.apiUserService.deleteUserById(data.id).subscribe((user: any) => {
      this.toastrService.show(
        'User deleted',
        '',
        {
          position: NbGlobalPhysicalPosition.TOP_RIGHT,
          status: 'success',
          icon: 'save-outline',
          duration: 2000,
        });
      this.list.refresh();
    }, error => {
      this.toastrService.show(
        'Error',
        '',
        {
          position: NbGlobalPhysicalPosition.TOP_RIGHT,
          status: 'danger',
          icon: 'save-outline',
          duration: 2000,
        });
    });
  }

}
