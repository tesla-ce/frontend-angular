import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {GridsterItem} from 'angular-gridster2';
import {DashboardService} from '../../dashboard.service';

export interface WidgetData {
  component: string;
  name: string;
}

@Component({
  selector: 'ngx-dashboard-widget',
  styleUrls: ['./base-widget.component.scss'],
  templateUrl: './base-widget.component.html',
})
export class BaseWidgetComponent implements OnInit {
  @Input() item: GridsterItem;
  data: WidgetData = null;
  constructor(
    public translate: TranslateService,
    public dashService: DashboardService,
  ) { }

  ngOnInit() {
    this.data = {
      component: this.item.component,
      name: this.item.name,
    };
  }
}
