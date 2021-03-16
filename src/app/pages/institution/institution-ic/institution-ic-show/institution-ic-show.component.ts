import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiIcService } from '../../../../@core/data/api-ic.service';
import { Ic } from '../../../../@core/models/ic';
import { InstitutionIcConfig } from '../institution-ic.config';

@Component({
  selector: 'ngx-institution-ic-show',
  templateUrl: './institution-ic-show.component.html',
  styleUrls: ['./institution-ic-show.component.scss'],
})
export class InstitutionIcShowComponent implements OnInit {
  id: number;
  languages: any[] = []
  loading: boolean = true;
  public instance: Ic;
  public fields = InstitutionIcConfig.fields;
  regexPDF: RegExp = /[0-9A-Za-z]+[.][Pp][Dd][Ff]/;

  constructor(
    private route: ActivatedRoute,
    private apiIcService: ApiIcService,
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
    this.apiIcService.getIcDocument(this.id).subscribe(list => {
      list.map((item) => {
        if (item.pdf) item.title = this.regexPDF.exec(item.pdf)[0]
      });
      this.languages = list;
    })

    this.apiIcService.getIcById(this.id).subscribe(instance => {
      this.instance = instance;
      this.loading = false;
    });
  }

}
