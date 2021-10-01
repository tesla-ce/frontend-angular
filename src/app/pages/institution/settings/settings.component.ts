import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ApiInstitutionService } from '../../../@core/data/api-institution.service';
import { AuthService } from '../../../@core/auth/auth.service';
import { Institution, InstitutionUser } from '../../../@core/models/user';
import { NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';

@Component({
  selector: 'ngx-settings',
  styleUrls: ['./settings.component.scss'],
  templateUrl: './settings.component.html',
})

export class SettingsComponent implements OnInit {

  institution: Institution;

  constructor(
    private location: Location,
    private authService: AuthService,
    private apiInstitutionService: ApiInstitutionService,
    private toastrService: NbToastrService,
  ) { }

  ngOnInit() {
    this.authService.getUser().subscribe((user: InstitutionUser) => {
      if (user) {
        this.apiInstitutionService.getInstitutionById(user.institution.id).subscribe((institution: Institution) => {
          this.institution = institution;
        });
      }
    });
  }

  toggleDisableVLElearnerCreation(event) {
    this.institution.disable_vle_learner_creation = event;
  }

  toggleDisableVLEinstructorCreation(event) {
    this.institution.disable_vle_instructor_creation = event;
  }

  toggleDisableVLEuserCreation(event) {
    this.institution.disable_vle_user_creation = event;
  }

  toggleAllowlearnerReport(event) {
    this.institution.allow_learner_report = event;
  }

  toggleAllowlearnerAudit(event) {
    this.institution.allow_learner_audit = event;
  }

  toggleAllowvalidAudit(event) {
    this.institution.allow_valid_audit = event;
  }

  onSave() {
    this.apiInstitutionService.updateInstitution(this.institution.id, this.institution).subscribe((response: any) => {
      this.toastrService.show(
          'Institution Updated',
          this.institution.name,
          {
            position: NbGlobalPhysicalPosition.TOP_RIGHT,
            status: 'success',
            icon: 'save-outline',
            duration: 2000,
          });
      }, error => {
        this.toastrService.show(
          'Error saving',
          'user',
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


