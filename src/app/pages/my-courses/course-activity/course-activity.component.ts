import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiCourseService } from '../../../@core/data/api-course.service';
import { Course } from '../../../@core/models/course';
import { CourseConfig } from '../course.config';
import { TranslateService } from '@ngx-translate/core';
import { Location } from '@angular/common';
import { InstitutionUser } from '../../../@core/models/user';
import { AuthService } from '../../../@core/auth/auth.service';

@Component({
  selector: 'ngx-course-activity',
  templateUrl: './course-activity.component.html',
  styleUrls: ['./course-activity.component.scss'],
})
export class CourseActivityComponent implements OnInit {

  institutionId: number;
  courseId: number;
  loading = true;

  public instance: Course;
  public fields = CourseConfig.fields;

  constructor(
    private route: ActivatedRoute,
    public translate: TranslateService,
    private location: Location,
    private apiCourseService: ApiCourseService,
    private authService: AuthService,
    private router: Router) {
    this.route.params.subscribe(params => {
      if (params['courseId'] != null) {
        this.courseId = params['courseId'];
      } else {
        router.navigate(['../'], { relativeTo: this.route });
      }
    });
  }
  back() { this.location.back(); }


  ngOnInit(): void {
    this.authService.getUser().subscribe((user: InstitutionUser) => {
      if (user) {
        this.institutionId = user.institution.id;
        this.apiCourseService.getCourseById(this.institutionId, this.courseId).subscribe(instance => {
          this.instance = instance;
          this.loading = false;
        });
      }
    });
  }

}
