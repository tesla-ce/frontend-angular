import { Injectable } from '@angular/core';
import {  } from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import { User } from '../models/user';
import { Observable } from 'rxjs/Observable';
import {catchError, map} from 'rxjs/operators';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { EnvService } from '../../@core/env/env.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  apiUrl: string;
  endpoint: string = '/admin/user/';
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
  public createUser(user: User) {
    // will use this.http.post()
  }

  // API: GET /users/:id
  public getUserById( userId: number ): Observable<User> {
    return this.http
      .get(this.endpointUrl + userId)
      .pipe(
        map(( user: User ) => {
          console.log(user);
          if ( user ) return user;
          else throw user;
        }),
        catchError(this.handleError),
    );
  }


  // API: PUT /users/:id
  public updateUser( idUser, fields ): Observable<any> {
    return this.http
     .put(this.endpointUrl + '/' + idUser, fields).pipe(
     map((data: any) => {
       if (data.status) {
         return true;
       } else {
         return false;
       }
     }),
     catchError(this.handleError));
  }


  // DELETE /users/:id
  public deleteUserById(userId: number) {
    // will use this.http.delete()
  }

  private handleError (error: Response | any) {
    console.error('ApiService::handleError', error);
    return ErrorObservable.create(error);
  }

  camelToSnakeCase (str) {
    return str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
  }
  snakeToCamelCase (str) {
    return str.replace(/[-_][a-z]/ig, letter => `${letter.toUpperCase()}`).replace('_', '');
  }

}
