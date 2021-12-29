import { Component, OnInit, Input } from '@angular/core';
import { angularMaterialRenderers } from '@jsonforms/angular-material';
import { createAjv } from '@jsonforms/core';
import { NbDialogRef } from '@nebular/theme';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../../../../@core/auth/auth.service';
import { ApiCourseService } from '../../../../@core/data/api-course.service';
import { InstitutionUser } from '../../../../@core/models/user';

@Component({
  selector: 'ngx-course-activity-instrument-add',
  templateUrl: './course-activity-instrument-add.component.html',
  styleUrls: ['./course-activity-instrument-add.component.scss'],
})
export class CourseActivityInstrumentAddComponent implements OnInit {

  institutionId: number;
  loading = true;
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
    private authService: AuthService,
    protected ref: NbDialogRef<CourseActivityInstrumentAddComponent>,
  ) {
  }

  ngOnInit() {
    this.authService.getUser().subscribe((user: InstitutionUser) => {
      if (user) {
        this.institutionId = user.institution.id;
      }
    });
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

    this.apiCourseService.addActivityInstrument(this.institutionId, this.courseId, this.activityId, data).subscribe(response => {
      this.ref.close(response);
    });
  }

}
