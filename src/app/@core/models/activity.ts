import {Course} from './course';

interface Instrument {
  id: number;
  name: string;
  acronym: string;
  enabled: boolean;
  requires_enrolment: boolean;
  description: string;
  identity: boolean;
  originality: boolean;
  authorship: boolean;
  integrity: boolean;
  options_schema: any;
}

interface InstrumentConfiguration {
  id: number;
  options: any;
  active: boolean;
  alternative_to: number;
  instrument: Instrument;
}

export interface Activity {
    id: number;
    vle_id: number;
    vle_activity_type: string;
    vle_activity_id: string;
    name: string;
    description: string;
    start: Date;
    end: Date;
    course_id: number;
    course?: Course;
    instruments?: Array<InstrumentConfiguration>;
    user_instruments?: Array<InstrumentConfiguration>;
    enabled: boolean;
    conf: any;
    //   institution: Institution;
    //   created_at: Date;
    //   updated_at: Date;
    // roles: string;
    // date_joined: Date;
}
