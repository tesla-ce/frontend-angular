import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../../../../../@core/auth/auth.service';
import { InstitutionUser } from '../../../../../@core/models/user';
import { ListCellActionsComponent } from '../../../../../crud/list/list-cell-actions.component';

@Component({
  selector: 'ngx-institution-send-user-list',
  templateUrl: './institution-send-user-list.component.html',
  styleUrls: ['./institution-send-user-list.component.scss'],
})
export class InstitutionSendUserListComponent implements OnInit {

  endpoint: string;
  settings: any;
  constructor(
    private authService: AuthService,
    private translate: TranslateService) { }

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
                  enabled: false,
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
          addNew: false,
        };
        this.endpoint = `/institution/${user.institution.id}/learner`;
      }
    });
  }

}
