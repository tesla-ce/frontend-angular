// import { DataDisplayComponent } from '../control';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiCourseService } from '../../../../../@core/data/api-course.service';
import { NbWindowService } from '@nebular/theme';
import { AuthService } from '../../../../../@core/auth/auth.service';
import { CourseReportConfig } from '../course-report.config';
import { TranslateService } from '@ngx-translate/core';
import { Location } from '@angular/common';

@Component({
  selector: 'ngx-course-report-update',
  templateUrl: './course-report-update.component.html',
  styleUrls: ['./course-report-update.component.scss'],
})
export class CourseReportUpdateComponent implements OnInit {
  course: any;
  activity: any;
  id: number;
  loading: boolean = true;
  instruments: any[];
  addComponent: any = {};

  public instance: any;
  public fields = CourseReportConfig.fields;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private apiCourseService: ApiCourseService,
    public translate: TranslateService,
    private location: Location,
    private router: Router) {
    this.route.params.subscribe(params => {
      this.course = params['id'];
      this.id = params['reportId'];
      this.activity = params['activityId'];
    });
  }
  back() { this.location.back(); }

  enableDisableReport(value): void {
    // this.apiCourseService.putReportActivity(this.course, this.id, { enabled: value }).subscribe();
  }

  ngOnInit(): void {
    this.apiCourseService.getActivityReport(this.course, this.activity, this.id).subscribe(instance => {
      this.instance = instance;
      this.loading = false;
    });
  }

}
