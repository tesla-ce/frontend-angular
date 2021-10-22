import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NbDialogService, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { Subject } from 'rxjs';
import { ApiUserService } from '../../../../@core/data/api-user.service';
import { InstitutionUser, User } from '../../../../@core/models/user';
import { AdminUserConfig } from '../admin-user.config';
import { AdminUserChangePasswordComponent } from './admin-user-change-password.component';

@Component({
  selector: 'ngx-admin-user-update',
  templateUrl: './admin-user-update.component.html',
  styleUrls: ['./admin-user-update.component.scss'],
})
export class AdminUserUpdateComponent implements OnInit {

  public id: number;
  public instance: User;
  public fields = AdminUserConfig.fields;
  public errors = new Subject();
  public paths = AdminUserConfig.paths;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dialog: NbDialogService,
    private apiUserService: ApiUserService,
    private toastrService: NbToastrService) {
    this.route.params.subscribe(params => {
      if (params['id'] != null) {
        this.id = params['id'];
        apiUserService.getUserById(this.id).subscribe(instance => {
          this.instance = instance;
        });
      } else {
        router.navigate(['../'], { relativeTo: this.route });
      }
    });
  }

  ngOnInit(): void {
  }

  onSave(event): void {
    this.apiUserService.updateUser(this.id, event).subscribe((user: User) => {
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
      AdminUserChangePasswordComponent, {
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
