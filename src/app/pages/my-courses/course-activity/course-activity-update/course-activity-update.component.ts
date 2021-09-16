// import { DataDisplayComponent } from '../control';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiCourseService } from '../../../../@core/data/api-course.service';
import { NbDialogService, NbThemeService, NbWindowService } from '@nebular/theme';
import { AuthService } from '../../../../@core/auth/auth.service';
import { CourseActivityConfig } from '../course-activity.config';
import { TranslateService } from '@ngx-translate/core';
import { Location } from '@angular/common';
import { CourseActivityInstrumentAddComponent } from '../course-activity-instrument/course-activity-instrument-add.component';
import { InstitutionUser } from '../../../../@core/models/user';

@Component({
  selector: 'ngx-course-activity-update',
  templateUrl: './course-activity-update.component.html',
  styleUrls: ['./course-activity-update.component.scss'],
})
export class CourseActivityUpdateComponent implements OnInit {
  institutionId: number;
  courseId: number;
  activityId: number;
  loading: boolean = true;
  allInstruments: any[];
  availableInstruments: any[];
  activityInstruments: any[];
  activityMainInstruments: any[];
  activityAltInstruments: any[];
  addComponent: any = {};
  data: any = {};

  public instance: any;
  public fields = CourseActivityConfig.fields;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private apiCourseService: ApiCourseService,
    public translate: TranslateService,
    private location: Location,
    private dialog: NbDialogService,
    private router: Router) {
    this.route.params.subscribe(params => {
      this.courseId = params['courseId'];
      this.activityId = params['activityId'];
    });
  }
  back() { this.location.back(); }

  enableDisableActivity(value): void {
    this.apiCourseService.putActivityActive(this.institutionId, this.courseId, this.activityId, { enabled: value }).subscribe();
  }

  getAlternative(mainInstrumentId): any {
    return this.activityAltInstruments
    .filter(activityAltInstrument => activityAltInstrument.alternative_to === mainInstrumentId)[0];
  }

  ngOnInit(): void {
    this.authService.getUser().subscribe((user: InstitutionUser) => {
      if (user) {
        this.institutionId = user.institution.id;
        this.apiCourseService.getCourseActivity(this.institutionId, this.courseId, this.activityId).subscribe(instance => {
          this.apiCourseService.getActivityInstrument(this.institutionId, this.courseId, this.activityId).subscribe(activityInstruments => {
            this.activityInstruments = activityInstruments;
            this.activityMainInstruments = activityInstruments.filter(ins => ins.alternative_to === null);
            this.activityAltInstruments = activityInstruments.filter(ins => ins.alternative_to !== null);
            this.activityAltInstruments.map(altInstrument => {
              this.activityMainInstruments.filter(ins => ins.id === altInstrument.alternative_to)[0].alternative = altInstrument;
            });
            this.apiCourseService.getAllInstruments(this.institutionId).subscribe(allInstruments => {
              this.allInstruments = allInstruments;
              this.availableInstruments = this.allInstruments.filter(ins => {
                return this.activityInstruments.map(item => item.instrument.acronym).indexOf(ins.acronym) === -1;
              });
              this.instance = instance;
              this.loading = false;
            });
          });
        });
      }
    });
  }

  addInstrument(): void {
    this.dialog.open(
      CourseActivityInstrumentAddComponent, {
        context: {
          availableInstruments: this.availableInstruments,
          courseId: this.courseId,
          activityId: this.activityId,
        },
      })
    .onClose.subscribe(instrument => {
      if (instrument) {
        this.activityMainInstruments = [instrument, ...this.activityMainInstruments];
        this.availableInstruments = this.availableInstruments.filter(item => item.id !== instrument.instrument.id);
      }
    });
  }

  deleteInstrument(instrument): void {
    const alternative = this.getAlternative(instrument.id);
    if (alternative) {
      this.activityAltInstruments = this.activityAltInstruments.filter(item => item.id !== alternative.id);
      this.availableInstruments = [alternative.instrument, ...this.availableInstruments];
    }
    this.activityMainInstruments = this.activityMainInstruments.filter(item => item.id !== instrument.id);
    instrument.instrument.options_schema = JSON.parse(instrument.instrument.options_schema);
    this.availableInstruments = [instrument.instrument, ...this.availableInstruments];
  }

  addAlternative(alternativeTo): void {
    this.dialog.open(
      CourseActivityInstrumentAddComponent, {
        context: {
          availableInstruments: this.availableInstruments,
          courseId: this.courseId,
          activityId: this.activityId,
          alternativeTo: alternativeTo,
        },
      })
    .onClose.subscribe(instrument => {
      if (instrument) {
        this.activityAltInstruments = [instrument, ...this.activityAltInstruments];
        this.availableInstruments = this.availableInstruments.filter(item => item.id !== instrument.instrument.id);
      }
    });
  }

  deleteAlternative(instrument): void {
    this.activityAltInstruments = this.activityAltInstruments.filter(item => item.id !== instrument.id);
    this.availableInstruments = [instrument.instrument, ...this.availableInstruments];
  }
}
