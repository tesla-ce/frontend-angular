import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {BaseWidgetComponent} from '../base-widget.component';
import {Course} from '../../../../../@core/models/course';

export interface WidgetData {
  component: string;
  name: string;
}

@Component({
  selector: 'ngx-dashboard-widget-courses',
  styleUrls: [],
  templateUrl: './courses-widget.component.html',
})
export class CoursesWidgetComponent extends BaseWidgetComponent implements OnInit {
  courses: Array<Course> = [];

  ngOnInit() {
    super.ngOnInit();
    this.dashService.getUserActiveCourses().subscribe(courses => {
      this.courses = courses;
    });
  }
}
