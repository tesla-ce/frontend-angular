import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../../@core/auth/auth.service';
import { Dashboard } from '../../@core/models/dashboard';
import { User } from '../../@core/models/user';
import {Course} from '../../@core/models/course';
import {ApiCourseService} from '../../@core/data/api-course.service';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {

  private readonly DASHBOARDS = 'assets/dashboards.json';
  currentUser: User;

  constructor(protected httpClient: HttpClient, private authService: AuthService, private courseService: ApiCourseService,
  ) {
    this.authService.getUser().subscribe(user => {
      this.currentUser = user;
    });
  }

  public getDashboards(): Observable<Dashboard[]> {
    return this.httpClient.get<Dashboard[]>(this.DASHBOARDS);
  }

  public getUserDashboard(): Observable<Dashboard> {
    return this.getDashboard('4');
  }

  public getUser(): Observable<User> {
    return this.authService.getUser();
  }

  public getDashboard(dashboardId: string): Observable<Dashboard>  {

    return this.httpClient.get<Dashboard[]>(this.DASHBOARDS).pipe(
      map((dashboards: Dashboard[]) =>
        dashboards.find(dashboard => dashboard.id === dashboardId)));
  }

  public getUserActiveCourses(): Observable<Course[]> {
    return this.courseService.getCourses(this.currentUser.institution.id);
  }
}
