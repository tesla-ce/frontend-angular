import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { Subject } from 'rxjs';
import { ApiUserService } from '../../../../../@core/data/api-user.service';
import { User } from '../../../../../@core/models/user';
import { InstitutionSendUserConfig } from '../institution-send-user.config';

@Component({
  selector: 'ngx-institution-send-user-create',
  templateUrl: './institution-send-user-create.component.html',
  styleUrls: ['./institution-send-user-create.component.scss'],
})
export class InstitutionSendUserCreateComponent {

  fields = InstitutionSendUserConfig.fields;
  validator = InstitutionSendUserConfig.validator;
  public errors = new Subject();

  constructor(
    private apiUserService: ApiUserService,
    private toastrService: NbToastrService,
    private router: Router,
    private location: Location,
    ) { }

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
      this.router.navigate(['/institution/institution-user/']);
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

  back() { this.location.back(); }
}
