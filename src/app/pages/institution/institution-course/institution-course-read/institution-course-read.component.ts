import { startWith } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiCourseService } from '../../../../@core/data/api-course.service';
import { Course } from '../../../../@core/models/course';
import { InstitutionCourseConfig } from '../institution-course.config';

@Component({
  selector: 'ngx-institution-course-read',
  templateUrl: './institution-course-read.component.html',
  styleUrls: ['./institution-course-read.component.scss'],
})
export class InstitutionCourseReadComponent implements OnInit {
  id: number;
  activities: any[] = [];
  instruments: any[] = [{
    'name': 'Face Recognition', 'acronym': 'fr', 'description': 'Verify learner identity by means of face attributes.',
    'id': 1,
  }, {
    'id': 2,
    'name': 'Keystroke Dynamics Recognition',
    'acronym': 'ks', 'description': 'Verify learner identity by means of keystroke patterns.',
  }, {
    'id': 3,
    'name': 'Voice Recognition',
    'acronym': 'vr', 'description': 'Verify learner identity by means of voice attributes.',
  }, {
    'id': 4,
    'name': 'Forensic Analysis',
    'acronym': 'fa', 'description': 'Verify learner identity by means of writing style patterns.',
  }];
  loading: boolean = true;
  public instance: Course;
  public fields = InstitutionCourseConfig.fields;

  constructor(
    private route: ActivatedRoute,
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

  enableDisableActivity(actId, value): void {
    this.apiCourseService.putActivityActive(this.id, actId, { enabled: value }).subscribe(response => { return; });
  }

  addInstrument(actId, isAlternative): void {
    return;
  }

  handleDeleteInstrument(actId, instrument, hasAlternative) {
    if (hasAlternative) {
      this.apiCourseService.deleteActivityInstrument(this.id, actId, hasAlternative);
    }
    this.apiCourseService.deleteActivityInstrument(this.id, actId, instrument).subscribe(response => {
      if (response) location.reload();
    });
  }

  handleAddInstrument(actId, instrument, isAlternative) {
    if (isAlternative) {
      this.apiCourseService.addActivityInstrument(this.id, actId, { id: isAlternative, alternative_to: instrument });
    } else this.apiCourseService.addActivityInstrument(this.id, actId, { id: instrument }).subscribe(response => {
      if (response) location.reload();
    });
  }

  checkInstruments(index) {
    if (this.instruments?.length > this.activities[index].instruments?.length) return true;
    return false;
  }

  ngOnInit(): void {
    this.apiCourseService.getCourseActivities(this.id).subscribe(activityArray => {
      if (activityArray.length > 0) {
        activityArray.map((activity, i) => {
          this.apiCourseService.getActivityInstrument(this.id, activity.id).subscribe(instrumentsArray => {
            if (instrumentsArray.length > 0) {

              activityArray[i].instruments = instrumentsArray;

              activityArray[i].inUseInstruments = instrumentsArray.map((list, z) => {
                if (typeof list.alternative_to === 'number') activityArray[i].instruments[z - 1].hasAlternative = list.id;
                return list.instrument.acronym;
              });

            }
          });
        });
      }

      this.activities = activityArray;
    });

    // this.apiCourseService.getCourseInstruments(this.id).subscribe(instrumentsArray => {
    //   this.instruments = instrumentsArray;
    // });

    this.apiCourseService.getCourseById(this.id).subscribe(instance => {
      this.instance = instance;
      this.loading = false;
    });
  }

}
