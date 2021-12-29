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
  disabled = true;

  constructor(
    private location: Location,
    private authService: AuthService,
    private apiInstitutionService: ApiInstitutionService,
    private toastrService: NbToastrService,
  ) { }

  ngOnInit() {
    this.authService.getUser().subscribe((user: InstitutionUser) => {
      if (user) {
        if (user.roles.indexOf('ADMIN') !== -1) this.disabled = false;
        this.apiInstitutionService.getInstitutionById(user.institution.id).subscribe((institution: Institution) => {
          this.institution = institution;
        });
      }
    });
  }

  toggleDisableVLELearnerCreation(event) {
    this.institution.disable_vle_learner_creation = event;
  }

  toggleDisableVLEInstructorCreation(event) {
    this.institution.disable_vle_instructor_creation = event;
  }

  toggleDisableVLEUserCreation(event) {
    this.institution.disable_vle_user_creation = event;
  }

  toggleAllowLearnerReport(event) {
    this.institution.allow_learner_report = event;
  }

  toggleAllowLearnerAudit(event) {
    this.institution.allow_learner_audit = event;
  }

  toggleAllowValidAudit(event) {
    this.institution.allow_valid_audit = event;
  }

  toggleExternalIC(event) {
    this.institution.external_ic = event;
  }

  onSave() {
    this.apiInstitutionService.updateInstitutionAsInstitutionAdmin(this.institution.id, this.institution).subscribe(() => {
      this.toastrService.show(
          'Institution Updated',
          this.institution.name,
          {
            position: NbGlobalPhysicalPosition.TOP_RIGHT,
            status: 'success',
            icon: 'save-outline',
            duration: 2000,
          });
      }, () => {
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


