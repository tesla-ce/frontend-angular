import { Component, OnInit } from '@angular/core';
import { CreateUserService } from './create-user.service';
import { AuthService } from '../../@core/auth/auth.service'

import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'ngx-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss'],
  providers: [CreateUserService, AuthService],
})

export class CreateUserComponent {
  constructor(private createUserService: CreateUserService) {}

  profileForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    username: new FormControl(''),
    email: new FormControl(''),
  });
  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.profileForm.value);
    this.createUserService
    .createUser(this.profileForm.value)
    .subscribe(user => console.log(user));
  }  
}
