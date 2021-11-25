import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NbDialogService, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { Subject } from 'rxjs';
import { ApiInstrumentService } from '../../../../@core/data/api-instrument.service';
import { User } from '../../../../@core/models/user';
import { ListCellActionsComponent } from '../../../../crud/list/list-cell-actions.component';
import { ListComponent } from '../../../../crud/list/list.component';
import { AdminInstrumentConfig } from '../admin-instrument.config';
import { AdminInstrumentProviderAddComponent } from './admin-instrument-provider-add.component';
import { AdminInstrumentProviderEditComponent } from './admin-instrument-provider-edit.component';

@Component({
  selector: 'ngx-admin-instrument-update',
  templateUrl: './admin-instrument-update.component.html',
  styleUrls: ['./admin-instrument-update.component.scss'],
})
export class AdminInstrumentUpdateComponent implements OnInit {

  public id: number;
  public instance: User;
  public fields = AdminInstrumentConfig.fields;
  public errors = new Subject();
  public paths = AdminInstrumentConfig.paths;
  public providersEndpoint: string;
  public settings: any = {};
  @ViewChild('list') list: ListComponent;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dialog: NbDialogService,
    private apiInstrumentService: ApiInstrumentService,
    private toastrService: NbToastrService) {
    this.route.params.subscribe(params => {
      if (params['id'] != null) {
        this.id = params['id'];
        apiInstrumentService.getInstrumentById(this.id).subscribe(instance => {
          this.instance = instance;
          this.providersEndpoint = `/admin/instrument/${this.id}/provider/`;
        });
      } else {
        router.navigate(['../'], { relativeTo: this.route });
      }
    });
  }

  ngOnInit(): void {
    this.settings = {
      actions: {
        edit: false,
        add: false,
        delete: false,
      },
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
            instance.edit.subscribe(data => {
              this.edit(data);
          });
          },
          defaultValue: {
            read: {
              enabled: false,
            },
            update: {
              enabled: true,
            },
            report: {
              enabled: false,
            },
          },
        },
        id: {
          title: 'Provider Id',
        },
        name: {
          title: 'Name',
        },
        description: {
          title: 'Description',
        },
      },
      mode: 'external',
      pager: {
        display: true,
        perPage: 10,
      },
      addNew: false,
    };
  }

  onSave(event): void {
    this.apiInstrumentService.updateInstrument(this.id, event).subscribe((instrument: any) => {
      this.toastrService.show(
        'Instrument Updated',
        instrument.name,
        {
          position: NbGlobalPhysicalPosition.TOP_RIGHT,
          status: 'success',
          icon: 'save-outline',
          duration: 2000,
        });
    }, error => {
      this.errors.next(error.error);
      this.toastrService.show(
        'Error saving',
        'user',
        {
          position: NbGlobalPhysicalPosition.TOP_RIGHT,
          status: 'danger',
          icon: 'save-outline',
          duration: 2000,
        });
    });
  }

  addNew(event) {
    this.dialog.open(
      AdminInstrumentProviderAddComponent, {
        context: {
          instrumentId: this.id,
        },
      })
      .onClose.subscribe(data => {
        this.list.refresh();
      });
  }

  edit(event) {
    this.dialog.open(
      AdminInstrumentProviderEditComponent, {
        context: {
          instrumentId: this.id,
          providerId: event.id,
        },
      })
      .onClose.subscribe(data => {
        this.list.refresh();
      });
  }

  remove(event): void {
    this.list.refresh();
  }
}
