import { AuthService } from './../auth/auth.service';
import { Injectable } from '@angular/core';
import { } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Ic } from '../models/ic';
import { Observable } from 'rxjs/Observable';
import { catchError, map } from 'rxjs/operators';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { EnvService } from '../env/env.service';
import { InstitutionUser } from '../models/user';
// import { apiConstants } from './api-constants';

@Injectable({
  providedIn: 'root',
})
export class ApiIcService {

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

  // API: POST /ics
  public createIc(institutionId: number, fields: any) {
    // will use this.http.post()
    return this.http
      .post(`${this.endpointUrl}/institution/${institutionId}/ic/`, fields)
      .pipe(
        map((ic: Ic) => {
          // console.log(ic);
          if (ic) return ic;
          else throw ic;
        }),
        catchError(this.handleError),
      );
  }

  // API: GET /ics/:id
  public getIcById(institutionId: number, icId: number): Observable<Ic> {
    return this.http
      .get(`${this.endpointUrl}/institution/${institutionId}/ic/${icId}`)
      .pipe(
        map((ic: Ic) => {
          // console.log(ic);
          if (ic) return ic;
          else throw ic;
        }),
        catchError(this.handleError),
      );
  }

  public getCurrentIc(institutionId: number): Observable<Ic> {
    return this.http
      .get(`${this.endpointUrl}/institution/${institutionId}/ic/current`)
      .pipe(
        map((ic: Ic) => {
          if (ic) return ic;
          else throw ic;
        }),
        catchError(this.handleError),
      );
  }

  // API: GET /ics/:id/:icId/document
  public getIcDocument(institutionId: number, icId: number): Observable<any> {
    return this.http
      .get(`${this.endpointUrl}/institution/${institutionId}/ic/${icId}/document/`)
      .pipe(
        map((response: any) => {
          if (response?.results) return response.results;
        }),
        catchError(this.handleError),
      );
  }

  // API: POST /ics/document/
  public createDocument(institutionId: number, icId: number, fields): Observable<any> {
    const formData = new FormData();
    formData.append('language', fields.language);
    if (fields.pdf) formData.append('pdf', fields.pdf, fields.pdf?.name);
    formData.append('html', fields.html || '');
    if (fields.language) formData.append('language', fields.language);

    return this.http
      .post(`${this.endpointUrl}/institution/${institutionId}/ic/${icId}/document/`, formData)
      .pipe(
        map((data: any) => {
          // console.log('Create Document Response', data);
          if (data.status) {
            return true;
          } else {
            return false;
          }
        }),
        catchError(this.handleError));
  }

  // API: PUT /ics/document/
  public updateDocument(institutionId: number, icId: number, fields: any, language: string): Observable<any> {

    const formData = new FormData();
    formData.append('language', fields.language);
    if (fields.pdf) formData.append('pdf', fields.pdf, fields.pdf?.name);
    // else formData.append('pdf', new Blob([], { type: 'text/plain' }));
    formData.append('html', fields.html || '');

    return this.http
      .put(`${this.endpointUrl}/institution/${institutionId}/ic/${icId}/document/${language}/`, formData)
      .pipe(
      map((data: any) => {
        if (data.status) {
          return true;
        } else {
          return false;
        }
      }),
      catchError(this.handleError));
  }

  // API: PUT /ics/:id
  public updateIc(institutionId: number, icId: number, fields: any): Observable<any> {
    return this.http
      .put(`${this.endpointUrl}/institution/${institutionId}/ic/${icId}/`, fields)
      .pipe(
        map((data: any) => {
          if (data.status) {
            return true;
          } else {
            return false;
          }
        }),
        catchError(this.handleError));
  }

  // DELETE /ic/:id
  public deleteIcById(institutionId: number, icId: number): Observable<any> {
    return this.http
      .delete(`${this.endpointUrl}/institution/${institutionId}/ic/${icId}/`)
      .pipe(
        map((data: any) => {
          return true;
        }),
        catchError(this.handleError),
      );
  }

  // DELETE Langueg /ics/:id
  public deleteDocument(institutionId: number, icId: number, language: string) {
    return this.http
      .delete(`${this.endpointUrl}/institution/${institutionId}/ic/${icId}/document/${language}/`)
      .pipe(
        map((data: any) => {
          return true;
        }),
        catchError(this.handleError),
      );
    // will use this.http.delete()
  }

  // API: POST /institution/id/learner/id/ic
  public approveIc(user: InstitutionUser, icVersion: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/institution/${user.institution.id}/learner/${user.id}/ic/`,
     { version: icVersion }).pipe(
      map((data: any) => {
        if (data) {
          return data;
        } else {
          return false;
        }
      }),
      catchError(this.handleError));
  }

  public rejectIc(user: InstitutionUser): Observable<any> {
    return this.http.delete(`${this.apiUrl}/institution/${user.institution.id}/learner/${user.id}/ic/`).pipe(
      map((data: any) => {
        if (data) {
          return data;
        } else {
          return false;
        }
      }),
      catchError(this.handleError));
  }

  private handleError(error: Response | any) {
    // console.error('ApiIcService::handleError', error);
    return ErrorObservable.create(error);
  }
}
