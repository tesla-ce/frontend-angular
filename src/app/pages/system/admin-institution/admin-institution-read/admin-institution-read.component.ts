import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiInstitutionService } from '../../../../@core/data/api-institution.service';
import { Institution } from '../../../../@core/models/user';
import { AdminInstitutionConfig } from '../admin-institution.config';

@Component({
  selector: 'ngx-admin-institution-read',
  templateUrl: './admin-institution-read.component.html',
  styleUrls: ['./admin-institution-read.component.scss'],
})
export class AdminInstitutionReadComponent {
  id: number;
  fields = AdminInstitutionConfig.fields;
  paths = AdminInstitutionConfig.paths;
  instance: Institution;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private apiInstitutionService: ApiInstitutionService) {
    this.route.params.subscribe(params => {
      if (params['id'] != null) {
        this.id = params['id'];
        apiInstitutionService.getInstitutionById(this.id).subscribe(instance => {
          this.instance = instance;
        });
      }
    });
  }

  back() { this.location.back(); }

}
