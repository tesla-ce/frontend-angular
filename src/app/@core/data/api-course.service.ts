import { Injectable } from '@angular/core';
import { } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  endpoint: string = '/institution/';
  endpointUrl: string;

  constructor(
    private http: HttpClient,
    private envService: EnvService,
  ) {
    this.apiUrl = envService.apiUrl;
    this.endpointUrl = this.apiUrl + this.endpoint;
  }

  // API: GET /course/:id
  public getCourseById(courseId: number): Observable<Course> {
    return this.http
      .get(this.endpointUrl + "1/course/" + courseId)
      .pipe(
        map((course: Course) => {
          // console.log(course);
          if (course) return course;
          else throw course;
        }),
        catchError(this.handleError),
      );
  }

  // API: GET /course/:id/activity
  public getCourseActivity(courseId: number): Observable<any> {
    return this.http
      .get(this.endpointUrl + "1/course/" + courseId + '/activity')
      .pipe(
        map((response: any) => {
          if (response?.results) return response.results;
          else return []
        }),
        catchError(this.handleError),
      );
  }

  // API: GET /course/:id/activity/:id
  public getActivityInstrument(courseId: number, activityId: number): Observable<any> {
    return this.http
      .get(this.endpointUrl + "1/course/" + courseId + '/activity/' + activityId + "/instrument")
      .pipe(
        map((response: any) => {
          if (response?.results) return response.results;
          else return []
        }),
        catchError(this.handleError),
      );
  }

  // API: POST /ics/document/
  public addActivityInstrument(courseId, activityId, fields): Observable<any> {
    return this.http
      .post(this.endpointUrl + "1/course/" + courseId + "/activity/" + activityId + '/instrument/', fields).pipe(
        map((data: any) => {
          // console.log('Create Document Response', data);
          if (data) {
            return true;
          } else {
            return false;
          }
        }),
        catchError(this.handleError));
  }

  // API: DELETE /course/:id/activity/:id/instrument/:id
  public deleteActivityInstrument(courseId: number, activityId: number, instrumentId: number): Observable<any> {
    return this.http
      .delete(this.endpointUrl + "1/course/" + courseId + '/activity/' + activityId + "/instrument/" + instrumentId)
      .pipe(
        map((data: any) => {
          return true
        }),
        catchError(this.handleError),
      );
  }


  // API: GET /course/:id/activity
  public getCourseInstruments(institutionId: number): Observable<any> {
    return this.http
      .get(this.endpointUrl + institutionId + '/instrument')
      .pipe(
        map((response: any) => {
          if (response?.results) return response.results;
          else return []
        }),
        catchError(this.handleError),
      );
  }

  public getAllInstruments(): Observable<any> {
    return this.http
      .get(this.apiUrl + '/admin/instrument')
      .pipe(
        map((response: any) => {
          if (response?.results) return response.results;
          else return []
        }),
        catchError(this.handleError),
      );
  }


  // API: PUT /activity/:id/
  public putActivityActive(courseId: number, activityId: number, fields: any): Observable<any> {
    return this.http
      .put(this.endpointUrl + "/1/course/" + courseId + '/activity/' + activityId, fields).pipe(
        map((data: any) => {
          if (data.status) {
            return true;
          } else {
            return false;
          }
        }),
        catchError(this.handleError));
  }


  // API: PUT /course/:id
  // public updateCourse(courseId, fields, language): Observable<any> {
  public updateCourse(courseId, fields): void {

    console.log("Future")


    // let formData = new FormData()
    // formData.append('language', fields.language)
    // if (fields.pdf) formData.append('pdf', fields.pdf, fields.pdf?.name)
    // if (fields.html) formData.append('html', fields.html)

    // return this.http
    //   .put(this.endpointUrl + courseId + '/document/' + language + '/', formData,
    // ).pipe(
    //   map((data: any) => {
    //     if (data.status) {
    //       return true;
    //     } else {
    //       return false;
    //     }
    //   }),
    //   catchError(this.handleError));
  }


  private handleError(error: Response | any) {
    // console.error('ApiIcService::handleError', error);
    return ErrorObservable.create(error);
  }

}
