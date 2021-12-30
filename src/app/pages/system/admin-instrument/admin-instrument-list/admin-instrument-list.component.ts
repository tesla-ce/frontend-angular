import { Component, ViewChild } from '@angular/core';
import { NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { TranslateService } from '@ngx-translate/core';
import { ApiInstrumentService } from '../../../../@core/data/api-instrument.service';
import { ListCellActionsComponent } from '../../../../crud/list/list-cell-actions.component';
import { ListComponent } from '../../../../crud/list/list.component';

@Component({
  selector: 'ngx-admin-instrument-list',
  templateUrl: './admin-instrument-list.component.html',
  styleUrls: ['./admin-instrument-list.component.scss'],
})
export class AdminInstrumentListComponent {

  @ViewChild('list') list: ListComponent;

  settings = {
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
            enabled: false,
          },
        },
      },
      id: {
        title: this.translate.instant('ENTITIES.INSTRUMENT.ID'),
      },
      name: {
        title: this.translate.instant('ENTITIES.INSTRUMENT.NAME'),
      },
      acronym: {
        title: this.translate.instant('ENTITIES.INSTRUMENT.ACRONYM'),
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

  endpoint = '/admin/instrument';

  constructor(
    private apiInstrumentService: ApiInstrumentService,
    private toastrService: NbToastrService,
    private translate: TranslateService,
  ) { }

  remove(data): void {
    this.apiInstrumentService.deleteInstrumentById(data.id).subscribe(() => {
      this.toastrService.show(
        'Instrument deleted',
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
