import { Component, OnInit, ViewChild } from '@angular/core';
import { NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { TranslateService } from '@ngx-translate/core';
import { ApiUserService } from '../../../../@core/data/api-user.service';
import { ListCellActionsComponent } from '../../../../crud/list/list-cell-actions.component';
import { ListComponent } from '../../../../crud/list/list.component';

@Component({
  selector: 'ngx-admin-user-list',
  templateUrl: './admin-user-list.component.html',
  styleUrls: ['./admin-user-list.component.scss'],
})
export class AdminUserListComponent implements OnInit {
  @ViewChild('list') list: ListComponent;
  settings: any;
  endpoint = '/admin/user';

  constructor(
    private translate: TranslateService,
    private apiUserService: ApiUserService,
    private toastrService: NbToastrService,
  ) { }

  ngOnInit(): void {
    this.settings = {
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
          title: this.translate.instant('ENTITIES.USER.ID'),
        },
        username: {
          title: this.translate.instant('ENTITIES.USER.USERNAME'),
        },
        email: {
          title: this.translate.instant('ENTITIES.USER.EMAIL'),
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
  }

  
  remove(data): void {
    this.apiUserService.deleteUserById(data.id).subscribe(() => {
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
    }, () => {
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
