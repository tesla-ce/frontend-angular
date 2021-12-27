import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'ngx-course',
  styleUrls: ['./course.component.scss'],
  templateUrl: './course.component.html',
})

export class CourseComponent {

  constructor(
    private location: Location,
  ) { }

  back() { this.location.back(); }
}


