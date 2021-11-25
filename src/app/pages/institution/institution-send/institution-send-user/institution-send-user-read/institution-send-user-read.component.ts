import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiUserService } from '../../../../../@core/data/api-user.service';
import { User } from '../../../../../@core/models/user';
import { InstitutionSendUserConfig } from '../institution-send-user.config';

@Component({
  selector: 'ngx-institution-send-user-read',
  templateUrl: './institution-send-user-read.component.html',
  styleUrls: ['./institution-send-user-read.component.scss'],
})
export class InstitutionSendUserReadComponent implements OnInit {
  id: number;
  fields = InstitutionSendUserConfig.fields;
  paths = InstitutionSendUserConfig.paths;
  instance: User;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
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

  back() { this.location.back(); }

}
