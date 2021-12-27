import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'ngx-statistics-default',
  styleUrls: ['./statistics-default.component.scss'],
  templateUrl: './statistics-default.component.html',
})

export class StatisticsDefaultComponent {

  constructor(
    private location: Location,
  ) { }

  back() { this.location.back(); }
}


