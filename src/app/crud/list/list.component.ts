import { Component, OnInit, ElementRef, AfterViewInit, ViewChild, Input, OnChanges, Output } from '@angular/core';
import { LocalDataSource, ServerDataSource } from 'ng2-smart-table';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ServerSourceConf } from 'ng2-smart-table/lib/lib/data-source/server/server-source.conf';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, tap } from 'rxjs/operators';
import { EnvService } from '../../@core/env/env.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'ngx-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit, AfterViewInit, OnChanges {

  @Input() settings: any;
  @Input() endpoint: any;
  @Input() localSource: [];
  @Input() showFooter = true;

  @Output() externalUserRowSelect: EventEmitter<any> = new EventEmitter();

  @ViewChild('searchInput') searchInput: ElementRef;

  source: CustomDataSource;
  localDataSource: LocalDataSource;
  perPage: string;
  http: HttpClient;
  envService: EnvService;
  id: number;

  constructor(
    http: HttpClient,
    envService: EnvService,
    private route: ActivatedRoute,
    private router: Router) {
    this.http = http;
    this.envService = envService;

  }

  initTable(): void {
    if (this.endpoint) {
      this.source = new CustomDataSource(this.http, {
        endPoint: this.envService.apiUrl + this.endpoint,
        dataKey: 'results',
        pagerPageKey: 'offset',
        pagerLimitKey: 'limit',
        totalKey: 'count',
        filterFieldKey: '#field#',
        sortFieldKey: 'ordering',
        sortDirKey: 'direction',
      });
    } else {
      this.localDataSource = new LocalDataSource(this.localSource);
    }
  }

  ngOnInit(): void {
    this.initTable();
  }

  ngOnChanges() {
    this.initTable();
  }

  ngAfterViewInit(): void {
    if (this.searchInput) {
      fromEvent(this.searchInput.nativeElement, 'keyup')
      .pipe(
        filter(Boolean),
        debounceTime(150),
        distinctUntilChanged(),
        tap(() => {
          this.source.setFilter([{ field: 'search', search: this.searchInput.nativeElement.value }]);
        }),
      )
      .subscribe();
    }
  }

  userRowSelect(event) {
    if (this.externalUserRowSelect) this.externalUserRowSelect.emit(event);
  }

  create() {
    this.router.navigate(['create'], { relativeTo: this.route });
  }

  perPageOnChange(perPage): void {
    this.source.setPaging(1, +perPage, true);
  }

  refresh(): void {
    this.source.refresh();
  }

  setFilter(filters: any, andOperator: boolean): void {
    this.source.setFilter(filters, andOperator);
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
    const sort: { field: string, direction: string }[] = this.getSort();
    sort.forEach((column) => {
      httpParams = httpParams.append(this.conf.sortFieldKey, `${column.direction === 'asc' ? '' : '-'}${column.field}`);
    });
    return httpParams;
  }
}

