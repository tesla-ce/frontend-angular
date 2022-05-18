import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../../@core/auth/auth.service';
import { ApiIcService } from '../../../../@core/data/api-ic.service';
import { Ic } from '../../../../@core/models/ic';
import { InstitutionUser } from '../../../../@core/models/user';
import { InstitutionIcConfig } from '../institution-ic.config';

@Component({
  selector: 'ngx-institution-ic-read',
  templateUrl: './institution-ic-read.component.html',
  styleUrls: ['./institution-ic-read.component.scss'],
})
export class InstitutionIcReadComponent implements OnInit {
  id: number;
  languages: any[] = [];
  loading = true;
  public instance: Ic;
  public fields = InstitutionIcConfig.fields;
  regexPDF = /[0-9A-Za-z]+[.][Pp][Dd][Ff]/;

  constructor(
    private route: ActivatedRoute,
    private apiIcService: ApiIcService,
    private authService: AuthService,
    private location: Location,
  ) {
    this.route.params.subscribe(params => {
      if (params['id'] != null) {
        this.id = params['id'];
      }
    });
  }

  back() { this.location.back(); }

  ngOnInit(): void {
    this.authService.getUser().subscribe((user: InstitutionUser) => {
      if (user) {
        this.apiIcService.getIcDocument(user.institution.id, this.id).subscribe(list => {
          list.map((item) => {
            if (item.pdf) item.title = this.regexPDF.exec(item.pdf)[0];
          });
          this.languages = list;
          this.apiIcService.getIcById(user.institution.id, this.id).subscribe(instance => {
            this.instance = instance;
            this.loading = false;
          });
        });
      }
    });
  }

}
