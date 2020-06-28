import { of as observableOf,  Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { InstitutionUser } from '../models/users';


export abstract class InstitutionUserData {
  abstract getUser(institutionuid: string): Observable<InstitutionUser>;
  abstract getUsers(): Observable<InstitutionUser[]>;
  abstract getRecentUsers(): Observable<InstitutionUser[]>;
}

@Injectable()
export class UserService extends InstitutionUserData {

  getUser(uid: string): Observable<any> {
    return observableOf(null);
  }

  getUsers(): Observable<InstitutionUser[]> {
    return observableOf(null);
  }

  getRecentUsers(): Observable<InstitutionUser[]> {
    return observableOf(null);
  }
}
