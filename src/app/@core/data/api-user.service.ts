import { Injectable } from '@angular/core';
import {  } from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import { User } from '../models/user';
import { Observable } from 'rxjs/Observable';
import {catchError, map} from 'rxjs/operators';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { EnvService } from '../env/env.service';

@Injectable({
  providedIn: 'root',
})
export class ApiUserService {

  apiUrl: string;
  endpoint = '/admin/user/';
  endpointUrl: string;

  constructor(
    private http: HttpClient,
    private envService: EnvService,
  ) {
    this.apiUrl = envService.apiUrl;
    this.endpointUrl = this.apiUrl + this.endpoint;
  }

  // API: GET /users
  // public getAllUsers():Observable<User[]> {
  //   // will use this.http.post()
  // }

  // API: POST /users
  public createUser(fields: any) {
    // will use this.http.post()
    return this.http.post(this.endpointUrl, fields)
    .pipe(
      map(( user: User ) => {
        if ( user ) return user;
        else throw user;
      }),
      catchError(this.handleError),
    );
  }

  // API: GET /users/:id
  public getUserById( userId: number ): Observable<User> {
    return this.http
      .get(this.endpointUrl + userId + '/')
      .pipe(
        map(( user: User ) => {
          if ( user ) return user;
          else throw user;
        }),
        catchError(this.handleError),
    );
  }


  // API: PATCH /users/:id
  public updateUser( userId: number, fields ): Observable<any> {
    return this.http
     .patch(this.endpointUrl + userId + '/', fields).pipe(
     map((data: any) => {
       if (data.status) {
         return true;
       } else {
         return false;
       }
     }),
     catchError(this.handleError));
  }

  // API: PATCH /users/:id
  public updateUserProfile(userId: number, institutionId: number,  fields ): Observable<any> {
    return this.http
     .post(`${this.apiUrl}/institution/${institutionId}/user/${userId}/profile/`, fields).pipe(
     map((data: any) => {
       if (data.status) {
         return true;
       } else {
         return false;
       }
     }),
     catchError(this.handleError));
  }

  // API: DELETE /users/:id
  public deleteUserById(userId: number): Observable<any> {
    return this.http
      .delete(`${this.apiUrl}/admin/user/${userId}/`)
      .pipe(
        map(() => true),
        catchError(this.handleError),
      );
  }

  // API: DELETE /users/:id
  public deleteInstitutionUserById(userId: number, institutionId: number): Observable<any> {
    return this.http
      .delete(`${this.apiUrl}/institution/${institutionId}/user/${userId}/`)
      .pipe(
        map(() => true),
        catchError(this.handleError),
      );
  }


  // API: POST /users
  public createInstitutionUser(institutionId: number, fields: any) {
    // will use this.http.post()
    return this.http.post(`${this.apiUrl}/institution/${institutionId}/user/`, fields)
    .pipe(
      map(( user: User ) => {
        if ( user ) return user;
        else throw user;
      }),
      catchError(this.handleError),
    );
  }

  // API: PATCH /users/:id
  public updateInstitutionUser( institutionId: number, userId: number, fields ): Observable<any> {
    return this.http
     .patch(`${this.apiUrl}/institution/${institutionId}/user/${userId}/`, fields).pipe(
     map((data: any) => {
       if (data.status) {
         return true;
       } else {
         return false;
       }
     }),
     catchError(this.handleError));
  }

   // API: GET /users/:id
   public getInstitutionUserById( institutionId: number, userId: number ): Observable<User> {
    return this.http
      .get(`${this.apiUrl}/institution/${institutionId}/user/${userId}/`)
      .pipe(
        map(( user: User ) => {
          if ( user ) return user;
          else throw user;
        }),
        catchError(this.handleError),
    );
  }

  private handleError (error: Response | any) {
    console.error('ApiUserService::handleError', error);
    return ErrorObservable.create(error);
  }
}
