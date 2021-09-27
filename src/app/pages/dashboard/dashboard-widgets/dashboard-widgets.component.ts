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

  static itemChange(item, itemComponent) {
     console.info('itemChanged', item, itemComponent);
  }

  static itemResize(item, itemComponent) {
     console.info('itemResized', item, itemComponent);
  }

  ngOnInit() {
    this.options = {
      disablePushOnDrag: true,
      draggable: { enabled: true },
      gridType: GridType.Fit,
      resizable: { enabled: true },
      minCols: 10,
      minRows: 10,
      itemChangeCallback: DashboardWidgetsComponent.itemChange,
      itemResizeCallback: DashboardWidgetsComponent.itemResize,
    };
    this.dashService.getUserDashboard().subscribe(data => {
      this.items = data.widgets;
    });
  }

  changedOptions(): void {
    if (this.options.api && this.options.api.optionsChanged) {
      this.options.api.optionsChanged();
    }
  }

  removeItem($event: MouseEvent | TouchEvent, item): void {
    $event.preventDefault();
    $event.stopPropagation();
    this.items.splice(this.items.indexOf(item), 1);
  }

}


