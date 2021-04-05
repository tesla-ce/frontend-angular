import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiUserService } from '../../../../@core/data/api-user.service';
import { User } from '../../../../@core/models/user';
import { AdminUserConfig } from '../admin-user.config';

@Component({
  selector: 'ngx-admin-user-read',
  templateUrl: './admin-user-read.component.html',
  styleUrls: ['./admin-user-read.component.scss'],
})
export class AdminUserReadComponent implements OnInit {
  id: number;
  fields = AdminUserConfig.fields;
  paths = AdminUserConfig.paths
  instance: User;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiUserService: ApiUserService) {
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

}
