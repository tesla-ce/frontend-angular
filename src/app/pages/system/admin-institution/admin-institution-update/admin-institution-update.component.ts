import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { Subject } from 'rxjs';
import { ApiInstitutionService } from '../../../../@core/data/api-institution.service';
import { Institution } from '../../../../@core/models/user';
import { AdminInstitutionConfig } from '../admin-institution.config';

@Component({
  selector: 'ngx-admin-institution-update',
  templateUrl: './admin-institution-update.component.html',
  styleUrls: ['./admin-institution-update.component.scss'],
})
export class AdminInstitutionUpdateComponent {

  public id: number;
  public instance: Institution;
  public fields = AdminInstitutionConfig.fields;
  public errors = new Subject();
  public paths = AdminInstitutionConfig.paths;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private apiInstitutionService: ApiInstitutionService,
    private toastrService: NbToastrService) {
    this.route.params.subscribe(params => {
      if (params['id'] != null) {
        this.id = params['id'];
        apiInstitutionService.getInstitutionById(this.id).subscribe(instance => {
          this.instance = instance;
        });
      } else {
        router.navigate(['../'], { relativeTo: this.route });
      }
    });
  }

  onSave(event): void {
    this.apiInstitutionService.updateInstitution(this.id, event).subscribe((institution: Institution) => {
      this.toastrService.show(
        'Institution Updated',
        institution.acronym,
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
        'institution',
        {
          position: NbGlobalPhysicalPosition.TOP_RIGHT,
          status: 'danger',
          icon: 'save-outline',
          duration: 2000,
        });
    });
  }

  back() { this.location.back(); }

}
