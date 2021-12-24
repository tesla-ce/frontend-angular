import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'ngx-instrument',
  styleUrls: ['./instrument.component.scss'],
  templateUrl: './instrument.component.html',
})

export class InstrumentComponent {

  constructor(
    private location: Location,
  ) { }

  back() { this.location.back(); }
}


