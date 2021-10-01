import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {BaseWidgetComponent} from '../base-widget.component';
import {Course} from '../../../../../@core/models/course';
import {DashboardService} from '../../../dashboard.service';
import {NbDateService} from '@nebular/theme';
import {DayCellComponent} from './day-cell/day-cell.component';


@Component({
  selector: 'ngx-dashboard-widget-calendar',
  styleUrls: ['./calendar-widget.component.scss'],
  templateUrl: './calendar-widget.component.html',
  entryComponents: [DayCellComponent],
})
export class CalendarWidgetComponent extends BaseWidgetComponent implements OnInit {
  date: Date = new Date();
  dayCellComponent = DayCellComponent;

  constructor(
    public translate: TranslateService,
    public dashService: DashboardService,
    protected dateService: NbDateService<Date>,
  ) {
    super(translate, dashService);
  }
  ngOnInit() {
    super.ngOnInit();
    this.dashService.getUserActiveCourses().subscribe(courses => {

    });
  }

  get instruments(): Array<string> {
    if (this.date.getDay() % 2) {
      return ['fr', 'ks', 'vr', 'plag'];
    }
    return [];
  }
}
