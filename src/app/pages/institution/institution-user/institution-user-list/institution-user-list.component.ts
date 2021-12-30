import { Component, OnInit, ViewChild } from '@angular/core';
import { NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../../../../@core/auth/auth.service';
import { ApiUserService } from '../../../../@core/data/api-user.service';
import { InstitutionUser } from '../../../../@core/models/user';
import { ListCellActionsComponent } from '../../../../crud/list/list-cell-actions.component';
import { ListComponent } from '../../../../crud/list/list.component';

@Component({
  selector: 'ngx-institution-user-list',
  templateUrl: './institution-user-list.component.html',
  styleUrls: ['./institution-user-list.component.scss'],
})
export class InstitutionUserListComponent implements OnInit {

  @ViewChild('list') list: ListComponent;
  endpoint: string;
  user: InstitutionUser;
  settings: any;

  constructor(
    private authService: AuthService,
    private apiUserService: ApiUserService,
    private translate: TranslateService,
    private toastrService: NbToastrService,
  ) { }

  ngOnInit(): void {
    this.authService.getUser().subscribe((user: InstitutionUser) => {
      this.user = user;
      if (user) {
        this.settings = {
          columns: {
            actions: {
              title: this.translate.instant('ACTIONS.ACTIONS'),
              type: 'custom',
              sort: false,
              filter: false,
              renderComponent: ListCellActionsComponent,
              onComponentInitFunction: (instance) => {
                instance.remove.subscribe(data => {
                    this.remove(data);
                });
              },
              defaultValue: {
                read: {
                  enabled: true,
                },
                delete: {
                  enabled: user.roles.indexOf('ADMIN') !== -1,
                },
                update: {
                  enabled: user.roles.indexOf('ADMIN') !== -1,
                },
                report: {
                  enabled: false,
                },
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
          addNew: user.roles.indexOf('ADMIN') !== -1,
        };
        this.endpoint = `/institution/${user.institution.id}/user`;
      }
    });
  }

  remove(data): void {
    this.apiUserService.deleteInstitutionUserById(data.id, this.user.institution.id).subscribe(() => {
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
