import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'ngx-status',
  styleUrls: ['./status.component.scss'],
  templateUrl: './status.component.html',
})

export class StatusComponent implements OnInit {

  constructor(
    private location: Location,
  ) { }

  ngOnInit() {

  }

  back() { this.location.back(); }
}


