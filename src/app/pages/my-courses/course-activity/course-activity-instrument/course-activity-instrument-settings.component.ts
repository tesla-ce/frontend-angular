import { Component, OnInit, Input } from '@angular/core';
import { angularMaterialRenderers } from '@jsonforms/angular-material';
import { NbDialogRef } from '@nebular/theme';
import { TranslateService } from '@ngx-translate/core';
import { ApiCourseService } from '../../../../@core/data/api-course.service';

@Component({
  selector: 'ngx-course-activity-instrument-settings',
  templateUrl: './course-activity-instrument-settings.component.html',
  styleUrls: ['./course-activity-instrument-settings.component.scss'],
})
export class CourseActivityInstrumentSettingsComponent implements OnInit {

  loading = true;
  @Input() instrument: any;
  @Input() institutionId: any;
  @Input() courseId: any;
  @Input() activityId: any;
  data: any;

  renderers = angularMaterialRenderers;

  constructor(
    public translate: TranslateService,
    private apiCourseService: ApiCourseService,
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
