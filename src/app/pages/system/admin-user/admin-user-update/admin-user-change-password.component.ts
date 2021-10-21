import { Component, OnInit, Input, ViewChild, TemplateRef } from '@angular/core';
import { NbDialogRef, NbWindowService } from '@nebular/theme';
import { Subject } from 'rxjs';
import { doublePasswordCheck } from '../../../../@core/utils/validators';

@Component({
  selector: 'ngx-admin-user-change-password',
  templateUrl: './admin-user-change-password.component.html',
  styleUrls: ['./admin-user-change-password.component.scss'],
})
export class AdminUserChangePasswordComponent implements OnInit {

  public errors = new Subject();
  validator = doublePasswordCheck;
  fields: any = {
    password: {
      creable: true,
      key: 'password',
      dataType: 'string',
      label: 'Password',
      inputType: 'password',
      inputName: 'pasword-input-name',
      formControlName: 'pasword-form-control-name',
      placeholder: 'password',
      required: true,
    },
    password2: {
      creable: true,
      key: 'password2',
      dataType: 'string',
      label: 'Confirm Password',
      inputType: 'password',
      inputName: 'confirm-pasword-input-name',
      formControlName: 'confirm-pasword-form-control-name',
      placeholder: 'confirm password',
      required: true,
    },
  };

  constructor(
    protected ref: NbDialogRef<AdminUserChangePasswordComponent>,
  ) {
  }

  ngOnInit() {
  }

  dismiss() {
    this.ref.close();
  }

  onSave(event) {
    this.ref.close(event);
  }
}
