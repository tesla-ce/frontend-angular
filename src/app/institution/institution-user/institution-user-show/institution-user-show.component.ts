import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'ngx-institution-user-show',
  templateUrl: './institution-user-show.component.html',
  styleUrls: ['./institution-user-show.component.scss']
})
export class InstitutionUserShowComponent implements OnInit {
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
