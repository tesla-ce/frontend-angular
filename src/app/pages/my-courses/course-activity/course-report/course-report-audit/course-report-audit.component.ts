import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../../../@core/auth/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { formatDate, Location } from '@angular/common';
import { ApiCourseService } from '../../../../../@core/data/api-course.service';
import { InstitutionUser } from '../../../../../@core/models/user';
import { ReportAudit } from '../../../../../@core/models/report';
import { ApiReportService } from '../../../../../@core/data/api-report.service';
import { HttpClient } from '@angular/common/http';
import { OwlOptions } from 'ngx-owl-carousel-o';


@Component({
  selector: 'ngx-course-report-audit',
  styleUrls: ['./course-report-audit.component.scss'],
  templateUrl: './course-report-audit.component.html',
})

export class CourseReportAuditComponent implements OnInit {
  customOptionsEnrolment: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 3,
      },
      940: {
        items: 4,
      },
    },
    nav: true,
  };
  customOptionsResults: OwlOptions = {
    loop: false,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 3,
      },
      940: {
        items: 3,
      },
    },
    nav: true,
  };
  customOptionsFaces: OwlOptions = {
    loop: false,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 1,
      },
      740: {
        items: 1,
      },
      940: {
        items: 1,
      },
    },
    nav: true,
  };
  courseId: number;
  activityId: number;
  reportId: number;
  instrumentId: number;
  endpoint: string;
  loading = true;
  audit: any = null;
  enrolmentSlidesStore: any[];
  resultsSlidesStore: any[];

  constructor(
    private authService: AuthService,
    private apiCourseService: ApiCourseService,
    private apiReportService: ApiReportService,
    public translate: TranslateService,
    private http: HttpClient,
    private location: Location,
    private router: Router,
    private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.courseId = params['courseId'];
      this.activityId = params['activityId'];
      this.reportId = params['reportId'];
      this.instrumentId = params['instrumentId'];
    });
  }

  ngOnInit(): void {
    this.authService.getUser().subscribe((user: InstitutionUser) => {
      if (user) {
        this.loading = true;
        this.apiReportService.getActivityReportAudit(
          user.institution.id, this.courseId, this.activityId, this.reportId, this.instrumentId).subscribe(audit => {
          this.audit = audit;
          this.load_enrolment(audit);
          this.load_results(audit);
          this.loading = false;
        });
      }
    });
  }

  back() { this.location.back(); }

  load_enrolment(data: ReportAudit): void {
    this.enrolmentSlidesStore = [];
    if (data !== null && data.audit !== null && Object.prototype.hasOwnProperty.call(data.audit, 'enrolment_samples')) {
      const sample_ids = Object.keys(data.audit.enrolment_samples);
      for (const sid of sample_ids) {
        const sample = data.audit.enrolment_samples[sid];
        this.enrolmentSlidesStore.push({
          src: sample.data,
          alt: 'Sample ' + sid,
          title: 'Enrolment Sample ' + sid,
          id: sid,
        });
      }
    }
  }

  load_results(data: ReportAudit): void {
    this.resultsSlidesStore = [];
    if (data !== null && data.audit !== null) {
      const requests_ids = Object.keys(data.audit.requests);
      for (const rid of requests_ids) {
        const request = data.audit.requests[rid];
        const request_results: any[] = [];
        for (const pid of Object.keys(request.results)) {
          request_results.push({
            acronym: data.audit.providers[pid].acronym,
            result: request.results[pid].result,
            enrolment: data.audit.providers[pid].enrolment,
            faces: request.results[pid].audit.faces,
            status: request.results[pid].status,
          });
        }
        this.resultsSlidesStore.push({
          src: request.data,
          alt: 'Request ' + rid,
          title: 'Request ' + rid,
          id: rid,
          created_at: formatDate(request.created_at, 'dd/MM/yyyy h:mm:ss', 'en-US'),
          result: request.result,
          providers: request_results,
        });
      }
    }
  }
}


