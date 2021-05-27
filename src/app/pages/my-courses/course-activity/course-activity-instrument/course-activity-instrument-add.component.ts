import { Component, OnInit, Input, ViewChild, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { angularMaterialRenderers } from '@jsonforms/angular-material';
import { NbDialogRef, NbWindowService } from '@nebular/theme';
import { TranslateService } from '@ngx-translate/core';
import { ApiCourseService } from '../../../../@core/data/api-course.service';

@Component({
  selector: 'ngx-course-activity-instrument-add',
  templateUrl: './course-activity-instrument-add.component.html',
  styleUrls: ['./course-activity-instrument-add.component.scss'],
})
export class CourseActivityInstrumentAddComponent implements OnInit {

  loading: boolean = true;
  @Input() availableInstruments: any[];
  courseId: any;
  activityId: any;

  renderers = angularMaterialRenderers;

  constructor(
    public translate: TranslateService,
    private apiCourseService: ApiCourseService,
    private route: ActivatedRoute,
    protected ref: NbDialogRef<CourseActivityInstrumentAddComponent>,
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

  add(instrument) {
    console.log("ADD INSTRUMENT - NOT IMPLEMENTED YET");
    this.ref.close(instrument);
  }
}
