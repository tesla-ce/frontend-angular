import { DataDisplayComponent } from './control';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiCourseService } from '../../../@core/data/api-course.service';
import { Course } from '../../../@core/models/course';
import { CourseConfig } from '../course.config';
import { angularMaterialRenderers } from '@jsonforms/angular-material';
import { and, createAjv, isControl, rankWith, scopeEndsWith } from '@jsonforms/core';
import { NbWindowService } from '@nebular/theme';
import { ListCellActionsComponent } from '../../../crud/list/list-cell-actions.component';
import { AuthService } from '../../../@core/auth/auth.service';

@Component({
  selector: 'ngx-course-read',
  templateUrl: './course-read.component.html',
  styleUrls: ['./course-read.component.scss'],
})
export class CourseReadComponent implements OnInit {
  id: number;
  activities: any[] = []
  instruments: any[]

  // [{
  //   "name": "Face Recognition", "acronym": "fr", "description": "Verify learner identity by means of face attributes.",
  //   "id": 1,
  // }, {
  //   "id": 2,
  //   "name": "Keystroke Dynamics Recognition",
  //   "acronym": "ks", "description": "Verify learner identity by means of keystroke patterns."
  // }, {
  //   "id": 3,
  //   "name": "Voice Recognition",
  //   "acronym": "vr", "description": "Verify learner identity by means of voice attributes.",
  // }, {
  //   "id": 4,
  //   "name": "Forensic Analysis",
  //   "acronym": "fa", "description": "Verify learner identity by means of writing style patterns."
  // }]
  loading: boolean = true;
  addComponent: any = {}
  public instance: Course;
  public fields = CourseConfig.fields;
  renderers = [
    ...angularMaterialRenderers,
    {
      renderer: DataDisplayComponent,
      tester: rankWith(
        6,
        and(
          isControl,
          scopeEndsWith('___data')
        )
      )
    },
  ];
  ajv = createAjv({
    schemaId: 'auto',
    allErrors: true,
    jsonPointers: true,
    errorDataPath: 'property'
  });

  @ViewChild('escClose', { read: TemplateRef }) escCloseTemplate: TemplateRef<HTMLElement>;


  constructor(
    private windowService: NbWindowService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private apiCourseService: ApiCourseService,
    private router: Router) {
    this.route.params.subscribe(params => {
      if (params['id'] != null) {
        this.id = params['id'];
      } else {
        router.navigate(['../'], { relativeTo: this.route });
      }
    });
  }

  addInstrument(actIndex, isAlternativeOf) {
    this.addComponent = { activityId: actIndex, isAlternativeOf }

    this.addComponent.choices = this.instruments.filter(instrument => this.activities[actIndex].inUseInstruments.indexOf(instrument.acronym) == -1)

    this.windowService.open(
      this.escCloseTemplate,
      { title: 'Window with backdrop', hasBackdrop: true },
    );
  }

  enableDisableActivity(actId, value): void {
    this.apiCourseService.putActivityActive(this.id, actId, { enabled: value }).subscribe(response => { return })
  }

  handleFormChange(event) {
    console.log(event)
  }

  handleDeleteInstrument(actId, instrument, hasAlternative) {
    if (hasAlternative) {
      this.apiCourseService.deleteActivityInstrument(this.id, actId, hasAlternative)
    }
    this.apiCourseService.deleteActivityInstrument(this.id, actId, instrument).subscribe(response => {
      if (response) location.reload();
    })
  }

  handleAddInstrument(actId, instrument, isAlternative) {
    const data = {
      "options": null,
      "instrument_id": instrument,
      "required": false,
      "active": false,
      "alternative_to": isAlternative || null
    }
    console.log(data)
    if (isAlternative) {
      this.apiCourseService.addActivityInstrument(this.id, actId, data).subscribe(response => {
        if (response) location.reload();
      })
    }
    else this.apiCourseService.addActivityInstrument(this.id, actId, data).subscribe(response => {
      if (response) location.reload();
    })
  }

  consolIt(anything) {
    console.log(anything)
  }

  checkInstruments(index) {
    if (this.instruments?.length > this.activities[index].instruments?.length) return true
    return false
  }

  ngOnInit(): void {
    // this.authService.getInstitution().subscribe(id => {
    //   this.endPoint = `/institution/${id}/course/${this.id}/activity`
    // })
    // this.apiCourseService.getCourseActivity(this.id).subscribe(activityArray => {
    //   if (activityArray.length > 0) {
    //     activityArray.map((activity, i) => {
    //       this.apiCourseService.getActivityInstrument(this.id, activity.id).subscribe(instrumentsArray => {
    //         if (instrumentsArray.length > 0) {

    //           const instrumentsOrder = []
    //           instrumentsArray.map(instrument => {
    //             if (instrument.alternative_to) {
    //               const index = instrumentsOrder.findIndex(x => x.id == instrument.alternative_to)
    //               instrumentsOrder.splice(index + 1, 0, instrument);
    //               instrumentsOrder[index].hasAlternative = instrument.id
    //             }
    //             else instrumentsOrder.push(instrument)
    //           })
    //           activityArray[i].instruments = instrumentsOrder

    //           activityArray[i].inUseInstruments = instrumentsArray.map((list, z) => {
    //             activityArray[i].instruments[z].schema = JSON.parse(list.instrument.options_schema)

    //             return list.instrument.acronym
    //           })
    //           console.log(activityArray)

    //         }
    //       })
    //     })
    //   }

    //   this.activities = activityArray;
    // });

    // this.apiCourseService.getCourseInstruments(this.id).subscribe(instrumentsArray => {
    //   this.instruments = instrumentsArray;
    // });

    // this.apiCourseService.getAllInstruments().subscribe(instrumentsArray => {
    //   console.log(instrumentsArray)
    //   this.instruments = instrumentsArray;
    // });

    this.apiCourseService.getCourseById(this.id).subscribe(instance => {
      this.instance = instance;
      this.loading = false;
    });
  }

}
