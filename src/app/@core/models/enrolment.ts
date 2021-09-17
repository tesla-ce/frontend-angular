import { Observable } from 'rxjs';

export interface LearnerEnrolment {
  can_analyze__max: boolean;
  can_analyze__min: boolean;
  instrument_id: number;
  not_validated: any[];
  not_validated_count: number;
  pending: any[];
  pending_contributions: number;
  percentage__max: number;
  percentage__min: number;
}
