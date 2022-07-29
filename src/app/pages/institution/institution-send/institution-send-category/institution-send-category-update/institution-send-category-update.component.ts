import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { Subject } from 'rxjs';
import { AuthService } from '../../../../../@core/auth/auth.service';
import { ApiCourseService } from '../../../../../@core/data/api-course.service';
import { ApiInstitutionService } from '../../../../../@core/data/api-institution.service';
import { InstitutionUser } from '../../../../../@core/models/user';
// import { SendCategory } from '../../../../@core/models/send-category';
import { InstitutionSendCategoryConfig } from '../institution-send-category.config';

@Component({
  selector: 'ngx-institution-send-category-update',
  templateUrl: './institution-send-category-update.component.html',
  styleUrls: ['./institution-send-category-update.component.scss'],
})
export class InstitutionSendCategoryUpdateComponent implements OnInit {

  public loading = false;
  public user: InstitutionUser;
  public id: number;
  public instance: any; // SendCategory;
  public fields = InstitutionSendCategoryConfig.fields;
  public errors = new Subject();
  public paths = InstitutionSendCategoryConfig.paths;

  constructor(
    private route: ActivatedRoute,
    private apiInstitutionService: ApiInstitutionService,
    private apiCourseService: ApiCourseService,
    private authService: AuthService,
    private location: Location,
    private toastrService: NbToastrService) {}

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
              this.instance.disabled_instruments = instance.data.disabled_instruments?.map(item => item + '');
              this.instance.enabled_options = instance.data.enabled_options;
              this.loading = false;
            });
          }
        }
      });
    });
  }

  back() { this.location.back(); }

  onSave(event): void {
    const data = {
      description: event.description,
      data: {
        enabled_options: event.enabled_options,
        disabled_instruments: event.disabled_instruments,
      },
    };
    this.apiInstitutionService.updateSendCategory(this.user.institution.id, this.id, data).subscribe((sendCategory: any ) => {
      this.toastrService.show(
        'SendCategory Updated',
        sendCategory.name,
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
