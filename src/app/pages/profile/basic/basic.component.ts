import { Component, OnInit } from '@angular/core';
import { NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { Subject } from 'rxjs';
import { AuthService } from '../../../@core/auth/auth.service';
import { ApiUserService } from '../../../@core/data/api-user.service';
import { InstitutionUser } from '../../../@core/models/user';
import { doublePasswordCheck } from '../../../@core/utils/validators';

@Component({
  selector: 'ngx-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.scss'],
})
export class BasicComponent implements OnInit {

  user: InstitutionUser;
  high_contrast: boolean = false;
  big_fonts: boolean = false;
  text_to_speech: boolean = false;
  loading: boolean = true;
  availableLanguages = [
    {
      value: 'en',
      key: 'en',
    },
    {
      value: 'es',
      key: 'es',
    },
    {
      value: 'ca',
      key: 'ca',
    },
    {
      value: 'bg',
      key: 'bg',
    },
    {
      value: 'fi',
      key: 'fi',
    },
    {
      value: 'tr',
      key: 'tr',
    },
  ];

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
    private authService: AuthService,
    private apiUserService: ApiUserService,
    private toastrService: NbToastrService,
  ) { }

  ngOnInit(): void {
    this.authService.getUser().subscribe((user: InstitutionUser) => {
      if (user) {
        this.user = user;
        this.loading = false;
      }
    });
    this.high_contrast = localStorage.getItem('high_contrast') === 'true';
    this.big_fonts = localStorage.getItem('big_fonts') === 'true';
    this.text_to_speech = localStorage.getItem('text_to_speech') === 'true';
  }

  toggleHighContrast(event): void {
    localStorage.setItem('high_contrast', event + '');
  }
  toggleBigFonts(event): void {
    localStorage.setItem('big_fonts', event + '');
  }
  toggleTextToSpeech(event): void {
    localStorage.setItem('text_to_speech', event + '');
  }

  changePassword(data) {
    this.apiUserService.updateUser(this.user.id, data).subscribe((user: InstitutionUser) => {
      this.toastrService.show(
        'User Updated',
        user.username,
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
}
