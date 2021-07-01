import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'ngx-enrolment-default',
  styleUrls: ['./enrolment-default.component.scss'],
  templateUrl: './enrolment-default.component.html',
})

export class EnrolmentDefaultComponent implements OnInit {

  constructor(
    private location: Location,
  ) { }

  ngOnInit() {

  }

  back() { this.location.back(); }
}


