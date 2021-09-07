import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { of as observableOf, Observable, Subject } from 'rxjs';
import { ApiInstitutionService } from '../../../../@core/data/api-institution.service';
import { Institution } from '../../../../@core/models/institution';
import { AdminInstitutionConfig } from '../admin-institution.config';

@Component({
  selector: 'ngx-admin-institution-create',
  templateUrl: './admin-institution-create.component.html',
  styleUrls: ['./admin-institution-create.component.scss'],
})
export class AdminInstitutionCreateComponent implements OnInit {

  fields = AdminInstitutionConfig.fields;
  validator = AdminInstitutionConfig.validator;
  public errors = new Subject();

  constructor(private apiInstitutionService: ApiInstitutionService, private toastrService: NbToastrService, private router: Router) { }

  ngOnInit(): void {
  }

  onSave(event): void {
    this.apiInstitutionService.createInstitution(event).subscribe((institution: Institution) => {
      this.toastrService.show(
        'Institution Created',
        institution.acronym,
        {
          position: NbGlobalPhysicalPosition.TOP_RIGHT,
          status: 'success',
          icon: 'save-outline',
          duration: 2000,
        });
      this.router.navigate(['/admin/admin-institution/']);
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
}
