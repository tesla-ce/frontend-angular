import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import {ApiCourseService} from '../../../@core/data/api-course.service';
import {ApiEnrolmentService} from '../../../@core/data/api-enrolment.service';
import {AuthService} from '../../../@core/auth/auth.service';
import {InstitutionUser} from '../../../@core/models/user';
import {LearnerEnrolment} from '../../../@core/models/enrolment';

@Component({
  selector: 'ngx-enrolment-default',
  styleUrls: ['./enrolment-default.component.scss'],
  templateUrl: './enrolment-default.component.html',
})

export class EnrolmentDefaultComponent implements OnInit {
  public availableInstruments = [];
  public institutionId = null;
  public instrumentEnrolmentStatus: LearnerEnrolment[] = [];

  constructor(
    private location: Location,
    private apiCourseService: ApiCourseService,
    private apiEnrolmentService: ApiEnrolmentService,
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.authService.getUser()
      .subscribe((user: InstitutionUser) => {
        if (user != null) {
          this.institutionId = user.institution.id;

          this.apiEnrolmentService.getEnrolment(user.id, this.institutionId).subscribe(data => {
            this.instrumentEnrolmentStatus = data;
          });

          this.apiCourseService.getAllInstruments(this.institutionId).subscribe(allInstruments => {
            this.availableInstruments = [];

            for (const inst in allInstruments) {
              if (allInstruments[inst]['requires_enrolment'] === true) {
                this.availableInstruments.push(allInstruments[inst]);
              }
            }
          });
        }
      });
  }

  needsGoEnrolment(instrumentId): Boolean {
    for (const instrument in this.instrumentEnrolmentStatus) {
      if (this.instrumentEnrolmentStatus[instrument].instrument_id === instrumentId) {
        return this.instrumentEnrolmentStatus[instrument].percentage__min < 1;
      }
    }
    return true;
  }

  getEnrolmentValue(instrumentId) {
    for (const instrument in this.instrumentEnrolmentStatus) {
      if (this.instrumentEnrolmentStatus[instrument].instrument_id === instrumentId) {
        return Math.round(this.instrumentEnrolmentStatus[instrument].percentage__min);
      }
    }
    return 0;
  }

  getAnalyzingValue(instrumentId) {
    for (const instrument in this.instrumentEnrolmentStatus) {
      if (this.instrumentEnrolmentStatus[instrument].instrument_id === instrumentId) {
        return Math.round(Math.min(this.instrumentEnrolmentStatus[instrument].pending_contributions, 1));
      }
    }
    return 0;
  }

  back() { this.location.back(); }
}


