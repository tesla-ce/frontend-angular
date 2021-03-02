import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../@core/auth/auth.service';
import { User } from '../@core/models/user';

@Component({
  selector: 'ngx-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.authService.getUser()
      .pipe()
      .subscribe((user: User) => {
        if (user && user.is_admin) this.router.navigate(['/admin/dashboard']);
        else this.router.navigate(['/institution/dashboard']);
      });
  }
}
