import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ListCellActionsComponent } from '../../../../crud/list/list-cell-actions.component';
import { AuthService } from '../../../../@core/auth/auth.service';

@Component({
  selector: 'ngx-course-read-activity-list',
  templateUrl: './course-read-activity-list.component.html',
  styleUrls: ['./course-read-activity-list.component.scss'],
})
export class CourseReadActivityListComponent implements OnInit {
  course: number;
  endPoint: string;
  loading: boolean = true;
  settings = {
    noAddNew: true,
    noSearch: true,
    columns: {
      actions: {
        title: 'Actions',
        type: 'custom',
        sort: false,
        filter: false,
        defaultValue: {
          readRoute: "activity/read",
          updateRoute: "activity/update"
        },
        renderComponent: ListCellActionsComponent,
      },
      name: {
        title: 'Name',
      },
      vle_activity_type: {
        title: 'Type',
      },
      description: {
        title: 'Description',
      },
      start: {
        title: 'Start',
      },
      end: {
        title: 'End',
      },
    },
    actions: {
      edit: false,
      add: false,
      delete: false,
    },
    mode: 'external',
    pager: {
      display: true,
      perPage: 10,
    },
  };

  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      if (params['id'] != null) {
        this.course = params['id'];
      } else {
        router.navigate(['../'], { relativeTo: this.route });
      }
    });
  }

  ngOnInit(): void {
    this.authService.getInstitution().subscribe(id => {
      this.endPoint = `/institution/${id}/course/${this.course}/activity`
      this.loading = false
    })

  }

}
