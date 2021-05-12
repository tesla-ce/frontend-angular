// import { DataDisplayComponent } from './control';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiCourseService } from '../../../../@core/data/api-course.service';
import { Course } from '../../../../@core/models/course';
import { CourseConfig } from '../../course.config';
// import { angularMaterialRenderers } from '@jsonforms/angular-material';
// import { and, createAjv, isControl, rankWith, scopeEndsWith } from '@jsonforms/core';
import { NbWindowService } from '@nebular/theme';

import { TranslateService } from '@ngx-translate/core';
import { Location } from '@angular/common';
import { AuthService } from '../../../../@core/auth/auth.service';

@Component({
  selector: 'ngx-course-report',
  templateUrl: './course-report.component.html',
  styleUrls: ['./course-report.component.scss'],
})
export class CourseReportComponent implements OnInit {
  courseId: number;
  loading: boolean = true;

  public instance: Course;
  public fields = CourseConfig.fields;

  // renderers = [
  //   ...angularMaterialRenderers,
  //   {
  //     renderer: DataDisplayComponent,
  //     tester: rankWith(
  //       6,
  //       and(
  //         isControl,
  //         scopeEndsWith('___data')
  //       )
  //     )
  //   },
  // ];
  // ajv = createAjv({
  //   schemaId: 'auto',
  //   allErrors: true,
  //   jsonPointers: true,
  //   errorDataPath: 'property'
  // });

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
        this.courseId = params['courseId'];
      } else {
        router.navigate(['../'], { relativeTo: this.route });
      }
    });
  }
  back() { this.location.back(); }


  ngOnInit(): void {
    this.apiCourseService.getCourseById(this.courseId).subscribe(instance => {
      this.instance = instance;
      this.loading = false;
    });
  }

}