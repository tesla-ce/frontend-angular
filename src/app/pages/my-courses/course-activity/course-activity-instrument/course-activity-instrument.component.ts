import { Component, OnInit, Input, ViewChild, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { angularMaterialRenderers } from '@jsonforms/angular-material';
import { NbDialogService, NbWindowService } from '@nebular/theme';
import { TranslateService } from '@ngx-translate/core';
import { ApiCourseService } from '../../../../@core/data/api-course.service';
import { CourseActivityInstrumentSettingsComponent } from './course-activity-instrument-settings.component';

@Component({
  selector: 'ngx-course-activity-instrument',
  templateUrl: './course-activity-instrument.component.html',
  styleUrls: ['./course-activity-instrument.component.scss'],
})
export class CourseActivityInstrumentComponent implements OnInit {

  loading: boolean = true;
  @Input() instrument: any;
  @Input() isAlternative: boolean;
  @Input() hasAlternative: boolean;
  @Input() activity: any;

  courseId: any;
  activityId: any;

  renderers = angularMaterialRenderers;

  constructor(
    private windowService: NbWindowService,
    public translate: TranslateService,
    private apiCourseService: ApiCourseService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: NbDialogService,
  ) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.courseId = params['courseId'];
      this.activityId = params['activityId'];
    });
  }

  enableDisableInstrument(instrument): void {
    this.apiCourseService.putInstrumentActive(this.courseId,
      this.activityId,
      instrument.id,
      {
        active: !instrument.active,
        instrument_id: instrument.instrument.id,
        options: instrument.options,
        required: instrument.required,
      })
      .subscribe();
  }

  delete(instrument, hasAlternative) {
    if (hasAlternative) {
      this.apiCourseService.deleteActivityInstrument(this.courseId, this.activityId, instrument.id)
        .subscribe(response => {
          if (response) console.log("DELETE INSTRUMENT - NOT IMPLEMENTED YET");
        });
    }
    this.apiCourseService.deleteActivityInstrument(this.courseId, this.activityId, instrument.id)
      .subscribe(response => {
        if (response) console.log("DELETE INSTRUMENT - NOT IMPLEMENTED YET");
      });
  }

  addAlternative() {
    console.log("ADD ALTERNATIVE INSTRUMENT - NOT IMPLEMENTED YET");
  }

  settings(): void {
    console.log("HANDLE OPEN SETTINGS");
    this.dialog.open(CourseActivityInstrumentSettingsComponent, { context: { instrument: this.instrument } })
    .onClose.subscribe(data => {
      // console.log(data)
    });
  }
}
