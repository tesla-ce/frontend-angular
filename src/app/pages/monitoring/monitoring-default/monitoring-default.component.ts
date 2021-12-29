import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'ngx-monitoring-default',
  styleUrls: ['./monitoring-default.component.scss'],
  templateUrl: './monitoring-default.component.html',
})

export class MonitoringDefaultComponent {

  constructor(
    private location: Location,
  ) { }

  back() { this.location.back(); }
}


