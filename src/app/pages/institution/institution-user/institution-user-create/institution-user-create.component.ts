import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { of as observableOf, Observable, Subject } from 'rxjs';
import { ApiUserService } from '../../../../@core/data/api-user.service';
import { User } from '../../../../@core/models/user';
import { InstitutionUserConfig } from '../institution-user.config';

@Component({
  selector: 'ngx-institution-user-create',
  templateUrl: './institution-user-create.component.html',
  styleUrls: ['./institution-user-create.component.scss'],
})
export class InstitutionUserCreateComponent implements OnInit {

  fields = InstitutionUserConfig.fields;
  validator = InstitutionUserConfig.validator;
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
}
