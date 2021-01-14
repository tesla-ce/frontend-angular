import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiUserService } from '../../../@core/data/api-user.service';
import { User } from '../../../@core/models/user';
import { AdminUserConfig } from '../admin-user.config';

@Component({
  selector: 'ngx-admin-user-update',
  templateUrl: './admin-user-update.component.html',
  styleUrls: ['./admin-user-update.component.scss'],
})
export class AdminUserUpdateComponent implements OnInit {

  id: number;
  instance: User;
  fields = AdminUserConfig.fields;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiUserService: ApiUserService) {
      this.route.params.subscribe(params => {
        if (params['id'] != null ) {
          this.id = params['id'];
          apiUserService.getUserById(this.id).subscribe(instance => {
            console.log(instance);
            this.instance = instance;
          });
        } else {
          router.navigate(['../'], {relativeTo: this.route});
        }
      });
  }

  ngOnInit(): void {
  }

  onSave(event): void {
    console.log('event recieved', event);
  }

}
