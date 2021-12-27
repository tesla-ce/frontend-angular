import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'ngx-data-management',
  styleUrls: ['./data-management.component.scss'],
  templateUrl: './data-management.component.html',
})

export class DataManagementComponent {

  constructor(
    private location: Location,
  ) { }

  back() { this.location.back(); }
}


