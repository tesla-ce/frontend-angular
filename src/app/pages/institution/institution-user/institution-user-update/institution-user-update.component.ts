import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NbDialogService, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { Subject } from 'rxjs';
import { AuthService } from '../../../../@core/auth/auth.service';
import { ApiUserService } from '../../../../@core/data/api-user.service';
import { EnvService } from '../../../../@core/env/env.service';
import { InstitutionUser, User } from '../../../../@core/models/user';
import { InstitutionUserConfig } from '../institution-user.config';
import { InstitutionUserChangePasswordComponent } from './institution-user-change-password.component';

@Component({
  selector: 'ngx-institution-user-update',
  templateUrl: './institution-user-update.component.html',
  styleUrls: ['./institution-user-update.component.scss'],
})
export class InstitutionUserUpdateComponent implements OnInit {

  public id: number;
  public instance: User;
  public fields = InstitutionUserConfig.fields;
  public errors = new Subject();
  public paths = InstitutionUserConfig.paths;
  user: InstitutionUser;
  changePasswordDisabled = false;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dialog: NbDialogService,
    private authService: AuthService,
    private location: Location,
    private envService: EnvService,
    private apiUserService: ApiUserService,
    private toastrService: NbToastrService) {
    this.route.params.subscribe(params => {
      if (params['id'] != null) {
        this.id = params['id'];
      } else {
        router.navigate(['../'], { relativeTo: this.route });
      }
    });
  }

  ngOnInit(): void {
    this.fields.locale.options = this.envService.availableLocales.map(item => ({ key: item, value: item }));
    this.authService.getUser().subscribe((user: InstitutionUser) => {
      if (user) {
        this.user = user;
        this.apiUserService.getInstitutionUserById(user.institution.id, this.id).subscribe(instance => {
          this.instance = instance;
          this.changePasswordDisabled = !instance.login_allowed;
          if (instance.institution) {
            this.instance.locale = instance.institution.locale;
            this.instance.uid = instance.institution.uid;
            this.instance.inst_admin = instance.institution.roles.indexOf('ADMIN') !== -1;
            this.instance.send_admin = instance.institution.roles.indexOf('SEND') !== -1;
            this.instance.legal_admin = instance.institution.roles.indexOf('LEGAL') !== -1;
            this.instance.data_admin = instance.institution.roles.indexOf('DATA') !== -1;
          }
        });
      }
    });
  }

  back() { this.location.back(); }

  onSave(event): void {
    this.apiUserService.updateInstitutionUser(this.user.institution.id, this.id, event).subscribe((user: User) => {
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

  changePassword() {
    this.dialog.open(
      InstitutionUserChangePasswordComponent, {
        context: {},
      })
      .onClose.subscribe(data => {
        if (data) {
          this.apiUserService.updateUser(this.id, data).subscribe((user: User) => {
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
      });
  }

  valueChanges(value) {
    this.changePasswordDisabled = !value.login_allowed;
  }
}
