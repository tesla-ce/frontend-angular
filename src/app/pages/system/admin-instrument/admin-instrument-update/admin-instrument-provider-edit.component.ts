import { Component, OnInit, Input, Optional } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { Subject } from 'rxjs';
import { ApiInstrumentService } from '../../../../@core/data/api-instrument.service';
import { AdminInstrumentProviderConfig } from './admin-instrument-provider.config';

@Component({
  selector: 'ngx-admin-instrument-provider-edit',
  templateUrl: './admin-instrument-provider-edit.component.html',
  styleUrls: ['./admin-instrument-provider-edit.component.scss'],
})
export class AdminInstrumentProviderEditComponent implements OnInit {

  @Input() instrumentId: number;
  @Input() userId: number;
  @Input() providerId: number;
  endpoint: string;
  selectedCategory: any;
  selectedDate: Date;
  settings: any;
  instance: any;
  fields = AdminInstrumentProviderConfig.fields;
  public errors = new Subject();

  constructor(
    @Optional() protected ref: NbDialogRef<AdminInstrumentProviderEditComponent>,
    private apiInstrumentService: ApiInstrumentService,
  ) {
  }

  ngOnInit() {
    this.apiInstrumentService.getProviderById(this.instrumentId, this.providerId).subscribe(instance => {
      this.instance = instance;
    });
  }

  dismiss() {
    this.ref.close();
  }

  onSave(event) {
    try {
      if (event.service_port) event.service_port = parseInt(event.service_port, 10);
      if (event.options_schema) event.options_schema = JSON.parse(event.options_schema);
      if (event.options) event.options = JSON.parse(event.options);
      this.apiInstrumentService.updateProvider(this.instrumentId, this.providerId, event).subscribe(result => {
        this.ref.close(result);
      });
    } catch (error) {
      this.ref.close(error);
    }
  }
}
