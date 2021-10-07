import { ApiIcService } from '../../../@core/data/api-ic.service';
import { InstitutionIcConfig } from '../../institution/institution-ic/institution-ic.config';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Ic } from '../../../@core/models/ic';
import { AuthService } from '../../../@core/auth/auth.service';
import { takeUntil } from 'rxjs/operators';
import { InstitutionUser, User } from '../../../@core/models/user';
import { Subject } from 'rxjs';
import { ApiInstitutionService } from '../../../@core/data/api-institution.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'ngx-learner-ic',
  templateUrl: './learner-ic.component.html',
  styleUrls: ['./learner-ic.component.scss'],
})
export class LearnerIcComponent implements OnInit {
  private destroy$: Subject<void> = new Subject<void>();

  learner: InstitutionUser;
  id: number;
  documents: any = null;
  valid: boolean;
  availableLanguages: string[] = [];
  selectedLanguage: 'es';
  loading: boolean = true;
  public instance: Ic;
  public fields = InstitutionIcConfig.fields;
  regexPDF: RegExp = /[0-9A-Za-z]+[.][Pp][Dd][Ff]/;
  redirectUri: string = null;
  external: Boolean = false;

  constructor(
    private route: ActivatedRoute,
    private apiIcService: ApiIcService,
    private authService: AuthService,
    public translate: TranslateService,
    private institutionService: ApiInstitutionService,
    private router: Router) {}

  ngOnInit(): void {

    this.authService.getUser()
      .pipe()
      .subscribe((user: InstitutionUser) => {
        if (user) {
          this.institutionService.getLearner(user.institution.id, user.id)
            .pipe()
            .subscribe((learner: InstitutionUser) => {
              this.learner = learner;
              this.valid = learner.ic_status.startsWith('NOT_VALID') ? false : true;
              this.apiIcService.getCurrentIc(user.institution.id).subscribe(instance => {
                this.instance = instance;
                this.external = instance.institution.external_ic;
                this.apiIcService.getIcDocument(user.institution.id, this.instance.id).subscribe(documentsList => {
                  if (documentsList.length) {
                    const documentObject = {};
                    documentsList.map((item, index) => {
                      documentObject[item.language] = {};
                      documentObject[item.language].html = item.html;
                      if (item.pdf) {
                        documentObject[item.language].pdf = item.pdf;
                        documentObject[item.language].title = this.regexPDF.exec(item.pdf)[0];
                      }
                      this.availableLanguages.push(item.language);
                      if (!index) this.selectedLanguage = item.language;
                    });
                    this.documents = documentObject;
                  }
                  this.loading = false;
                });
              });
            });
        }
    });
  }

  accept() {
    this.apiIcService.approveIc(this.learner, this.instance.version).subscribe(response => {
      if (response) {
        this.learner = response;
        this.valid = true;
      }
    });
  }
  reject() {
    this.apiIcService.rejectIc(this.learner).subscribe(response => {
      if (response) {
        this.learner = response;
        this.valid = false;
      }
    });
  }

  pickedLanguage(event): void {
    this.selectedLanguage = event;
  }
}
