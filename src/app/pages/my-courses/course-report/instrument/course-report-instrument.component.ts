import { Component, OnInit, Input, ViewChild, TemplateRef } from '@angular/core';
import { NbWindowService } from '@nebular/theme';
import { TranslateService } from '@ngx-translate/core';
import { ApiCourseService } from '../../../../@core/data/api-course.service';

@Component({
  selector: 'ngx-course-activity-instrument',
  templateUrl: './course-activity-instrument.component.html',
  styleUrls: ['./course-activity-instrument.component.scss'],
})
export class CourseActivityInstrumentComponent implements OnInit {

  idAi: string;
  instruments: any;
  addComponent: any;
  windowRef: any;
  @Input() course: any;
  @Input() id: any;
  @Input() instance: any;
  @Input() type: string = 'show';
  @Input() reload: Function;

  @ViewChild('escClose', { read: TemplateRef }) escCloseTemplate: TemplateRef<HTMLElement>;

  constructor(
    private windowService: NbWindowService,
    public translate: TranslateService,
    private apiCourseService: ApiCourseService,
  ) {
    // this.route.params.subscribe(params => {
    //   if (params['activityId'] != null) {
    //     const brokenURL = this.router.url.split("/")
    //     this.course = parseInt(brokenURL[3]);
    //     this.id = params['activityId']
    //   }
    //   else {
    //     console.log(params)
    //     // router.navigate(['../'], { relativeTo: this.route });
    //   }
    // });
  }

  ngOnInit() {
    this.apiCourseService.getAllInstruments().subscribe(instrumentList => {
      this.instruments = instrumentList;
    });
  }


  addInstrument(isAlternativeOf) {
    this.addComponent = { activityId: this.id, isAlternativeOf };

    this.addComponent.choices = this.instruments.filter(instrument => this.instance.inUseInstruments.indexOf(instrument.acronym) === -1);

    this.windowRef = this.windowService.open(
      this.escCloseTemplate,
      { title: 'Instruments', hasBackdrop: true },
    );
  }


  enableDisableInstrument(instrument): void {
    this.apiCourseService.putInstrumentActive(this.course,
      this.id,
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
      this.apiCourseService.deleteActivityInstrument(this.course, this.id, hasAlternative)
        .subscribe(response => {
          if (response) this.reload();
        });
    }
    this.apiCourseService.deleteActivityInstrument(this.course, this.id, instrument)
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
      this.apiCourseService.addActivityInstrument(this.course, this.id, data).subscribe(response => {
        if (response) this.reload();
      });
    } else this.apiCourseService.addActivityInstrument(this.course, this.id, data).subscribe(response => {
      if (response) this.reload();
    });

    this.windowRef.close();
  }

  checkInstruments() {
    if (this.instruments?.length > this.instance.instruments?.length) return true;
    return false;
  }


}
