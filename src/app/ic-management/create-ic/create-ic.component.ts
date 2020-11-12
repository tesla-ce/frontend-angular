import { Component, OnInit } from '@angular/core';
import { CreateIcService } from './create-ic.service';
import { AuthService } from '../../@core/auth/auth.service';

import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'ngx-create-ic',
  templateUrl: './create-ic.component.html',
  styleUrls: ['./create-ic.component.scss'],
  providers: [CreateIcService, AuthService],
})

export class CreateIcComponent implements OnInit {
  error: any;

  constructor(private createIcService: CreateIcService) {}

  profileForm = new FormGroup({
    version: new FormControl(''),
    valid_from: new FormControl(new Date()),
  });

  ngOnInit() {

  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.profileForm.value);
    this.createIcService
    .createIc(this.profileForm.value)
    .subscribe(ic => {
      // console.log(ic)
    });
  }
}
