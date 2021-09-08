import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'ngx-institution-user-update',
  templateUrl: './institution-user-update.component.html',
  styleUrls: ['./institution-user-update.component.scss'],
})
export class InstitutionUserUpdateComponent implements OnInit {

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
