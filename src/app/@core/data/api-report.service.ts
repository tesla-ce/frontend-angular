import { AuthService } from './../auth/auth.service';
// import { apiConstants } from './api-constants';
import { Injectable } from '@angular/core';
import { } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Report } from '../models/report';
import { Observable } from 'rxjs/Observable';
import { catchError, map } from 'rxjs/operators';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { EnvService } from '../env/env.service';
import { InstitutionUser } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class ApiReportService {

  apiUrl: string;
  endpoint: string;
  endpointUrl: string;

  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private envService: EnvService,
  ) {
    this.authService.getUser().subscribe((user: InstitutionUser)  => {
      if (user) this.endpoint = `/institution/${user.institution.id}`;
    });
    this.apiUrl = envService.apiUrl;
    this.endpointUrl = this.apiUrl + this.endpoint;
  }

  // API: GET /report/:id/activity
  public getActivityReports(activityId: number): Observable<any> {
    return this.http
      .get(this.endpointUrl + '/activity/' + activityId + '/report/')
      .pipe(
        map((response: any) => {
          if (response?.results) return response.results;
          else return [];
        }),
        catchError(this.handleError),
      );
  }

  // API: GET /report/:id/activity
  public getActivityReport(courseId: number, activityId: number, reportId: number): Observable<any> {
    return this.http
      .get(this.endpointUrl + '/course/' + courseId  + '/activity/' + activityId + '/report/' + reportId)
      .pipe(
        map((response: any) => {
          if (response?.id) return response;
          else return [];
        }),
        catchError(this.handleError),
      );
  }

  public getActivityReportChart(courseId: number, activityId: number, reportId: number): Observable<any> {
    return this.http
      .get(this.endpointUrl + '/course/' + courseId  + '/activity/' + activityId + '/report/' + reportId + '/request/')
      .pipe(
        map((response: any) => {
          if (response) return response;
          else return null;
        }),
        catchError(this.handleError),
      );
  }

  private handleError(error: Response | any) {
    // console.error('ApiIcService::handleError', error);
    return ErrorObservable.create(error);
  }

}
