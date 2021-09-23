export interface Institution {
  acronym: string;
  id: number;
  name: string;
  disable_vle_learner_creation?: boolean;
  disable_vle_instructor_creation?: boolean;
  disable_vle_user_creation?: boolean;
  allow_learner_report?: boolean;
  allow_learner_audit?: boolean;
  allow_valid_audit?: boolean;
}

