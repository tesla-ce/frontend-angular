import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../@core/auth/auth.service';
import { User } from '../../../@core/models/user';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'ngx-dashboard-default',
  styleUrls: ['./dashboard-default.component.scss'],
  templateUrl: './dashboard-default.component.html',
})

export class DashboardDefaultComponent implements OnInit {

  user: User;

  constructor(
    private authService: AuthService,
    public translate: TranslateService,
  ) { }

  ngOnInit() {
    this.authService.getUser()
      .pipe()
      .subscribe((user: User) => {
        console.log('ngOnInit', user);
        if (user) this.user = user;
      });
  }
}


