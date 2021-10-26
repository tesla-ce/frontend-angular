import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../@core/auth/auth.service';
import { InstitutionUser } from '../../../../@core/models/user';
import { ListCellActionsComponent } from '../../../../crud/list/list-cell-actions.component';

@Component({
  selector: 'ngx-institution-user-list',
  templateUrl: './institution-user-list.component.html',
  styleUrls: ['./institution-user-list.component.scss'],
})
export class InstitutionUserListComponent implements OnInit {

  endpoint: String;

  settings: any;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.getUser().subscribe((user: InstitutionUser) => {
      if (user) {
        this.settings = {
          columns: {
            actions: {
              title: 'Actions',
              type: 'custom',
              sort: false,
              filter: false,
              renderComponent: ListCellActionsComponent,
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
          addNew: user.roles.indexOf('ADMIN') !== -1,
        };
        this.endpoint = `/institution/${user.institution.id}/user`;
      }
    });
  }

}
