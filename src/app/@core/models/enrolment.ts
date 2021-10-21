import { Observable } from 'rxjs';

export interface LearnerEnrolment {
  can_analyse__max: boolean;
  can_analyse__min: boolean;
  instrument_id: number;
  not_validated: any[];
  not_validated_count: number;
  pending: any[];
  pending_contributions: number;
  percentage__max: number;
  percentage__min: number;
}
