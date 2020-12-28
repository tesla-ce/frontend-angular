import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'ngx-institution-ic-update',
  templateUrl: './institution-ic-update.component.html',
  styleUrls: ['./institution-ic-update.component.scss']
})
export class InstitutionIcUpdateComponent implements OnInit {

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
