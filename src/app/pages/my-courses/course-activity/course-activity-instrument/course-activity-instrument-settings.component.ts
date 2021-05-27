import { Component, OnInit, Input, ViewChild, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { angularMaterialRenderers } from '@jsonforms/angular-material';
import { NbDialogRef, NbWindowService } from '@nebular/theme';
import { TranslateService } from '@ngx-translate/core';
import { ApiCourseService } from '../../../../@core/data/api-course.service';

@Component({
  selector: 'ngx-course-activity-instrument-settings',
  templateUrl: './course-activity-instrument-settings.component.html',
  styleUrls: ['./course-activity-instrument-settings.component.scss'],
})
export class CourseActivityInstrumentSettingsComponent implements OnInit {

  loading: boolean = true;
  @Input() instrument: any;
  courseId: any;
  activityId: any;

  renderers = angularMaterialRenderers;

  constructor(
    public translate: TranslateService,
    private apiCourseService: ApiCourseService,
    private route: ActivatedRoute,
    protected ref: NbDialogRef<CourseActivityInstrumentSettingsComponent>,
  ) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.courseId = params['courseId'];
      this.activityId = params['activityId'];
    });
  }

  dismiss() {
    this.ref.close();
  }

  save() {
    console.log("SAVE INSTRUMENT - NOT IMPLEMENTED YET");
    this.ref.close();
  }
}
