import { AuthService } from './../auth/auth.service';
// import { apiConstants } from './api-constants';
import { Injectable } from '@angular/core';
import { } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {catchError, map, switchMap} from 'rxjs/operators';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { EnvService } from '../env/env.service';
import { ReportAudit } from '../models/report';
import {iif, of} from 'rxjs';


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
    this.apiUrl = envService.apiUrl;
    this.endpointUrl = this.apiUrl;
  }

  // API: GET /report/:id/activity
  public getActivityReport(institutionId: number, courseId: number, activityId: number, reportId: number): Observable<any> {
    return this.http
      .get(`${this.endpointUrl}/institution/${institutionId}/course/${courseId}/activity/${activityId}/report/${reportId}`)
      .pipe(
        map((response: any) => {
          if (response?.id) return response;
          else return [];
        }),
        catchError(this.handleError),
      );
  }

  public getActivityReportChart(institutionId: number, courseId: number, activityId: number, reportId: number): Observable<any> {
    return this.http
      .get(`${this.endpointUrl}/institution/${institutionId}/course/${courseId}/activity/${activityId}/report/${reportId}/request/`)
      .pipe(
        map((response: any) => {
          if (response) return response;
          else return null;
        }),
        catchError(this.handleError),
      );
  }

  public getActivityReportAudit(institutionId: number, courseId: number, activityId: number,
                                reportId: number, instrumentId: number): Observable<any> {
    return this.http
      .get<ReportAudit>(`${this.endpointUrl}/institution/${institutionId}/course/${courseId}/activity/${activityId}/report/${reportId}/audit/${instrumentId}/`)
      .pipe(
        switchMap(report_audit => iif(() => report_audit.audit_data !== null, this.http.get<any>(report_audit.audit_data), of(null)).pipe(
            map(audit => ({ ...report_audit, audit })),
        )),
        catchError(this.handleError),
      );
  }

  private handleError(error: Response | any) {
    // console.error('ApiIcService::handleError', error);
    return ErrorObservable.create(error);
  }

}
