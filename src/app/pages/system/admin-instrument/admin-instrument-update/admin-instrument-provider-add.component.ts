import { Component, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { Subject } from 'rxjs';
import { ApiInstrumentService } from '../../../../@core/data/api-instrument.service';
import { AdminInstrumentProviderConfig } from './admin-instrument-provider.config';

@Component({
  selector: 'ngx-admin-instrument-provider-add',
  templateUrl: './admin-instrument-provider-add.component.html',
  styleUrls: ['./admin-instrument-provider-add.component.scss'],
})
export class AdminInstrumentProviderAddComponent {

  @Input() instrumentId: number;
  @Input() userId: number;
  endpoint: string;
  selectedCategory: any;
  selectedDate: Date;
  settings: any;
  fields = AdminInstrumentProviderConfig.fields;
  public errors = new Subject();

  constructor(
    protected ref: NbDialogRef<AdminInstrumentProviderAddComponent>,
    private apiInstrumentService: ApiInstrumentService,
  ) {
  }

  dismiss() {
    this.ref.close();
  }
  
  onSave(event) {
    if (event.service_port) event.service_port = parseInt(event.service_port, 10);
    if (event.options_schema) event.options_schema = JSON.parse(event.options_schema);
    if (event.options) event.options = JSON.parse(event.options);
    this.apiInstrumentService.createProvider(this.instrumentId, event).subscribe(result => {
      this.ref.close(result);
    });
  }
}
