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
import { LearnerEnrolment } from '../models/enrolment';

@Injectable({
  providedIn: 'root',
})
export class ApiEnrolmentService {

  apiUrl: string;
  endpoint: string = '/institution/';
  endpointUrl: string;
  institution: Institution;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private envService: EnvService) {
    this.apiUrl = envService.apiUrl;
    this.endpointUrl = this.apiUrl + this.endpoint;

  }

  public getEnrolment(userId: number, institutionId): Observable<LearnerEnrolment[]> {
    // https://demo.tesla-project.eu/api/v2/institution/{parent_lookup_institution_id}/learner/{id}/enrolment/
    return this.http
      .get(`${this.endpointUrl}${institutionId}/learner/${userId}/enrolment/`)
      .pipe(
        map((learnerEnrolment: LearnerEnrolment[]) => {
          if (learnerEnrolment) return learnerEnrolment;
          else throw learnerEnrolment;
        }),
        catchError(this.handleError),
      );
  }

  private handleError(error: Response | any) {
    console.error('ApiInstitutionService::handleError', error);
    return ErrorObservable.create(error);
  }

}
