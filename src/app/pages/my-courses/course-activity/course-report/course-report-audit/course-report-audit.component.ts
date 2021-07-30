import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'ngx-course-report-audit',
  styleUrls: ['./course-report-audit.component.scss'],
  templateUrl: './course-report-audit.component.html',
})

export class CourseReportAuditComponent implements OnInit {

  constructor(
    private location: Location,
  ) { }

  ngOnInit() {

  }

  back() { this.location.back(); }
}


