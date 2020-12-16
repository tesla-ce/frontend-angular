import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'ngx-admin-user-update',
  templateUrl: './admin-user-update.component.html',
  styleUrls: ['./admin-user-update.component.scss']
})
export class AdminUserUpdateComponent implements OnInit {

  id: number;
  constructor(
    private route: ActivatedRoute,
    private router: Router) {
    this.route.params.subscribe(params => {
      if (params['id'] != null ) {
        this.id = params['id'];
      } else {
        router.navigate(['../'], {relativeTo: this.route});
      }
    });
  }

  ngOnInit(): void {
  }

}
