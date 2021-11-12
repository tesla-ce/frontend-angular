import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiUserService } from '../../../../@core/data/api-user.service';
import { User } from '../../../../@core/models/user';
import { InstitutionUserConfig } from '../institution-user.config';

@Component({
  selector: 'ngx-institution-user-read',
  templateUrl: './institution-user-read.component.html',
  styleUrls: ['./institution-user-read.component.scss'],
})
export class InstitutionUserReadComponent implements OnInit {
  id: number;
  fields = InstitutionUserConfig.fields;
  paths = InstitutionUserConfig.paths;
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
          if (instance.institution) {
            this.instance.locale = instance.institution.locale;
            this.instance.uid = instance.institution.uid;
            this.instance.inst_admin = instance.institution.roles.indexOf('ADMIN') !== -1;
            this.instance.send_admin = instance.institution.roles.indexOf('SEND') !== -1;
            this.instance.legal_admin = instance.institution.roles.indexOf('LEGAL') !== -1;
            this.instance.data_admin = instance.institution.roles.indexOf('DATA') !== -1;
          }
        });
      } else {
        router.navigate(['../'], { relativeTo: this.route });
      }
    });
  }

  ngOnInit(): void {
  }

}
