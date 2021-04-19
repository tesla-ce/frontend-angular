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

@Component({
  selector: 'ngx-course-activity',
  templateUrl: './course-activity.component.html',
  styleUrls: ['./course-activity.component.scss'],
})
export class CourseActivityComponent implements OnInit {
  id: number;
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
    private apiCourseService: ApiCourseService,
    private router: Router) {
    this.route.params.subscribe(params => {
      if (params['id'] != null) {
        this.id = params['id'];
      } else {
        router.navigate(['../'], { relativeTo: this.route });
      }
    });
  }

  ngOnInit(): void {
    this.apiCourseService.getCourseById(this.id).subscribe(instance => {
      this.instance = instance;
      this.loading = false;
    });
  }

}
