import { Component, OnInit, Input, ViewChild, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { angularMaterialRenderers } from '@jsonforms/angular-material';
import { createAjv } from '@jsonforms/core';
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
  selectedInstrument: any = null;
  @Input() courseId: any;
  @Input() activityId: any;
  @Input() alternativeTo: any;
  jsonFormsData: any = {};

  renderers = angularMaterialRenderers;
  ajv = createAjv({useDefaults: true});

  constructor(
    public translate: TranslateService,
    private apiCourseService: ApiCourseService,
    private route: ActivatedRoute,
    protected ref: NbDialogRef<CourseActivityInstrumentAddComponent>,
  ) {
  }

  ngOnInit() {

  }

  dismiss() {
    this.ref.close();
  }

  select(instrument) {
    this.selectedInstrument = instrument;
  }

  back() {
    this.selectedInstrument = null;
    this.jsonFormsData = {};
  }

  save() {
    const data = {
      'options': JSON.stringify(this.jsonFormsData),
      'instrument_id': this.selectedInstrument.id,
      'required': false,
      'active': true,
      'alternative_to': this.alternativeTo ? this.alternativeTo.id : null,
    };

    this.apiCourseService.addActivityInstrument(this.courseId, this.activityId, data).subscribe(response => {
      this.ref.close(response);
    });
  }

}
