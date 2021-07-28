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
  @Input() institutionId: any;
  @Input() courseId: any;
  @Input() activityId: any;
  data: any;

  renderers = angularMaterialRenderers;

  constructor(
    public translate: TranslateService,
    private apiCourseService: ApiCourseService,
    private route: ActivatedRoute,
    protected ref: NbDialogRef<CourseActivityInstrumentSettingsComponent>,
  ) {
  }

  ngOnInit() {
    this.data = this.instrument.options;
  }

  dismiss() {
    this.ref.close();
  }

  save() {
    this.apiCourseService.putInstrumentActive(
      this.institutionId,
      this.courseId,
      this.activityId,
      this.instrument.id,
      {
        active: this.instrument.active,
        options: this.data,
        instrument_id: this.instrument.instrument.id,
        required: this.instrument.required,
      })
      .subscribe(() => {
        this.instrument.options = this.data;
        this.ref.close();
      });
  }
}
