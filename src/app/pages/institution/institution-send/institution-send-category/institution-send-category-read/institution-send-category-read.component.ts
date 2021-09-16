import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../../../@core/auth/auth.service';
import { ApiCourseService } from '../../../../../@core/data/api-course.service';
import { ApiInstitutionService } from '../../../../../@core/data/api-institution.service';
import { InstitutionUser } from '../../../../../@core/models/user';
// import { SendCategory } from '../../../../@core/models/send-category';
import { InstitutionSendCategoryConfig } from '../institution-send-category.config';

@Component({
  selector: 'ngx-institution-send-category-read',
  templateUrl: './institution-send-category-read.component.html',
  styleUrls: ['./institution-send-category-read.component.scss'],
})
export class InstitutionSendCategoryReadComponent implements OnInit {
  id: number;
  loading: boolean = false;
  fields = InstitutionSendCategoryConfig.fields;
  paths = InstitutionSendCategoryConfig.paths;
  instance: any;
  user: InstitutionUser;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiInstitutionService: ApiInstitutionService,
    private apiCourseService: ApiCourseService,
    private authService: AuthService) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.authService.getUser().subscribe((user: InstitutionUser) => {
        if (user) {
          this.user = user;
          this.apiCourseService.getAllInstruments(user.institution.id).subscribe((instruments: any) => {
            this.fields.disabled_instruments.options = instruments.map(instrument => {
              return {
                value: instrument.id,
                key: instrument.name,
              };
            });
          });
          if (params['id'] != null) {
            this.id = params['id'];
            this.apiInstitutionService.getSendCategoryById(user.institution.id, this.id).subscribe(instance => {
              this.instance = instance;
              this.loading = false;
            });
          } else {
            this.router.navigate(['../'], { relativeTo: this.route });
          }
        }
      });
    });
  }

}
