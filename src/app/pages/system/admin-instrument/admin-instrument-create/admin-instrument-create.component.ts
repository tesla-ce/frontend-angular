import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { of as observableOf, Observable, Subject } from 'rxjs';
import { ApiUserService } from '../../../../@core/data/api-user.service';
import { User } from '../../../../@core/models/user';
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

  constructor(private apiUserService: ApiUserService, private toastrService: NbToastrService, private router: Router) { }

  ngOnInit(): void {
  }

  onSave(event): void {
    this.apiUserService.createUser(event).subscribe((user: User) => {
      this.toastrService.show(
        'User Created',
        user.username,
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
