import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'ngx-service',
  styleUrls: ['./service.component.scss'],
  templateUrl: './service.component.html',
})

export class ServiceComponent {

  constructor(
    private location: Location,
  ) { }

  back() { this.location.back(); }
}


