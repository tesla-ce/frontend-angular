import { parseParams } from './../utils/utils';
import { Institution, InstitutionUser } from './../models/user';
import { Injectable } from '@angular/core';
import { } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError, map } from 'rxjs/operators';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { EnvService } from '../env/env.service';
import { ApiService } from './api.service';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class ApiInstitutionService {

  apiUrl: string;
  endpoint: string = '/institution/';
  endpointUrl: string;
  currentInstitution: string;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private envService: EnvService) {
    this.apiUrl = envService.apiUrl;
    this.authService.getInstitution().subscribe(id => this.currentInstitution = id);
    this.endpointUrl = this.apiUrl + this.endpoint;
  }

  // API: GET /institutions
  public getAll(fields: any): Observable<Institution[]> {
    return this.http
      .get<any>(`${this.endpointUrl}${parseParams(fields)}`)
      .pipe(
        map(response => response.results),
        map((institutions: Institution[]) => {
          if (institutions) return institutions;
          else throw institutions;
        }),
        catchError(this.handleError),
      );
  }

  public getInstitutionUser(userId: string): Observable<InstitutionUser> {
    return this.http
      .get(`${this.endpointUrl}${this.currentInstitution}/learner/${userId}`)
      .pipe(
        map((user: InstitutionUser) => {
          // console.log(ic);
          if (user) return user;
          else throw user;
        }),
        catchError(this.handleError),
      );
  }


  // API: POST /institutions
  // public create(fields: any) {
  //   // will use this.http.post()
  //   return this.http.post(this.endpointUrl, fields)
  //   .pipe(
  //     map(( institution: Institution ) => {
  //       console.log(institution);
  //       if ( institution ) return institution;
  //       else throw institution;
  //     }),
  //     catchError(this.handleError),
  //   );
  // }

  // // API: GET /institutions/:id
  // public getById( institutionId: number ): Observable<Institution> {
  //   return this.http
  //     .get(this.endpointUrl + institutionId)
  //     .pipe(
  //       map(( Institution: Institution ) => {
  //         console.log(Institution);
  //         if ( Institution ) return Institution;
  //         else throw Institution;
  //       }),
  //       catchError(this.handleError),
  //   );
  // }


  // // API: PUT /institutions/:id
  // public update( institutionId, fields ): Observable<any> {
  //   return this.http
  //    .put(this.endpointUrl + '/' + institutionId, fields).pipe(
  //    map((data: any) => {
  //      if (data.status) {
  //        return true;
  //      } else {
  //        return false;
  //      }
  //    }),
  //    catchError(this.handleError));
  // }


  // // DELETE /institutions/:id
  // public deleteById(institutionId: number) {
  //   // will use this.http.delete()
  // }

  private handleError(error: Response | any) {
    console.error('ApiInstitutionService::handleError', error);
    return ErrorObservable.create(error);
  }

}
