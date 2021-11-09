import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { Subject } from 'rxjs';
import { ApiInstrumentService } from '../../../../@core/data/api-instrument.service';
import { AdminInstrumentConfig } from '../admin-instrument.config';

@Component({
  selector: 'ngx-admin-instrument-create',
  templateUrl: './admin-instrument-create.component.html',
  styleUrls: ['./admin-instrument-create.component.scss'],
})
export class AdminInstrumentCreateComponent implements OnInit {

  fields = AdminInstrumentConfig.fields;
  validator = AdminInstrumentConfig.validator;
  public errors = new Subject();

  constructor(private apiInstrumentService: ApiInstrumentService, private toastrService: NbToastrService, private router: Router) { }

  ngOnInit(): void {
  }

  onSave(event): void {
    event.options_schema = JSON.stringify(JSON.parse(event.options_schema));
    this.apiInstrumentService.createInstrument(event).subscribe((instrument: any) => {
      this.toastrService.show(
        'Instrument Created',
        instrument.name,
        {
          position: NbGlobalPhysicalPosition.TOP_RIGHT,
          status: 'success',
          icon: 'save-outline',
          duration: 2000,
        });
      this.router.navigate(['/admin/admin-instrument/']);
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
}
