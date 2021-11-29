import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../../@core/auth/auth.service';
import { ApiUserService } from '../../../../@core/data/api-user.service';
import { EnvService } from '../../../../@core/env/env.service';
import { InstitutionUser, User } from '../../../../@core/models/user';
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
    private envService: EnvService,
    private location: Location,
    private authService: AuthService,
    private apiUserService: ApiUserService) {
    this.route.params.subscribe(params => {
      if (params['id'] != null) {
        this.id = params['id'];
        this.authService.getUser().subscribe((user: InstitutionUser) => {
          if (user) {
            this.apiUserService.getInstitutionUserById(user.institution.id, this.id).subscribe(instance => {
            this.instance = instance;
            if (instance.institution) {
              this.instance.locale = instance.institution.locale;
              this.instance.uid = instance.institution.uid;
              this.instance.inst_admin = instance.institution.roles.indexOf('ADMIN') !== -1;
              this.instance.send_admin = instance.institution.roles.indexOf('SEND') !== -1;
              this.instance.legal_admin = instance.institution.roles.indexOf('LEGAL') !== -1;
              this.instance.data_admin = instance.institution.roles.indexOf('DATA') !== -1;
            }});
          }});
      } else {
        router.navigate(['../'], { relativeTo: this.route });
      }
    });
  }

  ngOnInit(): void {
    this.fields.locale.options = this.envService.availableLocales.map(item => ({ key: item, value: item }));
  }

  back() { this.location.back(); }

}
