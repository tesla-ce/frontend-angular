import { DataDisplayComponent } from '../control';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiCourseService } from '../../../../@core/data/api-course.service';
import { Course } from '../../../../@core/models/course';
import { CourseConfig } from '../../course.config';
import { angularMaterialRenderers } from '@jsonforms/angular-material';
import { and, createAjv, isControl, rankWith, scopeEndsWith } from '@jsonforms/core';
import { NbWindowService } from '@nebular/theme';
import { AuthService } from '../../../../@core/auth/auth.service';
import { CourseActivityConfig } from '../course-activity.config';

@Component({
  selector: 'ngx-course-activity-read',
  templateUrl: './course-activity-read.component.html',
  styleUrls: ['./course-activity-read.component.scss'],
})
export class CourseActivityReadComponent implements OnInit {
  course: any;
  id: number;
  loading: boolean = true;

  public instance: any;
  public fields = CourseActivityConfig.fields;

  constructor(
    private windowService: NbWindowService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private apiCourseService: ApiCourseService,
    private router: Router) {
    this.route.params.subscribe(params => {
        this.course = params['id'];
        this.id = params['activityId'];
    });
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

      this.instance = instance;

      this.loading = false;
    });
  }

}
