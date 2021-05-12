import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiCourseService } from '../../../../../@core/data/api-course.service';
import { NbWindowService } from '@nebular/theme';
import { AuthService } from '../../../../../@core/auth/auth.service';
import { CourseReportConfig } from '../course-report.config';
import { TranslateService } from '@ngx-translate/core';
import { Location } from '@angular/common';

@Component({
  selector: 'ngx-course-report-read',
  templateUrl: './course-report-read.component.html',
  styleUrls: ['./course-report-read.component.scss'],
})
export class CourseReportReadComponent implements OnInit {
  course: any;
  id: number;
  loading: boolean = true;

  public instance: any;
  public fields = CourseReportConfig.fields;

  constructor(
    private windowService: NbWindowService,
    private route: ActivatedRoute,
    public translate: TranslateService,
    private location: Location,
    private authService: AuthService,
    private apiCourseService: ApiCourseService,
    private router: Router) {
    this.route.params.subscribe(params => {
      this.course = params['id'];
      this.id = params['reportId'];
    });
  }
  back() { this.location.back(); }

  ngOnInit(): void {
    this.apiCourseService.getCourseActivity(this.course, this.id).subscribe(instance => {

      this.instance = instance;

      this.loading = false;
    });
  }

}
