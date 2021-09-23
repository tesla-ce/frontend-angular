import { parseParams } from './../utils/utils';
import { Institution } from './../models/institution';
import { Injectable } from '@angular/core';
import { } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError, map } from 'rxjs/operators';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { EnvService } from '../env/env.service';
import { AuthService } from '../auth/auth.service';
import { InstitutionUser } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class ApiInstitutionService {

  apiUrl: string;
  endpoint: string = '/institution/';
  endpointUrl: string;
  institution: Institution;
  user: InstitutionUser;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private envService: EnvService) {
    this.apiUrl = envService.apiUrl;
    // this.authService.getInstitution().subscribe((institution: Institution) => this.institution = institution);
    this.endpointUrl = this.apiUrl + this.endpoint;
  }

  public getInstitutionUser(institutionId: number, userId: number): Observable<InstitutionUser> {
    return this.http
      .get(`${this.endpointUrl}${institutionId}/learner/${userId}/`)
      .pipe(
        map((user: InstitutionUser) => {
          // console.log(ic);
          if (user) return user;
          else throw user;
        }),
        catchError(this.handleError),
      );
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

  // API: POST /institutions
  public createInstitution(fields: any) {
    return this.http.post(this.endpointUrl, fields)
    .pipe(
      map(( institution: Institution ) => {
        // console.log(institution);
        if ( institution ) return institution;
        else throw institution;
      }),
      catchError(this.handleError),
    );
  }

  // API: GET /institutions/:id
  public getInstitutionById( institutionId: number ): Observable<Institution> {
    return this.http
      .get(this.endpointUrl + institutionId + '/')
      .pipe(
        map(( institution: Institution ) => {
          // console.log(institution);
          if ( institution ) return institution;
          else throw institution;
        }),
        catchError(this.handleError),
    );
  }


  // API: PUT /institutions/:id
  public updateInstitution( institutionId: number, fields ): Observable<any> {
    return this.http
     .put(this.endpointUrl + institutionId + '/', fields).pipe(
     map((data: any) => {
       if (data.status) {
         return true;
       } else {
         return false;
       }
     }),
     catchError(this.handleError));
  }


  // DELETE /institutions/:id
  public deleteInstitutionById(institutionId: number) {
    // will use this.http.delete()
  }

  // API: GET /institutions/:id
  public getLearnerById( institutionId: number, userId: number ): Observable<any> {
    return this.http
      .get(this.endpointUrl + institutionId + '/learner/' + userId + '/')
      .pipe(
        map(( learner: any ) => {
          if ( learner ) return learner;
          else throw learner;
        }),
        catchError(this.handleError),
    );
}

  // API: GET /institutions/:id
  public getSendCategoryById( institutionId: number, sendCategoryId: number ): Observable<any> {
      return this.http
        .get(this.endpointUrl + institutionId + '/send/' + sendCategoryId)
        .pipe(
          map(( sendCategroy: any ) => {
            if ( sendCategroy ) return sendCategroy;
            else throw sendCategroy;
          }),
          catchError(this.handleError),
      );
  }

  // API: POST /institution/:id/send
  public createSendCategory(institutionId: number, fields: any) {
    return this.http.post(this.endpointUrl + institutionId + '/send/' , fields)
    .pipe(
      map(( sendCategory: any ) => {
        // console.log(sendCategory);
        if ( sendCategory ) return sendCategory;
        else throw sendCategory;
      }),
      catchError(this.handleError),
    );
  }

  // API: PUT /institution/:id/send
  public updateSendCategory(institutionId: number, sendCategoryId: number, fields: any) {
    return this.http.put(this.endpointUrl + '/' + institutionId + '/send/' + sendCategoryId , fields)
    .pipe(
      map((data: any) => {
        if (data.status) {
          return true;
        } else {
          return false;
        }
      }),
      catchError(this.handleError),
    );
  }

  // API: GET /institutions/:id
  public getSendUserCategories(institutionId: number, learnerId: number ): Observable<any> {
    return this.http
      .get<any>(this.endpointUrl + institutionId + '/learner/' + learnerId + '/send/')
      .pipe(
        map(response => response.results),
        map(( sendCategories: any ) => {
          if ( sendCategories ) return sendCategories;
          else throw sendCategories;
        }),
        catchError(this.handleError),
    );
  }

   // API: POST /institution/:id/send
   public createSendUserCategory(institutionId: number, learnerId: number, fields: any) {
    return this.http.post(this.endpointUrl + institutionId + '/learner/' + learnerId + '/send/' , fields)
    .pipe(
      map(( sendUser: any ) => {
        if ( sendUser ) return sendUser;
        else throw sendUser;
      }),
      catchError(this.handleError),
    );
  }

  // API: PUT /institution/:id/send
  public updateSendUserCategory(institutionId: number, learnerId: number, fields: any) {
    return this.http.put(this.endpointUrl + institutionId + '/learner/' + learnerId + '/send/' , fields)
    .pipe(
      map((data: any) => {
        if (data.status) {
          return true;
        } else {
          return false;
        }
      }),
      catchError(this.handleError),
    );
  }


  private handleError(error: Response | any) {
    console.error('ApiInstitutionService::handleError', error);
    return ErrorObservable.create(error);
  }

}
