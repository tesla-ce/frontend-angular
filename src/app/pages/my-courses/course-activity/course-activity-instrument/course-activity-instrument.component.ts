import { Component, OnInit, Input, ViewChild, TemplateRef, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { angularMaterialRenderers } from '@jsonforms/angular-material';
import { NbDialogService, NbThemeService, NbWindowService } from '@nebular/theme';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../../../../@core/auth/auth.service';
import { ApiCourseService } from '../../../../@core/data/api-course.service';
import { InstitutionUser } from '../../../../@core/models/user';
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
  @Input() hasAvailableInstruments: boolean;
  @Input() activity: any;
  @Output() addAlternativeEvent = new EventEmitter<any>();
  @Output() deleteInstrumentEvent = new EventEmitter<any>();

  institutionId: number;
  courseId: number;
  activityId: number;

  renderers = angularMaterialRenderers;

  constructor(
    private windowService: NbWindowService,
    public translate: TranslateService,
    private apiCourseService: ApiCourseService,
    private router: Router,
    private authService: AuthService,
    private route: ActivatedRoute,
    private dialog: NbDialogService,
  ) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.courseId = params['courseId'];
      this.activityId = params['activityId'];
      this.authService.getUser().subscribe((user: InstitutionUser) => {
        if (user) {
          this.institutionId = user.institution.id;
        }
      });
    });
  }

  enableDisableInstrument(): void {
    this.apiCourseService.putInstrumentActive(this.institutionId, this.courseId,
      this.activityId,
      this.instrument.id,
      {
        active: !this.instrument.active,
        instrument_id: this.instrument.instrument.id,
        options: this.instrument.options,
        required: this.instrument.required,
      })
      .subscribe();
  }

  delete() {
    this.apiCourseService.deleteActivityInstrument(this.institutionId, this.courseId, this.activityId, this.instrument.id)
        .subscribe(response => {
          if (response) this.deleteInstrumentEvent.emit(this.instrument);
        });
  }

  addAlternative() {
    this.addAlternativeEvent.emit(this.instrument);
  }

  settings(): void {
    this.dialog.open(CourseActivityInstrumentSettingsComponent,
      { context: {
        instrument: this.instrument,
        institutionId: this.institutionId,
        courseId: this.courseId,
        activityId: this.activityId,
      } })
    .onClose.subscribe(data => {
    });
  }
}
