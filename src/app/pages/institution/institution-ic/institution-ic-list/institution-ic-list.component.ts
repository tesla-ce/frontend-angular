import { AuthService } from './../../../../@core/auth/auth.service';
import { Component, OnInit } from '@angular/core';
// import { apiConstants } from '../../../../@core/data/api-constants';
import { ListCellActionsComponent } from '../../../../crud/list/list-cell-actions.component';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'ngx-institution-ic-list',
  templateUrl: './institution-ic-list.component.html',
  styleUrls: ['./institution-ic-list.component.scss'],
})
export class InstitutionIcListComponent implements OnInit {
  endPoint: string;
  settings = {
    columns: {
      actions: {
        title: 'Actions',
        type: 'custom',
        sort: false,
        filter: false,
        renderComponent: ListCellActionsComponent,
      },
      id: {
        title: 'ID',
      },
      'institution.name': {
        title: 'Institution',
      },
      version: {
        title: 'Version',
      },
      valid_from: {
        title: 'Valid from',
        valuePrepareFunction: value => {
          return this.datePipe.transform(value)
        }
      },
    },
    actions: {
      edit: false,
      add: false,
      delete: false,
    },
    mode: 'external',
    pager: {
      display: true,
      perPage: 10,
    },
  };


  constructor(private authService: AuthService, private datePipe: DatePipe, private router: Router, public translate: TranslateService,
  ) { }

  ngOnInit(): void {
    this.authService.getInstitution().subscribe(id => this.endPoint = `/institution/${id}/ic`);
  }

  goNew = () => {
    this.router.navigate(['/institution/institution-ic/create']);
  }

}
