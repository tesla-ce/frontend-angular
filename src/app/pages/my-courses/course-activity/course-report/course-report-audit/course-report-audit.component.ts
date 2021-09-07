import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../../../@core/auth/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { formatDate, Location } from '@angular/common';
import { ApiCourseService } from '../../../../../@core/data/api-course.service';
import { ListCellSumaryComponent } from '../course-report-list/list-cell-sumary.component';
import { InstitutionUser } from '../../../../../@core/models/user';
import { ApiReportService } from '../../../../../@core/data/api-report.service';
import { HttpClient } from '@angular/common/http';
import { MATERIAL_TESLA_THEME } from '../../../../../@theme/styles/material/theme.material-tesla';
import { OwlOptions } from 'ngx-owl-carousel-o';


@Component({
  selector: 'ngx-course-report-audit',
  styleUrls: ['./course-report-audit.component.scss'],
  templateUrl: './course-report-audit.component.html',
})

export class CourseReportAuditComponent implements OnInit {
  customOptions: OwlOptions = {
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
  courseId: number;
  activityId: number;
  reportId: number;
  instrumentId: number;
  endpoint: string;
  loading: boolean = true;
  audit: any = null;
  slidesStore: any[];

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
          this.slidesStore = [];
          if (this.audit !== null && this.audit.audit !== null && this.audit.audit.hasOwnProperty('enrolment_samples')) {
            const sample_ids = Object.keys(this.audit.audit.enrolment_samples);
            for (const sid of sample_ids) {
              const sample = this.audit.audit.enrolment_samples[sid];
              this.slidesStore.push({
                src: sample.data,
                alt: 'Sample ' + sample.id,
                title: 'Enrolment Sample ' + sample.id,
                id: sid,
              });
            }
          }
          this.loading = false;
        });
      }
    });
  }

  back() { this.location.back(); }
}


