import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiCourseService } from '../../../../@core/data/api-course.service';
import { NbWindowService } from '@nebular/theme';
import { AuthService } from '../../../../@core/auth/auth.service';
import { CourseActivityConfig } from '../course-activity.config';
import { TranslateService } from '@ngx-translate/core';
import { Location } from '@angular/common';

@Component({
  selector: 'ngx-course-activity-read',
  templateUrl: './course-activity-read.component.html',
  styleUrls: ['./course-activity-read.component.scss'],
})
export class CourseActivityReadComponent implements OnInit {
  courseId: any;
  activityId: number;
  loading: boolean = true;

  public instance: any;
  public fields = CourseActivityConfig.fields;

  constructor(
    private windowService: NbWindowService,
    private route: ActivatedRoute,
    public translate: TranslateService,
    private location: Location,
    private authService: AuthService,
    private apiCourseService: ApiCourseService,
    private router: Router) {
    this.route.params.subscribe(params => {
      this.courseId = params['courseId'];
      this.activityId = params['activityId'];
    });
  }
  back() { this.location.back(); }

  reports() { this.router.navigate(['report'], { relativeTo: this.route }); }

  ngOnInit(): void {
    this.apiCourseService.getCourseActivity(this.courseId, this.activityId).subscribe(instance => {
      this.apiCourseService.getActivityInstrument(this.courseId, this.activityId).subscribe(instrumentsArray => {
        if (instrumentsArray.length > 0) {

          const instrumentsOrder = [];
          instrumentsArray.map(instrument => {
            if (instrument.alternative_to) {
              const index = instrumentsOrder.findIndex(x => x.id === instrument.alternative_to);
              instrumentsOrder.splice(index + 1, 0, instrument);
              instrumentsOrder[index].hasAlternative = instrument.id;
            } else instrumentsOrder.push(instrument);
          });
          instance.instruments = instrumentsOrder;

          instance.inUseInstruments = instrumentsArray.map((list, z) => {
            instance.instruments[z].schema = JSON.parse(list.instrument.options_schema);

            return list.instrument.acronym;
          });
        }
      });

      this.instance = instance;

      this.loading = false;
    });
  }

}
