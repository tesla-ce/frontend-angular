import { Component, OnInit } from '@angular/core';
import { CreateUserService, Institutions, Institution } from './create-user.service';
import { AuthService } from '../../@core/auth/auth.service';

import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'ngx-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss'],
  providers: [CreateUserService, AuthService],
})

export class CreateUserComponent implements OnInit {
  error: any;
  institutions: Institution[];

  constructor(private createUserService: CreateUserService) {}

  profileForm = new FormGroup({
    username: new FormControl(''),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    institution: new FormControl(null),
    roles: new FormControl(''),
    date_joined: new FormControl(new Date()),
  });

  ngOnInit() {
    this.getInstitutions();
  }

  getInstitutions(): void {
    this.createUserService.getInstitutions()
      .subscribe(institutions => {
        this.institutions = institutions.results;
      });
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.profileForm.value);
    this.createUserService
    .createUser(this.profileForm.value)
    .subscribe(user => {
      // console.log(user)
    });
  }
}
