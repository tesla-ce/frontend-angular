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

@Component({
  selector: 'ngx-course-activity-update',
  templateUrl: './course-activity-update.component.html',
  styleUrls: ['./course-activity-update.component.scss'],
})
export class CourseActivityUpdateComponent implements OnInit {
  course: any;
  courseId: number;
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
      this.course = params['courseId'];
      this.courseId = params['activityId'];
    });
  }
  back() { this.location.back(); }

  enableDisableActivity(value): void {
    this.apiCourseService.putActivityActive(this.course, this.courseId, { enabled: value }).subscribe();
  }

  getAlternative(mainInstrumentId): any {
    return this.activityAltInstruments
    .filter(activityAltInstrument => activityAltInstrument.alternative_to === mainInstrumentId)[0];
  }

  ngOnInit(): void {
    this.apiCourseService.getCourseActivity(this.course, this.courseId).subscribe(instance => {
      this.apiCourseService.getActivityInstrument(this.course, this.courseId).subscribe(activityInstruments => {
        this.activityInstruments = activityInstruments;
        this.activityMainInstruments = activityInstruments.filter(ins => ins.alternative_to === null);
        this.activityAltInstruments = activityInstruments.filter(ins => ins.alternative_to !== null);
        this.activityAltInstruments.map(altInstrument => {
          this.activityMainInstruments.filter(ins => ins.id === altInstrument.alternative_to)[0].alternative = altInstrument;
        });
        this.apiCourseService.getAllInstruments().subscribe(allInstruments => {
          this.allInstruments = allInstruments;
          this.availableInstruments = this.allInstruments.filter(ins => {
            return this.activityInstruments.map(item => item.instrument.acronym).indexOf(ins.acronym) === -1;
          });
        });
      });

      this.instance = instance;
      this.loading = false;
    });
  }

  addInstrument(): void {
    console.log("HANDLE OPEN SETTINGS");
    this.dialog.open(CourseActivityInstrumentAddComponent, { context: { availableInstruments: this.availableInstruments } })
    .onClose.subscribe(data => {
      // console.log(data)
    });
  }

}
