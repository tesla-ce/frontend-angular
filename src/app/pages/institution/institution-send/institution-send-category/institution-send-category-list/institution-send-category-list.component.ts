import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../../../../@core/auth/auth.service';
import { ApiCourseService } from '../../../../../@core/data/api-course.service';
import { ApiInstitutionService } from '../../../../../@core/data/api-institution.service';
import { InstitutionUser } from '../../../../../@core/models/user';
// import { InstitutionSendCategory } from '../../../../@core/models/send-category';
import { ListCellActionsComponent } from '../../../../../crud/list/list-cell-actions.component';
import { ListComponent } from '../../../../../crud/list/list.component';
import { ListCellDisabledInstrumentsComponent } from './list-cell-disabled-instruments.component';
import { ListCellEnabledOptionsComponent } from './list-cell-enabled-options.component';

@Component({
  selector: 'ngx-institution-send-category-list',
  templateUrl: './institution-send-category-list.component.html',
  styleUrls: ['./institution-send-category-list.component.scss'],
})
export class InstitutionSendCategoryListComponent implements OnInit {

  endpoint: String;
  user: InstitutionUser;

  settings: any;

  @ViewChild('list') list: ListComponent;

  constructor(
    private authService: AuthService,
    private apiCourseService: ApiCourseService,
    private apiInstitutionService: ApiInstitutionService,
  ) { }

  ngOnInit(): void {
    this.authService.getUser().subscribe((user: any) => {
      if (user) {
        this.apiCourseService.getAllInstruments(user.institution.id).subscribe((instruments: any) => {
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
                defaultValue: {
                  read: {
                    enabled: true,
                  },
                  update: {
                    enabled: false,
                  },
                  report: {
                    enabled: false,
                  },
                  delete: {
                    enabled: user.roles.indexOf('ADMIN') !== -1,
                  },
                },
              },
              id: {
                title: 'ID',
              },
              description: {
                title: 'Description',
              },
              enabled_options: {
                title: 'Enabled options',
                type: 'custom',
                sort: false,
                filter: false,
                renderComponent: ListCellEnabledOptionsComponent,
              },
              disabled_instruments: {
                title: 'Disabled Instruments',
                type: 'custom',
                sort: false,
                filter: false,
                defaultValue: {
                  instruments: instruments,
                },
                renderComponent: ListCellDisabledInstrumentsComponent,
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
          this.user = user;
          this.endpoint = `/institution/${user.institution.id}/send`;
        });
      }
    });
  }

  remove(event) {
    this.apiInstitutionService.deleteSendCategoryById(this.user.institution.id, event.id).subscribe(response => {
      this.list.refresh();
    });
  }

}
