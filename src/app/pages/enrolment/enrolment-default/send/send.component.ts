import {AfterViewInit, Component, Inject, OnInit, ViewChildren} from '@angular/core';
import {Location} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import {Sensor, SensorsService} from '@tesla-ce/sensors';
import {
  SensorsStatus, TeSLAConfiguration, TeSLAJWTToken,
} from '@tesla-ce/web-plugin';
import {Observable} from 'rxjs/Rx';
import {AuthService} from '../../../../@core/auth/auth.service';
import {InstitutionUser, User} from '../../../../@core/models/user';
import {NbAuthService} from '@nebular/auth';
import {AlertMessage, Connection, Buffer} from './connection';
import {EnvService} from '../../../../@core/env/env.service';
import {LearnerEnrolment} from '../../../../@core/models/enrolment';
import {ApiEnrolmentService} from '../../../../@core/data/api-enrolment.service';
import {BehaviorSubject, timer} from 'rxjs';
import {NbAuthToken} from '@nebular/auth/services/token/token';
import {defaultIfEmpty} from 'rxjs/operators';
import {ApiCourseService} from '../../../../@core/data/api-course.service';

@Component({
  selector: 'ngx-send',
  templateUrl: './send.component.html',
  styleUrls: ['./send.component.scss'],
})
export class SendComponent implements OnInit, AfterViewInit {
  public buttonLabel = 'Start';
  public buttonSecondaryLabel = 'Stop';

  public instrumentId: number;
  @ViewChildren('webcamSensorCanvas') canvas;
  @ViewChildren('webcamAudio') audio;
  @ViewChildren('webcamVideo') video;
  @ViewChildren('photoClick') photoClick;
  @ViewChildren('shutter') shutter;

  private learner = {
    id: null,
    learner_id: null,
    first_name: null,
    last_name: null,
    picture: null,
    institution_id: null,
  };

  private token: TeSLAJWTToken;
  private mode = 'enrolment';
  private apiUrl: string;
  public instrumentEnrolmentStatus: LearnerEnrolment;
  // 1 -> FR
  private instrumentNumSamples = {
    1: 20,
  };

  public instrumentName = '';
  private step = 1;
  private ready = false;
  public progressValue = 0;
  public progressColor = 'info';
  public totalQueued = 0;
  public notifications = [];

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private sensorsService: SensorsService,
    private authService: AuthService,
    private nbAuthService: NbAuthService,
    private connection: Connection,
    private envService: EnvService,
    private apiEnrolmentService: ApiEnrolmentService,
    private apiCourseService: ApiCourseService,
    private router: Router,
  ) {
    this.apiUrl = envService.apiUrl.split('api')[0];
    this.apiUrl = this.apiUrl.substr(0, this.apiUrl.length - 1);
  }

  ngAfterViewInit() {
    this.ready = true;
  }

  ngOnInit(): void {
    this.instrumentId = parseInt(this.route.snapshot.paramMap.get('instrument_id'), 10);

    this.authService.getUser().subscribe( (user) => {
      if (user != null) {
        this.learner = {
          id: user.id,
          learner_id: user.institution.learner_id,
          first_name: user.first_name,
          last_name: user.last_name,
          picture: null,
          institution_id: user.institution.id,
        };

        this.updateInstrumentEnrolmentStatus();

        this.apiCourseService.getAllInstruments(user.institution.id).subscribe(allInstruments => {

          for (const inst in allInstruments) {
            if (allInstruments[inst]['id'] === this.instrumentId) {
              this.instrumentName = allInstruments[inst]['name'];
            }
          }
        });
      }

    });

    this.nbAuthService.getToken().subscribe((token) => {
      this.token = token.getPayload();
      this.configureSensors();
    });

    this.connection.newUpdateStats.subscribe( (data: Buffer) => {
      if (data != null) {
        // console.log('update stats of buffer');
        // console.log(data);
        this.notifications = data.notifications;
        // console.log(this.notifications);

        this.progressValue = Math.round(Math.min(data.correct, this.instrumentNumSamples[this.instrumentId]) /
          this.instrumentNumSamples[this.instrumentId] * 100);

        if ( data.correct >= this.instrumentNumSamples[this.instrumentId] ) {
          this.progressColor = 'success';
          this.stop();
          this.updateInstrumentEnrolmentStatus();
          this.btnPrimaryClick();
          return;
        }

        if (this.instrumentNumSamples[this.instrumentId] - this.totalQueued - data.failed < 0) {
          // console.log('continue capturing');
          // this.progressColor = 'danger';
          this.sensorsService.start();
          this.buttonLabel = 'Recording...';
          return;
        }
        // this.stop();
      }
    });

    this.sensorsService.newData.subscribe((data) => {
      if (data && data.sensor) {
        // send data
        this.shutter.first.nativeElement.classList.add('on');
        setTimeout(function(shutter) {
          this.shutter.classList.remove('on');
        }, 300);

        this.photoClick.first.nativeElement.play();
        this.connection.sendRequest('enrolment', data.b64data, data.mimeType, [1], null, data.context);
        this.totalQueued++;

        if (this.totalQueued >= this.instrumentNumSamples[this.instrumentId] ) {
          this.buttonLabel = 'Analyzing...';
          this.stop();
        }
      }
    });
  }

  updateInstrumentEnrolmentStatus() {
    this.apiEnrolmentService.getEnrolment(this.learner.id, this.learner.institution_id).subscribe( (data) => {
      for (const inst in data) {
        if (data[inst]['instrument_id'] === this.instrumentId) {

          this.instrumentEnrolmentStatus = data[inst];
        }
      }
    });
  }

  configureSensors() {
    let conf: TeSLAConfiguration;
    conf = {
      api_url: this.apiUrl,
      dashboard_url: null,
      logo_url: null,
      mode: this.mode,
      learner: this.learner,
      session_id: null,
      activity: null,
      accessibility: {
        high_contrast: false,
        big_fonts: false,
        text_to_speech: false,
      },
      instruments: [1],
      token: this.token,
      enrolment: null,
      launcher: null,
      base_url: this.apiUrl,
      locale: 'en',
      sensors: {
        camera: [1],
      },
    } as TeSLAConfiguration;

    this.connection.setConfig(conf);

    if (this.ready === true) {
      // console.log('configuring this.video');
      this.sensorsService.setAudio(this.audio);
      this.sensorsService.setVideo(this.video);
      this.sensorsService.setCanvas(this.canvas);
      this.sensorsService.enableSensors(['camera']);
    }

    const config = [];
    config.push({
      key: 'timeBetweenPictures',
      value: 500,
    });
    this.sensorsService.setConfiguration(config);
  }

  btnPrimaryClick(): void {
    if (this.step === 1) {
      this.step++;
      this.buttonLabel = 'Recording...';
      this.configureSensors();
      this.sensorsService.start();
      return;
    }
    if (this.step === 2) {
        this.step++;
        this.buttonLabel = 'Finish';
        return;
    }

    if (this.step === 3) {
      this.router.navigate(['/enrolment']);
      return;
    }
  }

  btnSecondaryClick() {
    this.stop();
  }

  showStep(instrumentId, step) {
    if (instrumentId === this.instrumentId && step === this.step) {
      return 'block';
    }
    return 'none';
  }
  stop() {
    this.sensorsService.stop();
  }

  back() { this.location.back(); }

  getEnrolmentValue() {
    if (this.instrumentEnrolmentStatus != null) {
      return Math.round(this.instrumentEnrolmentStatus.percentage__min);
    }
    return 0;
  }

  getAnalyzingValue() {
    if (this.instrumentEnrolmentStatus != null) {
      return Math.round(Math.min(this.instrumentEnrolmentStatus.pending_contributions, 1));
    }
    return 0;
  }
}