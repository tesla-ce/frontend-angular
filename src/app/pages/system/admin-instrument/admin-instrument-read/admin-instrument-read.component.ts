import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiUserService } from '../../../../@core/data/api-user.service';
import { User } from '../../../../@core/models/user';
import { AdminInstrumentConfig } from '../admin-instrument.config';

@Component({
  selector: 'ngx-admin-instrument-read',
  templateUrl: './admin-instrument-read.component.html',
  styleUrls: ['./admin-instrument-read.component.scss'],
})
export class AdminInstrumentReadComponent implements OnInit {
  id: number;
  fields = AdminInstrumentConfig.fields;
  paths = AdminInstrumentConfig.paths;
  instance: User;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private apiUserService: ApiUserService) {
    this.route.params.subscribe(params => {
      if (params['id'] != null) {
        this.id = params['id'];
        apiUserService.getUserById(this.id).subscribe(instance => {
          this.instance = instance;
        });
      } else {
        router.navigate(['../'], { relativeTo: this.route });
      }
    });
  }

  ngOnInit(): void {
  }

  back() { this.location.back(); }
}
