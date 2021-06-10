import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'ngx-service',
  styleUrls: ['./service.component.scss'],
  templateUrl: './service.component.html',
})

export class ServiceComponent implements OnInit {

  constructor(
    private location: Location,
  ) { }

  ngOnInit() {

  }

  back() { this.location.back(); }
}


