import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiCourseService } from '../../../../@core/data/api-course.service';
import { Course } from '../../../../@core/models/course';
import { InstitutionCourseConfig } from '../institution-course.config';
import { AuthService } from '../../../../@core/auth/auth.service';
import { InstitutionUser } from '../../../../@core/models/user';

@Component({
  selector: 'ngx-institution-course-read',
  templateUrl: './institution-course-read.component.html',
  styleUrls: ['./institution-course-read.component.scss'],
})
export class InstitutionCourseReadComponent implements OnInit {
  institutionId: number;
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
  loading = true;
  public instance: Course;
  public fields = InstitutionCourseConfig.fields;

  constructor(
    private route: ActivatedRoute,
    private apiCourseService: ApiCourseService,
    private authService: AuthService,
    private router: Router) {
    this.route.params.subscribe(params => {
      if (params['id'] != null) {
        this.id = params['id'];
      } else {
        router.navigate(['../'], { relativeTo: this.route });
      }
    });
  }

  enableDisableActivity(activitiId, value): void {
    this.apiCourseService.putActivityActive(this.institutionId, this.id, activitiId, { enabled: value }).subscribe();
  }

  // addInstrument(activitiId, isAlternative): void {
  //   return;
  // }

  handleDeleteInstrument(activitiId, instrument, hasAlternative) {
    if (hasAlternative) {
      this.apiCourseService.deleteActivityInstrument(this.institutionId, this.id, activitiId, hasAlternative);
    }
    this.apiCourseService.deleteActivityInstrument(this.institutionId, this.id, activitiId, instrument).subscribe(response => {
      if (response) location.reload();
    });
  }

  handleAddInstrument(activitiId, instrument, isAlternative) {
    if (isAlternative) {
      this.apiCourseService.addActivityInstrument(
        this.institutionId, this.id, activitiId, { id: isAlternative, alternative_to: instrument });
    } else this.apiCourseService.addActivityInstrument(this.institutionId, this.id, activitiId, { id: instrument }).subscribe(response => {
      if (response) location.reload();
    });
  }

  checkInstruments(index) {
    if (this.instruments?.length > this.activities[index].instruments?.length) return true;
    return false;
  }

  ngOnInit(): void {
    this.authService.getUser().subscribe((user: InstitutionUser) => {
      if (user) {
        this.institutionId = user.institution.id;
        this.apiCourseService.getCourseById(this.institutionId, this.id).subscribe(instance => {
          this.instance = instance;
          this.apiCourseService.getCourseActivities(this.institutionId, this.id).subscribe(activityArray => {
            if (activityArray.length > 0) {
              activityArray.map((activity, i) => {
                this.apiCourseService.getActivityInstrument(this.institutionId, this.id, activity.id).subscribe(instrumentsArray => {
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
          this.loading = false;
        });
      }
    });
  }

}
