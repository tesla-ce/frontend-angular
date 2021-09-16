import {AfterViewInit, Component, Inject, OnInit, ViewChildren} from '@angular/core';
import {Location} from "@angular/common";
import {ActivatedRoute} from "@angular/router";
import {Sensor, SensorsService} from "@tesla-ce/sensors";
import {
  SensorsStatus, TeSLAConfiguration, TeSLAJWTToken
} from "@tesla-ce/web-plugin";
import {Observable} from "rxjs/Rx";
import {AuthService} from "../../../../@core/auth/auth.service";
import {InstitutionUser, User} from "../../../../@core/models/user";
import {NbAuthService} from "@nebular/auth";
import {AlertMessage, Connection} from "./connection";
import {EnvService} from "../../../../@core/env/env.service";
import {LearnerEnrolment} from "../../../../@core/models/enrolment";
import {ApiEnrolmentService} from "../../../../@core/data/api-enrolment.service";
import {BehaviorSubject, timer} from "rxjs";
import {NbAuthToken} from "@nebular/auth/services/token/token";
import {defaultIfEmpty} from "rxjs/operators";

@Component({
  selector: 'ngx-send',
  templateUrl: './send.component.html',
  styleUrls: ['./send.component.scss']
})
export class SendComponent implements OnInit, AfterViewInit {
  public buttonLabel = 'Next';
  public buttonSecondaryLabel = 'Stop';

  public instrumentId: number;
  @ViewChildren('webcamSensorCanvas') canvas;
  @ViewChildren('webcamAudio') audio;
  @ViewChildren('webcamVideo') video;
  @ViewChildren('photoClick') photoClick;
  @ViewChildren('shutter') shutter;

  public learner = {};
  private token: TeSLAJWTToken;
  private mode = 'enrolment';
  private apiUrl: string;
  public instrumentEnrolmentStatus: LearnerEnrolment;
  // 1 -> FR
  private instrumentNumSamples = {
    1: 20
  };

  public instrumentName = '';
  private step = 1;
  private ready = false;

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private sensorsService: SensorsService,
    private authService: AuthService,
    private NbAuthService: NbAuthService,
    private connection: Connection,
    private envService: EnvService,
    private apiEnrolmentService: ApiEnrolmentService
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
      console.log(user);

      if (user != null) {
        this.learner = {
          id: user.id,
          learner_id: user.institution.learner_id,
          first_name: user.first_name,
          last_name: user.last_name,
          picture: null,
          institution_id: user.institution.id
        }
        this.apiEnrolmentService.getEnrolment(user.id, user.institution.id).subscribe( (data) => {
          for(const inst in data) {
            if (data[inst]['instrument_id'] === this.instrumentId) {
              this.instrumentEnrolmentStatus = data[inst];
            }
          }
          this.configureSensors();
        });
      }

    });

    // let enrolment: Observable<any> = this.apiEnrolmentService.getEnrolment(user.id, user.institution.id);
    this.NbAuthService.getToken().subscribe((token) =>{
      this.token = token.getPayload();
      this.configureSensors();
    });

    this.connection.newUpdateStats.subscribe( data => {
      console.log('update stats of buffer');
      console.log(data);
    });

    this.sensorsService.newData.subscribe((data) => {
      if (data && data.sensor) {
        // send data
        this.shutter.first.nativeElement.classList.add('on');
        setTimeout(function(shutter){
          this.shutter.classList.remove('on');
        }, 300);

        this.photoClick.first.nativeElement.play();
        console.log(data);
        /*
        if (this.instrumentNumSamples[this.instrumentId] >= data.corrects) {

        }
         */
        this.stop();
        // this.connection.sendRequest('enrolment', data.b64data, data.mimeType, [1], null, data.context);
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
        text_to_speech: false
      },
      instruments: [1],
      token: this.token,
      enrolment: null,
      launcher: null,
      base_url: this.apiUrl,
      locale: 'en',
      sensors: {
        camera: [1]
      }
    } as TeSLAConfiguration;

    this.connection.setConfig(conf);

    if (this.ready === true) {
      this.sensorsService.setAudio(this.audio);
      this.sensorsService.setVideo(this.video);
      this.sensorsService.setCanvas(this.canvas);
      this.sensorsService.enableSensors(['camera']);
    }

    let config = [];
    config.push({
      key: "timeBetweenPictures",
      value: 500
    });
    this.sensorsService.setConfiguration(config);
  }

  btnPrimaryClick(): void {
    if (this.step == 1) {
      this.step++;
      this.buttonLabel = 'Recording...';
      this.sensorsService.start();
    }
    if (this.step == 2) {
      this.buttonLabel = 'Recording...';
    }
  }

  btnSecondaryClick() {
    this.stop();
  }

  showStep(instrumentId, step) {
    if (instrumentId === this.instrumentId && step === this.step) {
      return true;
    }
    return false;
  }
  stop() {
    this.sensorsService.stop();
  }

  back() { this.location.back(); }

  getEnrolmentValue() {
    if (this.instrumentEnrolmentStatus != null) {
      return this.instrumentEnrolmentStatus.percentage__min;
    }
    return 0;
  }

  getAnalyzingValue() {
    if (this.instrumentEnrolmentStatus != null) {
      return Math.min(this.instrumentEnrolmentStatus.pending_contributions, 1);
    }
    return 0;
  }
}
