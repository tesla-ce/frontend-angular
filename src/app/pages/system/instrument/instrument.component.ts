import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'ngx-instrument',
  styleUrls: ['./instrument.component.scss'],
  templateUrl: './instrument.component.html',
})

export class InstrumentComponent implements OnInit {

  constructor(
    private location: Location,
  ) { }

  ngOnInit() {

  }

  back() { this.location.back(); }
}


