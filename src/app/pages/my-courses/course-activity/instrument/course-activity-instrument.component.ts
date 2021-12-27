import { Component, OnInit, Input, ViewChild, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { angularMaterialRenderers } from '@jsonforms/angular-material';
import { NbWindowService } from '@nebular/theme';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../../../../@core/auth/auth.service';
import { ApiCourseService } from '../../../../@core/data/api-course.service';
import { InstitutionUser } from '../../../../@core/models/user';

@Component({
  selector: 'ngx-course-activity-instrument',
  templateUrl: './course-activity-instrument.component.html',
  styleUrls: ['./course-activity-instrument.component.scss'],
})
export class CourseActivityInstrumentComponent implements OnInit {

  loading = true;
  idAi: string;
  instruments: any;
  addComponent: any;
  windowRef: any;
  @Input() course: any;
  @Input() id: any;
  @Input() instance: any;
  @Input() activityInstruments: any[];
  @Input() allInstruments: any[];
  @Input() type = 'show';
  @Input() reload: any;

  institutionId: number;
  courseId: number;
  activityId: number;

  @ViewChild('escClose', { read: TemplateRef }) escCloseTemplate: TemplateRef<HTMLElement>;

  renderers = angularMaterialRenderers;
  dataschema: any =  {
    'type': 'object',
    'properties': {
      'online': {
        'type': 'boolean',
        'title': 'Analyze learner identity during the assessment',
        'default': true,
      },
      'offline': {
        'type': 'boolean',
        'title': 'Analyze learner identity on the delivered assessment',
        'default': false,
      },
    },
  };

  data: any = {
    'online': true,
    'offline': false,
  };

  constructor(
    private windowService: NbWindowService,
    public translate: TranslateService,
    private authService: AuthService,
    private apiCourseService: ApiCourseService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.courseId = params['courseId'];
      this.activityId = params['activityId'];
      this.authService.getUser().subscribe((user: InstitutionUser) => {
        if (user) {
          this.institutionId = user.institution.id;
          this.apiCourseService.getAllInstruments(this.institutionId).subscribe(instrumentList => {
            this.instruments = instrumentList;
            this.loading = false;
          });
        }
      });
    });
  }

  addInstrument(isAlternativeOf) {
    this.addComponent = { activityId: this.activityId, isAlternativeOf };

    this.addComponent.choices = this.instruments.filter(instrument => this.instance.inUseInstruments.indexOf(instrument.acronym) === -1);

    this.windowRef = this.windowService.open(
      this.escCloseTemplate,
      { title: 'Instruments', hasBackdrop: true },
    );
  }


  enableDisableInstrument(instrument): void {
    this.apiCourseService.putInstrumentActive(this.institutionId, this.course,
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


  handleDeleteInstrument(instrument, hasAlternative) {
    if (hasAlternative) {
      this.apiCourseService.deleteActivityInstrument(this.institutionId, this.course, this.activityId, hasAlternative)
        .subscribe(response => {
          if (response) this.reload();
        });
    }
    this.apiCourseService.deleteActivityInstrument(this.institutionId, this.course, this.activityId, instrument)
      .subscribe(response => {
        if (response) this.reload();
      });
  }

  handleAddInstrument(instrument, isAlternative) {
    const data = {
      'options': null,
      'instrument_id': instrument,
      'required': false,
      'active': true,
      'alternative_to': isAlternative || null,
    };

    if (isAlternative) {
      this.apiCourseService.addActivityInstrument(this.institutionId, this.course, this.activityId, data).subscribe(response => {
        if (response) this.reload();
      });
    } else this.apiCourseService.addActivityInstrument(this.institutionId, this.course, this.activityId, data).subscribe(response => {
      if (response) this.reload();
    });

    this.windowRef.close();
  }

  checkInstruments() {
    if (this.instruments?.length > this.instance.instruments?.length) return true;
    return false;
  }


}
