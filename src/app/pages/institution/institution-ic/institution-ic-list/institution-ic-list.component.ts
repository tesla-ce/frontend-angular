import { AuthService } from './../../../../@core/auth/auth.service';
import { Component,
  OnInit,
  ViewChild } from '@angular/core';
import { ListCellActionsComponent } from '../../../../crud/list/list-cell-actions.component';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { InstitutionUser } from '../../../../@core/models/user';
import { NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { ListComponent } from '../../../../crud/list/list.component';
import { ApiIcService } from '../../../../@core/data/api-ic.service';

@Component({
  selector: 'ngx-institution-ic-list',
  templateUrl: './institution-ic-list.component.html',
  styleUrls: ['./institution-ic-list.component.scss'],
})
export class InstitutionIcListComponent implements OnInit {

  @ViewChild('list') list: ListComponent;
  loading = true;
  endpoint: string;
  user: InstitutionUser;
  settings: any;

  constructor(private authService: AuthService,
    private datePipe: DatePipe,
    private router: Router,
    public translate: TranslateService,
    private apiIcService: ApiIcService,
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
              title: this.translate.instant('ENTITIES.IC.ID'),
            },
            // 'institution.name': {
            //   title: this.translate.instant('ENTITIES.IC.INSTITUTION'),
            // },
            version: {
              title: this.translate.instant('ENTITIES.IC.VERSION'),
            },
            valid_from: {
              title: this.translate.instant('ENTITIES.IC.VALID_FROM'),
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

  remove(data): void {
    this.apiIcService.deleteIcById(this.user.institution.id, data.id).subscribe(() => {
      this.toastrService.show(
        'IC deleted',
        '',
        {
          position: NbGlobalPhysicalPosition.TOP_RIGHT,
          status: 'success',
          icon: 'save-outline',
          duration: 2000,
        });
      this.list.refresh();
    },
    () => {
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
