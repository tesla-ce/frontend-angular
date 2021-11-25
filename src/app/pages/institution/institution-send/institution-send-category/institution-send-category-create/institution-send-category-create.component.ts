import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { of as observableOf, Observable, Subject } from 'rxjs';
import { AuthService } from '../../../../../@core/auth/auth.service';
import { ApiCourseService } from '../../../../../@core/data/api-course.service';
import { ApiInstitutionService } from '../../../../../@core/data/api-institution.service';
import { InstitutionUser } from '../../../../../@core/models/user';
import { InstitutionSendCategoryConfig } from '../institution-send-category.config';

@Component({
  selector: 'ngx-institution-send-category-create',
  templateUrl: './institution-send-category-create.component.html',
  styleUrls: ['./institution-send-category-create.component.scss'],
})
export class InstitutionSendCategoryCreateComponent implements OnInit {

  loading = true;
  fields = InstitutionSendCategoryConfig.fields;
  validator = InstitutionSendCategoryConfig.validator;
  user: InstitutionUser;

  public errors = new Subject();

  constructor(
    private authService: AuthService,
    private apiCourseService: ApiCourseService,
    private apiInstitutionService: ApiInstitutionService,
    private toastService: NbToastrService,
    private router: Router,
    private location: Location,
    ) {
  }

  ngOnInit(): void {
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
        this.loading = false;
      }
    });
  }

  back() { this.location.back(); }

  onSave(event): void {
    const data: any = {
      data: {},
      description: null,
    };
    data.description = event.description;
    data.data.enabled_options = event.enabled_options || [];
    data.data.disabled_instruments = event.disabled_instruments || []; // .map(dis => parseInt(dis, 10));
    this.apiInstitutionService.createSendCategory(this.user.institution.id,
      data).subscribe((sendCategory: any) => {
      this.toastService.show(
        'SendCategory Created',
        sendCategory.description,
        {
          position: NbGlobalPhysicalPosition.TOP_RIGHT,
          status: 'success',
          icon: 'save-outline',
          duration: 2000,
        });
      this.router.navigate(['/institution/send/category/']);
    }, error => {
      this.errors.next(error.error);
      this.toastService.show(
        'Error saving',
        'send-category',
        {
          position: NbGlobalPhysicalPosition.TOP_RIGHT,
          status: 'danger',
          icon: 'save-outline',
          duration: 2000,
        });
    });
  }
}
