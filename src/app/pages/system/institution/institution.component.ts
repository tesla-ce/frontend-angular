import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'ngx-admin-institution',
  styleUrls: ['./institution.component.scss'],
  templateUrl: './institution.component.html',
})

export class InstitutionComponent implements OnInit {

  constructor(
    private location: Location,
  ) { }

  ngOnInit() {

  }

  back() { this.location.back(); }
}


