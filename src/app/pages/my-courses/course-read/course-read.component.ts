// import { DataDisplayComponent } from './control';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiCourseService } from '../../../@core/data/api-course.service';
import { Course } from '../../../@core/models/course';
import { CourseConfig } from '../course.config';
// import { angularMaterialRenderers } from '@jsonforms/angular-material';
// import { and, createAjv, isControl, rankWith, scopeEndsWith } from '@jsonforms/core';
import { NbWindowService } from '@nebular/theme';
import { AuthService } from '../../../@core/auth/auth.service';
import { Location } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { InstitutionUser } from '../../../@core/models/user';
import { dateFormat } from '../../../@core/utils/utils';

@Component({
  selector: 'ngx-course-read',
  templateUrl: './course-read.component.html',
  styleUrls: ['./course-read.component.scss'],
})
export class CourseReadComponent implements OnInit {
  id: number;
  loading: boolean = true;
  dateFormat = dateFormat;
  public instance: Course;
  public fields = CourseConfig.fields;

  constructor(
    private windowService: NbWindowService,
    private route: ActivatedRoute,
    private authService: AuthService,
    public translate: TranslateService,
    private location: Location,
    private apiCourseService: ApiCourseService,
    private router: Router) {
    this.route.params.subscribe(params => {
      if (params['courseId'] != null) {
        this.id = params['courseId'];
      } else {
        router.navigate(['../'], { relativeTo: this.route });
      }
    });
  }

  back() { this.location.back(); }

  ngOnInit(): void {
    this.authService.getUser().subscribe((user: InstitutionUser) => {
      if (user) {
        this.apiCourseService.getCourseById(user.institution.id, this.id).subscribe(instance => {
          this.instance = instance;
          this.loading = false;
        });
      }
    });
  }

}
