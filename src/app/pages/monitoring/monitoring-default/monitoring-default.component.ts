import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'ngx-monitoring-default',
  styleUrls: ['./monitoring-default.component.scss'],
  templateUrl: './monitoring-default.component.html',
})

export class MonitoringDefaultComponent implements OnInit {

  constructor(
    private location: Location,
  ) { }

  ngOnInit() {

  }

  back() { this.location.back(); }
}


