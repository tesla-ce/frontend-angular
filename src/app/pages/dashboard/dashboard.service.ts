import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataSource } from '@angular/cdk/collections';

import { BehaviorSubject, Observable, Subject, EMPTY } from 'rxjs';
import {switchMap, startWith, map, shareReplay, expand, reduce} from 'rxjs/operators';
import { AuthService } from '../../@core/auth/auth.service';
import { Dashboard } from '../../@core/models/dashboard';
import { User } from '../../@core/models/user';
import { Course } from '../../@core/models/course';
import { Activity } from '../../@core/models/activity';
import { LearnerEnrolment } from '../../@core/models/enrolment';
import { EnvService } from '../../@core/env/env.service';
import { ApiEnrolmentService } from '../../@core/data/api-enrolment.service';

export interface QueryString {
  sort?: string;
  filter?: string;
}

export interface Sort<T> {
  property: keyof T;
  order: 'asc' | 'desc';
}

export interface PageRequest<T> {
  page: number;
  size: number;
  sort?: Sort<T>;
}

export interface Page<T> {
  content: T[];
  totalElements: number;
  size: number;
  number: number;
}
export type PaginationEndpoint<T> = (req: PageRequest<T>, query?: QueryString) => Observable<Page<T>>;

interface ApiDataResponse<T> {
  count: number;
  next: string;
  previous: string;
  results: T[];
}

export class PaginationDataSource<T> implements DataSource<T> {
  private pageNumber = new Subject<number>();
  private sort: BehaviorSubject<Sort<T>>;

  public page$: Observable<Page<T>>;

  constructor(endpoint: PaginationEndpoint<T>, initialSort: Sort<T>, size = 20) {
    this.sort = new BehaviorSubject<Sort<T>>(initialSort);
    this.page$ = this.sort.pipe(
      switchMap(sort => this.pageNumber.pipe(
        startWith(0),
        switchMap(page => endpoint({page, sort, size})),
      )),
      shareReplay(1),
    );
  }

  sortBy(sort: Partial<Sort<T>>): void {
    const lastSort = this.sort.getValue();
    const nextSort = {...lastSort, ...sort};
    this.sort.next(nextSort);
  }

  fetch(page: number): void {
    this.pageNumber.next(page);
  }

  connect(): Observable<T[]> {
    return this.page$.pipe(map(page => page.content));
  }

  disconnect(): void {}

  static getQueryString(request: PageRequest<any>): string {
    const offset = request.page * request.size;
    return `offset=${offset}&limit=${request.size}`;
  }
}

@Injectable({providedIn: 'root'})
export class CourseService {
  private apiUrl: string;
  public dataSource: PaginationDataSource<Course>;
  private currentUser: User;

  constructor(protected http: HttpClient,
              protected envService: EnvService,
              private authService: AuthService,
              ) {
    this.dataSource = new PaginationDataSource<Course>(
      (request, query) => this.page(request, query),
      {property: 'id', order: 'asc'},
      10,
    );
    this.authService.getUser().subscribe(user => {
      this.currentUser = user;
      if (user) {
        this.apiUrl = `${envService.apiUrl}/institution/${user.institution.id}/user/${user.id}/activities/`;
      }
    });

  }
  page(request: PageRequest<Course>, query: QueryString): Observable<Page<Course>> {
    const qs = PaginationDataSource.getQueryString(request);
    if (this.currentUser)
      return this.http.get<Page<Course>>(`${this.apiUrl}?${qs}`);
    return EMPTY;
  }

  public fetchAllActiveUserActivities(searchTerm?: string): Observable<Activity[]> {
    return this.http.get<ApiDataResponse<Activity>>(`${this.apiUrl}`).pipe(
      // we recursively call the GET requests until there is no 'next' url
      expand(page => {
        return page.next ? this.http.get<ApiDataResponse<Activity>>(page.next) : EMPTY;
      }),
      // we map the api response to the data we actually want to return
      map(page => page.results),
      // we reduce the data of all GET requests to a single array
      reduce((accData, data) => accData.concat(data), []),
    );
  }
}

@Injectable({
  providedIn: 'root',
})
export class DashboardService {

  private readonly DASHBOARDS = 'assets/dashboards.json';
  currentUser: User;
  rootUrl: string;

  constructor(protected http: HttpClient,
              private authService: AuthService,
              private envService: EnvService,
              private courseService: CourseService,
              private enrolmentService: ApiEnrolmentService,
  ) {
    this.rootUrl = envService.apiUrl;
    this.authService.getUser().subscribe(user => {
      this.currentUser = user;
    });
  }

  public getDashboards(): Observable<Dashboard[]> {
    return this.http.get<Dashboard[]>(this.DASHBOARDS);
  }

  public getUserDashboard(): Observable<Dashboard> {
    return this.getDashboard('4');
  }

  public getUserEnrolment(): Observable<LearnerEnrolment[]> {
    return this.enrolmentService.getEnrolment(this.currentUser.id, this.currentUser.institution.id);
  }

  public getUser(): Observable<User> {
    return this.authService.getUser();
  }

  public getDashboard(dashboardId: string): Observable<Dashboard>  {

    return this.http.get<Dashboard[]>(this.DASHBOARDS).pipe(
      map((dashboards: Dashboard[]) =>
        dashboards.find(dashboard => dashboard.id === dashboardId)));
  }

  public getUserActiveActivities(): Observable<Activity[]> {
    return this.courseService.fetchAllActiveUserActivities();
  }
}
