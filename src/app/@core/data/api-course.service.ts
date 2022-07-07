import { AuthService } from './../auth/auth.service';
// import { apiConstants } from './api-constants';
import { Injectable } from '@angular/core';
import { } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Course } from '../models/course';
import { Observable } from 'rxjs/Observable';
import { catchError, map } from 'rxjs/operators';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { EnvService } from '../env/env.service';

@Injectable({
  providedIn: 'root',
})
export class ApiCourseService {

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

  // API: GET /course/
  public getCourses(institutionId: number): Observable<Course[]> {
    return this.http
      .get(`${this.endpointUrl}/institution/${institutionId}/course/`)
      .pipe(
        map((response: any) => {
          if (response?.results) return response.results;
          else return [];
        }),
        catchError(this.handleError),
      );
  }

  // API: GET /course/:id
  public getCourseById(institutionId: number, courseId: number): Observable<Course> {
    return this.http
      .get(`${this.endpointUrl}/institution/${institutionId}/course/${courseId}/`)
      .pipe(
        map((course: Course) => {
          if (course) return course;
          else throw course;
        }),
        catchError(this.handleError),
      );
  }

  // API: GET /course/:id/activity
  public getCourseActivities(institutionId: number, courseId: number): Observable<any> {
    return this.http
      .get(`${this.endpointUrl}/institution/${institutionId}/course/${courseId}/activity/`)
      .pipe(
        map((response: any) => {
          if (response?.results) {
            return response.results.map(function (activity) {
              activity.course_id = courseId;
              return activity;
            });
          } else return [];
        }),
        catchError(this.handleError),
      );
  }


  // API: GET /course/:id/activity
  public getCourseActivity(institutionId: number, courseId: number, activityId: number): Observable<any> {
    return this.http
      .get(`${this.endpointUrl}/institution/${institutionId}/course/${courseId}/activity/${activityId}/`)
      .pipe(
        map((response: any) => {
          if (response?.id) return response;
          else return [];
        }),
        catchError(this.handleError),
      );
  }

  // API: GET /course/:id/activity/:id
  public getActivityInstrument(institutionId: number, courseId: number, activityId: number): Observable<any> {
    return this.http
      .get(`${this.endpointUrl}/institution/${institutionId}/course/${courseId}/activity/${activityId}/instrument/`)
      .pipe(
        map((response: any) => {
          if (response?.results) return response.results;
          else return [];
        }),
        catchError(this.handleError),
      );
  }

  // API: POST /ics/document/
  public addActivityInstrument(institutionId: number, courseId: number, activityId: number, fields: any): Observable<any> {
    return this.http
      .post(`${this.endpointUrl}/institution/${institutionId}/course/${courseId}/activity/${activityId}/instrument/`, fields)
      .pipe(
        map((data: any) => {
          return data;
        }),
        catchError(this.handleError));
  }

  // API: DELETE /course/:id/activity/:id/instrument/:id
  public deleteActivityInstrument(institutionId: number, courseId: number, activityId: number, instrumentId: number): Observable<any> {
    return this.http
      .delete(`${this.endpointUrl}/institution/${institutionId}/course/${courseId}/activity/${activityId}/instrument/${instrumentId}/`)
      .pipe(
        map(() => true),
        catchError(this.handleError),
      );
  }

  // API: GET /instrument/
  public getAllInstruments(institutionId: number): Observable<any> {
    return this.http
      .get(`${this.endpointUrl}/institution/${institutionId}/instrument/`)
      .pipe(
        map((response: any) => {
          if (response?.results) return response.results;
          else return [];
        }),
        catchError(this.handleError),
      );
  }

    // API: GET /instrument/
    public getAllActivityInstruments(institutionId: number, courseId: number, activityId: number): Observable<any> {
      return this.http
        .get(`${this.endpointUrl}/institution/${institutionId}/course/${courseId}/activity/${activityId}/instrument/`)
        .pipe(
          map((response: any) => {
            if (response?.results) return response.results.filter(instrument => instrument.alternative_to == null);
            else return [];
          }),
          catchError(this.handleError),
        );
    }


  // API: PUT /activity/:id/
  public putActivityActive(institutionId: number, courseId: number, activityId: number, fields: any): Observable<any> {
    return this.http
      .put(`${this.endpointUrl}/institution/${institutionId}/course/${courseId}/activity/${activityId}/`, fields)
      .pipe(
        map((data: any) => {
          return data;
        }),
        catchError(this.handleError));
  }


  // API: PUT /activity/:id/
  public putInstrumentActive(
    institutionId: number, courseId: number, activityId: number, instrumentId: number, fields: any): Observable<any> {
    return this.http
      .put(`${this.endpointUrl}/institution/${institutionId}/course/${courseId}/activity/${activityId}/instrument/${instrumentId}/`, fields)
      .pipe(
        map((data: any) => {
          return data;
        }),
        catchError(this.handleError));
  }


  // API: GET /course/:id/activity
  public getActivityReports(institutionId: number, courseId: number, activityId: number): Observable<any> {
    return this.http
      .get(`${this.endpointUrl}/institution/${institutionId}/course/${courseId}/activity/${activityId}/report/`)
      .pipe(
        map((data: any) => {
          return data.results;
        }),
        catchError(this.handleError),
      );
  }

  // API: GET /course/:id/activity
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

  private handleError(error: Response | any) {
    // console.error('ApiIcService::handleError', error);
    return ErrorObservable.create(error);
  }

}
