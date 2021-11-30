import { Component, OnInit } from '@angular/core';
import { NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { Subject } from 'rxjs';
import { AuthService } from '../../../@core/auth/auth.service';
import { ApiUserService } from '../../../@core/data/api-user.service';
import { EnvService } from '../../../@core/env/env.service';
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
  globalAdmin: boolean = false;
  availableLanguages: { key: string; value: string; }[] = [];
  selectedLanguage: string;

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
    private envService: EnvService,
    private toastrService: NbToastrService,
  ) { }

  ngOnInit(): void {
    this.availableLanguages = this.envService.availableLocales.map(item => ({ key: item, value: item }));
    this.authService.getUser().subscribe((user: InstitutionUser) => {
      if (user) {
        this.user = user;
        if (this.user.roles.indexOf('GLOBAL_ADMIN') !== -1) this.globalAdmin = true;
        this.selectedLanguage = this.user.locale;
        this.loading = false;
      }
    });
    this.high_contrast = localStorage.getItem('high_contrast') === 'true';
    this.big_fonts = localStorage.getItem('big_fonts') === 'true';
    this.text_to_speech = localStorage.getItem('text_to_speech') === 'true';
  }

  toggleHighContrast(event): void {
    localStorage.setItem('high_contrast', event + '');
    window.location.reload();
  }
  toggleBigFonts(event): void {
    localStorage.setItem('big_fonts', event + '');
    window.location.reload();
  }
  toggleTextToSpeech(event): void {
    localStorage.setItem('text_to_speech', event + '');
    window.location.reload();
  }

  changePassword(data) {
    if (this.globalAdmin) {
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
    } else {
      this.apiUserService.updateInstitutionUser(this.user.institution.id, this.user.id, data).subscribe((user: InstitutionUser) => {
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

  changeLanguage(): void {
    this.apiUserService.updateInstitutionUser(this.user.institution.id, this.user.id,
      {locale: this.selectedLanguage}).subscribe((user: InstitutionUser) => {
      this.toastrService.show(
        'User Updated',
        user.username,
        {
          position: NbGlobalPhysicalPosition.TOP_RIGHT,
          status: 'success',
          icon: 'save-outline',
          duration: 2000,
        });
        setTimeout(() => {
          window.location.reload();
        }, 1600);
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
