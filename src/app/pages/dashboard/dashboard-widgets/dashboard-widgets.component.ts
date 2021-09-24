import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { TranslateService } from '@ngx-translate/core';
import {GridsterItem, GridsterConfig, GridType} from 'angular-gridster2';

@Component({
  selector: 'ngx-dashboard-default',
  styleUrls: ['./dashboard-widgets.component.scss'],
  templateUrl: './dashboard-widgets.component.html',
})

export class DashboardWidgetsComponent implements OnInit {

  public options: GridsterConfig;
  public items: GridsterItem[];

  constructor(
    private dashService: DashboardService,
    public translate: TranslateService,
  ) { }

  ngOnInit() {
    this.options = {
      disablePushOnDrag: true,
      draggable: { enabled: true },
      gridType: GridType.Fit,
      resizable: { enabled: true },
      minCols: 10,
      minRows: 10,
    };
    this.dashService.getUserDashboard().subscribe(data => {
      this.items = data.widgets;
    });
  }
}


