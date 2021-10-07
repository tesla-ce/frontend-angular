import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiInstitutionService } from '../../../../@core/data/api-institution.service';
import { ListCellActionsComponent } from '../../../../crud/list/list-cell-actions.component';
import { ListComponent } from '../../../../crud/list/list.component';

@Component({
  selector: 'ngx-admin-institution-list',
  templateUrl: './admin-institution-list.component.html',
  styleUrls: ['./admin-institution-list.component.scss'],
})
export class AdminInstitutionListComponent implements OnInit {
  endpoint = '/admin/institution';
  settings: any;
  @ViewChild('list') list: ListComponent;

  constructor(private apiInstitutionService: ApiInstitutionService) { }

  ngOnInit(): void {
    this.settings = {
      columns: {
        actions: {
          title: 'Actions',
          type: 'custom',
          sort: false,
          filter: false,
          renderComponent: ListCellActionsComponent,
          onComponentInitFunction: (instance) => {
            instance.remove.subscribe(data => {
                this.remove(data);
            });
          },
        },
        id: {
          title: 'ID',
        },
        name: {
          title: 'Name',
        },
        acronym: {
          title: 'Acronym',
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
      addNew: true,
    };
  }

  remove(event) {
    this.apiInstitutionService.deleteInstitutionById(event.id).subscribe(response => {
      this.list.refresh();
    });
  }
}
