import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'ngx-status',
  styleUrls: ['./status.component.scss'],
  templateUrl: './status.component.html',
})

export class StatusComponent {

  constructor(
    private location: Location,
  ) { }

  back() { this.location.back(); }
}


