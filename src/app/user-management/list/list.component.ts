import { Component, OnInit, ElementRef, AfterViewInit, ViewChild } from '@angular/core';
import { ServerDataSource } from 'ng2-smart-table';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ListCellActionsComponent } from './list-cell-actions.component';
import { ServerSourceConf } from 'ng2-smart-table/lib/lib/data-source/server/server-source.conf';
import {fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, tap } from 'rxjs/operators';

@Component({
  selector: 'ngx-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit, AfterViewInit {

  @ViewChild('searchInput') searchInput: ElementRef;

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
      username: {
        title: 'Username',
      },
      email: {
        title: 'Email',
      },
      is_superuser: {
        title: 'Super User',
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

  source: CustomDataSource;
  perPage: '10';

  constructor(http: HttpClient) {
    this.source = new CustomDataSource(http, {
      endPoint: 'https://demo.tesla-project.eu/api/v2/admin/user',
      dataKey: 'results',
      pagerPageKey: 'offset',
      pagerLimitKey: 'limit',
      totalKey: 'count',
      filterFieldKey: '#field#',
      sortFieldKey: 'ordering',
      sortDirKey: 'direction',
      // filterFieldKey: your filter keys template should set to '#field#' if you need to send params as you set, Default is '#field#_like'
    });
   }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    fromEvent(this.searchInput.nativeElement, 'keyup')
      .pipe(
          filter(Boolean),
          debounceTime(150),
          distinctUntilChanged(),
          tap((text) => {
            this.source.setFilter([{ field: 'search', search: this.searchInput.nativeElement.value }]);
          }),
      )
      .subscribe();
  }

  perPageOnChange(perPage): void {
    this.source.setPaging(1, +perPage, true);
  }
}

export class CustomDataSource extends ServerDataSource {
  constructor(http: HttpClient, serverSourceConf: ServerSourceConf) {
      super(http, serverSourceConf);
  }

  protected addPagerRequestParams(httpParams: HttpParams): HttpParams {
      const paging = this.getPaging();
      return httpParams
          .set(this.conf.pagerPageKey, ((paging.page - 1) * paging.perPage).toString())
          .set(this.conf.pagerLimitKey, paging.perPage.toString());
  }

  protected addSortRequestParams(httpParams: HttpParams): HttpParams {
      const sort: {field: string, direction: string}[] = this.getSort();
      sort.forEach((column) => {
          httpParams = httpParams.append(this.conf.sortFieldKey, `${column.direction === 'asc' ? '' : '-'}${column.field}`);
      });
      return httpParams;
  }
}

