import { InstitutionIcConfig } from '../institution-ic.config';
import { Component, OnInit } from '@angular/core';
import { NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { of as observableOf, Observable, Subject } from 'rxjs';
import { ApiIcService } from '../../../../@core/data/api-ic.service';
import { Ic } from '../../../../@core/models/ic';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../../../../@core/auth/auth.service';
import { InstitutionUser } from '../../../../@core/models/user';

@Component({
  selector: 'ngx-institution-ic-create',
  templateUrl: './institution-ic-create.component.html',
  styleUrls: ['./institution-ic-create.component.scss'],
})
export class InstitutionIcCreateComponent implements OnInit {

  fields = InstitutionIcConfig.fields;
  public errors = new Subject();
  validator = InstitutionIcConfig.validator;

  constructor(
    private apiIcService: ApiIcService,
    private authService: AuthService,
    public translate: TranslateService,
    private location: Location,
    private toastrService: NbToastrService,
    private router: Router) { }

  ngOnInit(): void {
  }

  back() { this.location.back(); }


  onSave(event): void {
    this.authService.getUser().subscribe((user: InstitutionUser) => {
      if (user) {
        this.apiIcService.createIc(user.institution.id, event).subscribe((ic: Ic) => {
          this.toastrService.show(
            'Ic Created',
            ic.version,
            {
              position: NbGlobalPhysicalPosition.TOP_RIGHT,
              status: 'success',
              icon: 'save-outline',
              duration: 2000,
            });
          this.router.navigate(['/institution/ic']);
        }, error => {
          this.errors.next(error.error);
          this.toastrService.show(
            'Error saving',
            'ic',
            {
              position: NbGlobalPhysicalPosition.TOP_RIGHT,
              status: 'danger',
              icon: 'save-outline',
              duration: 2000,
            });
        });
      }
    });
  }
}
