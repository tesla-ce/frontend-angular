import { Observable } from 'rxjs';

export interface Institution {
  acronym: string;
  id: number;
  name: string;
  is_admin: boolean;
  locale: string;
  learner_id?: string;
  disable_vle_learner_creation?: boolean;
  disable_vle_instructor_creation?: boolean;
  disable_vle_user_creation?: boolean;
  allow_learner_report?: boolean;
  allow_learner_audit?: boolean;
  allow_valid_audit?: boolean;
  external_ic?: boolean;
  allowed_domains?: string;
  uid?: string;
  roles?: string[];
}

export interface User {
  id: number;
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
  inst_admin: boolean;
  send_admin: boolean;
  data_admin: boolean;
  legal_admin: boolean;
  login_allowed: boolean;
  date_joined: Date;
  groups: string[];
  user_permissions: string[];
  institution?: Institution;
  institution_id?: number;
  uid?: string;
}

export interface InstitutionUser extends User {
  uid: string;
  institution: Institution;
  institutions: Institution[];
}

export abstract class UserProvider {
  abstract getCurrentUser(): Observable<InstitutionUser>;
}
