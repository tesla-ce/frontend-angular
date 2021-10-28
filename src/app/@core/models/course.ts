import {Activity} from './activity';
import { VLE } from './vle';

export interface Course {
    id: number;
    code: string;
    description: string;
    start: Date;
    end: Date;
    vle?: VLE;
    vle_course_id: string;
    enabled: boolean;
    user_roles?: Array<'LEARNER' | 'INSTRUCTOR'>;
    activities?: Array<Activity>;
}
