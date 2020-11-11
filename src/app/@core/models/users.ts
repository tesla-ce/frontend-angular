import { Observable } from 'rxjs';

export interface Institution {
  acronym: string;
  id: number;
  name: string;
  isAdmin: boolean;
}

export interface User {
  firstName: string;
  lastName: string;
  username: string;
  isAdmin: boolean;
  email: string;
  picture?: string;
  fullName: string;
  locale?: string;
  // roles: string;
  // date_joined: Date;
}

export interface InstitutionUser extends User {
  uid: string;
  institution: Institution;
}

export abstract class UserProvider {
  abstract getCurrentUser(): Observable<InstitutionUser>;
}
