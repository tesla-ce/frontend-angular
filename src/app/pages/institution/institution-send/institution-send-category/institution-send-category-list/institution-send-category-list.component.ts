import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../../@core/auth/auth.service';
// import { InstitutionSendCategory } from '../../../../@core/models/send-category';
import { ListCellActionsComponent } from '../../../../../crud/list/list-cell-actions.component';

@Component({
  selector: 'ngx-institution-send-category-list',
  templateUrl: './institution-send-category-list.component.html',
  styleUrls: ['./institution-send-category-list.component.scss'],
})
export class InstitutionSendCategoryListComponent implements OnInit {

  endpoint: String;

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
      description: {
        title: 'Description',
      },
      // enabled_options: {
      //   title: 'Enabled options',
      // },
      // disabled_instruments: {
      //   title: 'Disabled Instruments',
      // },
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
    addNew: true,
  };

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.getUser().subscribe((user: any) => {
      if (user) this.endpoint = `/institution/${user.institution.id}/send`;
    });
  }

}
