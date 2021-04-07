import { DataDisplayComponent } from '../control';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiCourseService } from '../../../../@core/data/api-course.service';
import { NbWindowService } from '@nebular/theme';
import { AuthService } from '../../../../@core/auth/auth.service';
import { ActivityConfig } from '../activity.config';

@Component({
  selector: 'ngx-course-read-activity-update',
  templateUrl: './course-read-activity-update.component.html',
  styleUrls: ['./course-read-activity-update.component.scss'],
})
export class CourseReadActivityUpdateComponent implements OnInit {
  course: any;
  id: number;
  loading: boolean = true;
  instruments: any[];
  addComponent: any = {}


  public instance: any;
  public fields = ActivityConfig.fields;

  @ViewChild('escClose', { read: TemplateRef }) escCloseTemplate: TemplateRef<HTMLElement>;

  constructor(
    private windowService: NbWindowService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private apiCourseService: ApiCourseService,
    private router: Router) {
    this.route.params.subscribe(params => {
      if (params['activityId'] != null) {
        const brokenURL = this.router.url.split("/")
        this.course = parseInt(brokenURL[3]);
        this.id = params['activityId']
      }
      else {
        console.log(params)
        // router.navigate(['../'], { relativeTo: this.route });
      }
    });
  }


  addInstrument(isAlternativeOf) {
    this.addComponent = { activityId: this.id, isAlternativeOf }

    this.addComponent.choices = this.instruments.filter(instrument => this.instance.inUseInstruments.indexOf(instrument.acronym) == -1)

    this.windowService.open(
      this.escCloseTemplate,
      { title: 'Instruments', hasBackdrop: true },
    );
  }

  enableDisableActivity(value): void {
    this.apiCourseService.putActivityActive(this.course, this.id, { enabled: value }).subscribe(response => { return })
  }


  handleDeleteInstrument(instrument, hasAlternative) {
    if (hasAlternative) {
      this.apiCourseService.deleteActivityInstrument(this.course, this.id, hasAlternative)
    }
    this.apiCourseService.deleteActivityInstrument(this.course, this.id, instrument).subscribe(response => {
      if (response) location.reload();
    })
  }

  handleAddInstrument(instrument, isAlternative) {
    const data = {
      "options": null,
      "instrument_id": instrument,
      "required": false,
      "active": false,
      "alternative_to": isAlternative || null
    }

    if (isAlternative) {
      this.apiCourseService.addActivityInstrument(this.course, this.id, data).subscribe(response => {
        if (response) location.reload();
      })
    }
    else this.apiCourseService.addActivityInstrument(this.course, this.id, data).subscribe(response => {
      if (response) location.reload();
    })
  }

  checkInstruments() {
    if (this.instruments?.length > this.instance.instruments?.length) return true
    return false
  }

  ngOnInit(): void {
    this.apiCourseService.getCourseActivity(this.course, this.id).subscribe(instance => {
      this.apiCourseService.getActivityInstrument(this.course, this.id).subscribe(instrumentsArray => {
        if (instrumentsArray.length > 0) {

          const instrumentsOrder = []
          instrumentsArray.map(instrument => {
            if (instrument.alternative_to) {
              const index = instrumentsOrder.findIndex(x => x.id == instrument.alternative_to)
              instrumentsOrder.splice(index + 1, 0, instrument);
              instrumentsOrder[index].hasAlternative = instrument.id
            }
            else instrumentsOrder.push(instrument)
          })
          instance.instruments = instrumentsOrder

          instance.inUseInstruments = instrumentsArray.map((list, z) => {
            instance.instruments[z].schema = JSON.parse(list.instrument.options_schema)

            return list.instrument.acronym
          })
        }
      })

      this.apiCourseService.getAllInstruments().subscribe(instrumentList => {
        this.instruments = instrumentList;
      });

      this.instance = instance;

      this.loading = false;
    });
  }

}
