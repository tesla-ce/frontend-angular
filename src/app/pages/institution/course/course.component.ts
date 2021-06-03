import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'ngx-course',
  styleUrls: ['./course.component.scss'],
  templateUrl: './course.component.html',
})

export class CourseComponent implements OnInit {

  constructor(
    private location: Location,
  ) { }

  ngOnInit() {

  }

  back() { this.location.back(); }
}


