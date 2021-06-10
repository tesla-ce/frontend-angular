import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'ngx-statistics-default',
  styleUrls: ['./statistics-default.component.scss'],
  templateUrl: './statistics-default.component.html',
})

export class StatisticsDefaultComponent implements OnInit {

  constructor(
    private location: Location,
  ) { }

  ngOnInit() {

  }

  back() { this.location.back(); }
}


