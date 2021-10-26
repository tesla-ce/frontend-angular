import { AuthService } from './../../../../@core/auth/auth.service';
import { Component, OnInit } from '@angular/core';
// import { apiConstants } from '../../../../@core/data/api-constants';
import { ListCellActionsComponent } from '../../../../crud/list/list-cell-actions.component';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { InstitutionUser } from '../../../../@core/models/user';

@Component({
  selector: 'ngx-institution-ic-list',
  templateUrl: './institution-ic-list.component.html',
  styleUrls: ['./institution-ic-list.component.scss'],
})
export class InstitutionIcListComponent implements OnInit {
  loading: boolean = true;
  endpoint: string;
  settings: any;


  constructor(private authService: AuthService, private datePipe: DatePipe, private router: Router, public translate: TranslateService,
  ) { }

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
            'institution.name': {
              title: 'Institution',
            },
            version: {
              title: 'Version',
            },
            valid_from: {
              title: 'Valid from',
              valuePrepareFunction: value => {
                return this.datePipe.transform(value);
              },
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

        this.endpoint = `/institution/${user.institution.id}/ic`;
        this.loading = false;
      }
    });
  }

  goNew = () => {
    this.router.navigate(['/institution/institution-ic/create']);
  }

}
