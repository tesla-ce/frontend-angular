import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {BaseWidgetComponent} from '../base-widget.component';
import {Activity} from '../../../../../@core/models/activity';
import {Course} from '../../../../../@core/models/course';
import {
  NbDateService,
  NbSortDirection,
  NbSortRequest,
  NbTreeGridDataSource,
  NbTreeGridDataSourceBuilder,
} from '@nebular/theme';
import {DashboardService} from '../../../dashboard.service';
import {LearnerEnrolment} from '../../../../../@core/models/enrolment';

interface TreeNode<T> {
  data: T;
  children?: TreeNode<T>[];
  expanded?: boolean;
}

export interface InstrumentStatus {
  id: number;
  acronym: string;
  status: string;
}

type InstrumentAcronym = 'fr' | 'ks' | 'plag' | 'vr';
interface CourseActivityEntry {
  id: number;
  name: string;
  start: Date | null;
  end: Date | null;
  type: 'course' | 'activity';
  roles?: Array<'LEARNER' | 'INSTRUCTOR'>;
  description: string;
  enrolment: object;
  instruments?: Array<InstrumentAcronym>;
}

export interface WidgetData {
  component: string;
  name: string;
}

@Component({
  selector: 'ngx-dashboard-widget-courses',
  styleUrls: [],
  templateUrl: './courses-widget.component.html',
})
export class CoursesWidgetComponent extends BaseWidgetComponent implements OnInit {
  courses: Array<Course> = [];
  private course_data: TreeNode<CourseActivityEntry>[] = [];
  private enrolment_data: object = {};

  customColumn = 'name';
  defaultColumns = [ 'start', 'end', 'instruments' ];
  allColumns = [ this.customColumn, ...this.defaultColumns ];
  dataSource: NbTreeGridDataSource<CourseActivityEntry>;
  sortColumn: string;
  sortDirection: NbSortDirection = NbSortDirection.NONE;

  constructor(
    public translate: TranslateService,
    public dashService: DashboardService,
    private dataSourceBuilder: NbTreeGridDataSourceBuilder<CourseActivityEntry>,
  ) {
    super(translate, dashService);
  }

  private initialize_enrolment_status() {
    this.enrolment_data = {
      'fr': {
        id: 1,
          acronym: 'fr',
          status: 'error',
      },
      'ks': {
        id: 2,
          acronym: 'ks',
          status: 'error',
      },
      'vr': {
        id: 3,
          acronym: 'vr',
          status: 'error',
      },
      'fa': {
        id: 4,
          acronym: 'fa',
          status: 'error',
      },
      'plag': {
        id: 5,
          acronym: 'plag',
          status: 'ok',
      },
    };
  }

  ngOnInit() {
    super.ngOnInit();
    this.initialize_enrolment_status();
    this.dashService.getUserActiveActivities().subscribe(activities => {
      if (activities) {
        this.dashService.getUserEnrolment().subscribe(enrolment => {
          this.initialize_enrolment_status();
          this.updateData(activities, enrolment);
          this.dataSource = this.dataSourceBuilder.create(this.course_data);
        });
      }
    });
  }

   updateSort(sortRequest: NbSortRequest): void {
    this.sortColumn = sortRequest.column;
    this.sortDirection = sortRequest.direction;
  }

  getSortDirection(column: string): NbSortDirection {
    if (this.sortColumn === column) {
      return this.sortDirection;
    }
    return NbSortDirection.NONE;
  }

  updateData(activities: Array<Activity>, enrolment: Array<LearnerEnrolment>) {
    const course_dict = {};
    const instruments = ['fr', 'ks', 'vr', 'fa', 'plag'];
    for (const inst_enrolment of enrolment) {
      let status: string;
      if (inst_enrolment.can_analyse__min) {
        status = 'ok';
      } else if (inst_enrolment.can_analyse__max) {
        status = 'warning';
      } else  {
        status = 'error';
      }
      const acronym = instruments[inst_enrolment.instrument_id - 1];
      this.enrolment_data[acronym] = {
        id: inst_enrolment.instrument_id,
        acronym,
        status,
      };
    }
    for (const activity of activities) {
      if (!course_dict.hasOwnProperty(activity.course_id)) {
        // Add a new course
        course_dict[activity.course_id] = {
          data: {
            id: activity.course.id,
            name: activity.course.code,
            start: activity.course.start,
            end: activity.course.end,
            description: activity.course.description,
            roles: activity.course.user_roles,
            enrolment: this.enrolment_data,
            type: 'course',
          },
          children: [],
        };
      }
      // Extract the instruments for current user
      const user_instruments = activity.user_instruments.map(inst => inst.instrument.acronym);
      // Add the activity to the course
      course_dict[activity.course_id].children.push({
        data: {
          id: activity.id,
          name: activity.name,
          start: activity.start,
          end: activity.end,
          description: activity.description,
          type: 'activity',
          enrolment: this.enrolment_data,
          instruments: user_instruments,
        },
      });
    }
    this.course_data = Object.values(course_dict);
  }

  getShowOn(index: number) {
    const minWithForMultipleColumns = 400;
    const nextColumnStep = 100;
    return minWithForMultipleColumns + (nextColumnStep * index);
  }
}

@Component({
  selector: 'ngx-activity-icon',
  template: `
    <nb-tree-grid-row-toggle [expanded]="expanded" *ngIf="isCourse(); else fileIcon">
    </nb-tree-grid-row-toggle>
    <ng-template #fileIcon>
      <nb-icon icon="file-text-outline"></nb-icon>
    </ng-template>
    <nb-icon *ngIf="isCourse() && isInstructor()" icon="role-instructor" pack="tesla"></nb-icon>
    <nb-icon *ngIf="isCourse() && isLearner()" icon="role-learner" pack="tesla"></nb-icon>
  `,
})
export class ActivityIconComponent {
  @Input() type: 'course' | 'activity';
  @Input() expanded: boolean;
  @Input() roles: Array<'LEARNER' | 'INSTRUCTOR'>;

  isCourse(): boolean {
    return this.type === 'course';
  }
  isLearner(): boolean {
    return this.roles.includes('LEARNER');
  }
  isInstructor(): boolean {
    return this.roles.includes('INSTRUCTOR');
  }
}

@Component({
  selector: 'ngx-instruments-cell',
  template: `
    <div *ngFor="let instrument of instruments">
      <nb-icon *ngIf="isValid(instrument); else withStatus" icon="instrument-{{instrument}}" pack="tesla"></nb-icon>
      <ng-template #withStatus>
        <nb-icon icon="instrument-{{instrument}}" [attr.status]="getStatus(instrument)" pack="tesla"></nb-icon>
      </ng-template>
    </div>
  `,
  styles: [
    ':host {  display: flex; position: relative; height: 100%;}',
    ':host nb-icon {font-size: 2rem; margin-right: 0.5rem;}'],
})
export class InstrumentIconsComponent implements OnInit {
  @Input() row: TreeNode<CourseActivityEntry>;
  instruments: Array<InstrumentAcronym>;
  enrolment: object;

  ngOnInit() {
    this.enrolment = this.row.data['enrolment'];
    if (this.row.data.type === 'course') {
      this.instruments = this.getCourseInstruments();
    } else {
      this.instruments = this.row.data['instruments'];
    }
  }

  isValid(instrument: string): boolean {
    return this.enrolment[instrument].status === 'ok';
  }

  getStatus(instrument: string): string {
    return this.enrolment[instrument].status;
  }

  getCourseInstruments(): Array<InstrumentAcronym> {
    let courseInstruments: Array<InstrumentAcronym> = [];

    for (const activity of this.row.children) {
      if (activity.data.instruments) {
        courseInstruments = [...courseInstruments, ...activity.data.instruments];
      }
    }

    const unique_instruments = new Set(courseInstruments);
    return [...unique_instruments];
  }
}
