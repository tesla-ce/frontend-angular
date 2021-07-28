import { ApiIcService } from '../../../@core/data/api-ic.service';
import { InstitutionIcConfig } from '../../institution/institution-ic/institution-ic.config';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Ic } from '../../../@core/models/ic';
import { AuthService } from '../../../@core/auth/auth.service';
import { InstitutionUser } from '../../../@core/models/user';

@Component({
  selector: 'ngx-ic-iframe',
  templateUrl: './ic-iframe.component.html',
  styleUrls: ['./ic-iframe.component.scss'],
})
export class IcIframeComponent implements OnInit {
  @Input() user: any;

  id: number;
  languages: any = {};
  languagesSelections: string[] = [];
  selectedLanguage: 'es';
  loading: boolean = true;
  public instance: Ic;
  public fields = InstitutionIcConfig.fields;
  regexPDF: RegExp = /[0-9A-Za-z]+[.][Pp][Dd][Ff]/;

  constructor(
    private route: ActivatedRoute,
    private apiIcService: ApiIcService,
    private authService: AuthService,
    private router: Router) {
    this.route.params.subscribe(params => {
      if (params['id'] != null) {
        this.id = params['id'];
      } else {
        router.navigate(['../'], { relativeTo: this.route });
      }
    });
  }

  ngOnInit(): void {
    this.authService.getUser().subscribe((user: InstitutionUser) => {
      if (user) {
        this.apiIcService.getIcDocument(user.institution.id, this.id).subscribe(list => {
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
          this.apiIcService.getIcById(user.institution.id, this.id).subscribe(instance => {
            this.instance = instance;
            this.loading = false;
          });
        });
      }
    });
  }

  pickedLanguage(event): void {
    this.selectedLanguage = event;
  }

}
