import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NbDialogService, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { Subject } from 'rxjs';
import { AuthService } from '../../../../@core/auth/auth.service';
import { ApiUserService } from '../../../../@core/data/api-user.service';
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
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dialog: NbDialogService,
    private authService: AuthService,
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
    this.authService.getUser().subscribe((user: InstitutionUser) => {
      if (user) {
        this.user = user;
        this.apiUserService.getInstitutionUserById(user.institution.id, this.id).subscribe(instance => {
          this.instance = instance;
        });
      }
    });
  }

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

}
