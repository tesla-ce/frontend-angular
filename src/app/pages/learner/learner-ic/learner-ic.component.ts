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

  user: InstitutionUser;
  id: number;
  languages: any = {};
  approved: boolean;
  languagesSelections: string[] = [];
  selectedLanguage: 'es';
  loading: boolean = true;
  public instance: Ic;
  public fields = InstitutionIcConfig.fields;
  regexPDF: RegExp = /[0-9A-Za-z]+[.][Pp][Dd][Ff]/;
  redirectUri: string = null;

  constructor(
    private route: ActivatedRoute,
    private apiIcService: ApiIcService,
    private authService: AuthService,
    public translate: TranslateService,
    private institutionService: ApiInstitutionService,
    private router: Router) {
    // this.route.params.subscribe(params => {
    //   if (params['id'] != null) {
    //     this.id = params['id'];
    //   } else {
    //     router.navigate(['../'], { relativeTo: this.route });
    //   }
    // });
  }

  ngOnInit(): void {

    this.authService.getUser()
      .pipe()
      .subscribe((user: User) => {
        if (user) {
          this.institutionService.getInstitutionUser(user.id)
            .pipe()
            .subscribe((institutionUser: InstitutionUser) => {
              this.user = institutionUser;
              this.approved = institutionUser.ic_status.startsWith('NOT_VALID') ? false : true;
            });
        }
      });

    this.apiIcService.getCurrentIc().subscribe(instance => {
      this.instance = instance;

      this.apiIcService.getIcDocument(this.instance.id).subscribe(list => {
        const objectification = {};
        list.map((item, index) => {
          objectification[item.language] = {};
          objectification[item.language].html = item.html;
          if (item.pdf) {
            objectification[item.language].pdf = item.pdf;
            objectification[item.language].title = this.regexPDF.exec(item.pdf)[0];
          }
          this.languagesSelections.push(item.language);
          if (!index) this.selectedLanguage = item.language;
        });

        this.languages = objectification;
        this.route.queryParams.subscribe(params => {
          if (params['redirect_uri']) {
            const allowedDomains = ['https://example.com/'];
            const domain =  (new URL(params['redirect_uri'])).hostname.replace('www.', '');
            if (allowedDomains.indexOf(domain) !== -1 ) this.redirectUri = params['redirect_uri'];
          }
          this.loading = false;
        });
      });
    });
  }

  accept() {
    this.apiIcService.approveIc(this.user.id, this.instance.version).subscribe(response => {
      if (response) {
        this.user = response;
        this.approved = true;
      }
    });
  }
  reject() {
    this.apiIcService.rejectIc(this.user.id, this.instance.version).subscribe(response => {
      if (response) {
        this.user = response;
        this.approved = false;
      }
    });
  }

  pickedLanguage(event): void {
    this.selectedLanguage = event;
  }

  backToLMS() {
    window.location.href = this.redirectUri;
  }

}
