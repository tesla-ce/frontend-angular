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
import { dateFormat } from '../../../../@core/utils/utils';

@Component({
  selector: 'ngx-course-activity-read',
  templateUrl: './course-activity-read.component.html',
  styleUrls: ['./course-activity-read.component.scss'],
})
export class CourseActivityReadComponent implements OnInit {
  institutionId: number;
  courseId: number;
  activityId: number;
  loading: boolean = true;
  activityInstruments: any[];
  activityMainInstruments: any[];
  activityAltInstruments: any[];
  dateFormat = dateFormat;

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
          });
          this.instance = instance;
          this.loading = false;
        });
      }
    });
  }
}
