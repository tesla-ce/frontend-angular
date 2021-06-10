import { Component, OnInit } from '@angular/core';

import { Location } from '@angular/common';

@Component({
  selector: 'ngx-course-report',
  templateUrl: './course-report.component.html',
  styleUrls: ['./course-report.component.scss'],
})
export class CourseReportComponent implements OnInit {


  constructor(
    private location: Location,
    ) {

  }

  back() { this.location.back(); }


  ngOnInit(): void {

  }

}
