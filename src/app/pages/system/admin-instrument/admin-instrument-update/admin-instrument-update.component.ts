import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { Subject } from 'rxjs';
import { ApiUserService } from '../../../../@core/data/api-user.service';
import { User } from '../../../../@core/models/user';
import { AdminInstrumentConfig } from '../admin-instrument.config';

@Component({
  selector: 'ngx-admin-instrument-update',
  templateUrl: './admin-instrument-update.component.html',
  styleUrls: ['./admin-instrument-update.component.scss'],
})
export class AdminInstrumentUpdateComponent implements OnInit {

  public id: number;
  public instance: User;
  public fields = AdminInstrumentConfig.fields;
  public errors = new Subject();
  public paths = AdminInstrumentConfig.paths;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
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

}
