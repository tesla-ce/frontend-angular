import { Institution } from './users';

export interface Ic {
  id: number;
  institution: Institution;
  version: string;
  valid_from: Date;
  created_at: Date;
  updated_at: Date;
  // roles: string;
  // date_joined: Date;
}