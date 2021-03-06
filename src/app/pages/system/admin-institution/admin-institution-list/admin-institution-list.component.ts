import { Component, OnInit, ViewChild } from '@angular/core';
import { NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { TranslateService } from '@ngx-translate/core';
import { ApiInstitutionService } from '../../../../@core/data/api-institution.service';
import { ListCellActionsComponent } from '../../../../crud/list/list-cell-actions.component';
import { ListComponent } from '../../../../crud/list/list.component';

@Component({
  selector: 'ngx-admin-institution-list',
  templateUrl: './admin-institution-list.component.html',
  styleUrls: ['./admin-institution-list.component.scss'],
})
export class AdminInstitutionListComponent implements OnInit {
  endpoint = '/admin/institution';
  settings: any;
  @ViewChild('list') list: ListComponent;

  constructor(
    private apiInstitutionService: ApiInstitutionService,
    private toastrService: NbToastrService,
    private translate: TranslateService,
  ) { }

  ngOnInit(): void {
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
        },
        id: {
          title: this.translate.instant('ENTITIES.INSTITUTION.ID'),
        },
        name: {
          title: this.translate.instant('ENTITIES.INSTITUTION.NAME'),
        },
        acronym: {
          title: this.translate.instant('ENTITIES.INSTITUTION.ACRONYM'),
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
    this.apiInstitutionService.deleteInstitutionById(data.id).subscribe(() => {
      this.toastrService.show(
        'Institution deleted',
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
