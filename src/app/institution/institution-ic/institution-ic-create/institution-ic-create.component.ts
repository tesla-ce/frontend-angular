import { Component, OnInit } from '@angular/core';
import { NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { of as observableOf,  Observable, Subject } from 'rxjs';
import { ApiIcService } from '../../../@core/data/api-ic.service';
import { Ic } from '../../../@core/models/ic';
import {InstitutionIcConfig} from '../institution-ic.config';

@Component({
  selector: 'ngx-institution-ic-create',
  templateUrl: './institution-ic-create.component.html',
  styleUrls: ['./institution-ic-create.component.scss'],
})
export class InstitutionIcCreateComponent implements OnInit {

  fields = InstitutionIcConfig.fields;
  public errors = new Subject();

  constructor(private apiIcService: ApiIcService, private toastrService: NbToastrService) {}

  ngOnInit(): void {
  }

  onSave(event): void {
    this.apiIcService.createIc(event).subscribe((ic: Ic) => {
        this.toastrService.show(
          'Ic Created',
          ic.version,
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
        'ic',
        {
          position: NbGlobalPhysicalPosition.TOP_RIGHT,
          status: 'danger',
          icon: 'save-outline',
          duration: 2000,
      });
    });
  }
}
