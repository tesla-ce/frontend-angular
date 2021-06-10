import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'ngx-data-management',
  styleUrls: ['./data-management.component.scss'],
  templateUrl: './data-management.component.html',
})

export class DataManagementComponent implements OnInit {

  constructor(
    private location: Location,
  ) { }

  ngOnInit() {

  }

  back() { this.location.back(); }
}


