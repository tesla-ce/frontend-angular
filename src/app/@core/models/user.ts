import { Observable } from 'rxjs';

export interface Institution {
  acronym: string;
  id: number;
  name: string;
  is_admin: boolean;
}

export interface User {
  id: string;
  username: string;
  last_login: string;
  first_name: string;
  full_name: string;
  last_name: string;
  email: string;
  acronym: string;
  roles: string[];
  routes: string[];
  locale: string;
  consent: string;
  consent_accepted: string;
  consent_rejected: string;
  ic_status: string;
  is_superuser: string;
  is_staff: boolean;
  is_active: boolean;
  is_admin: boolean;
  date_joined: Date;
  groups: string[];
  user_permissions: string[];
}

export interface InstitutionUser extends User {
  uid: string;
  institution: Institution;
}

export abstract class UserProvider {
  abstract getCurrentUser(): Observable<InstitutionUser>;
}
