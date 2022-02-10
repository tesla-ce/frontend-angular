import { DatePipe } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NbAuthModule } from '@nebular/auth';
import { NbCardModule, NbButtonModule, NbIconModule, NbActionsModule } from '@nebular/theme';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService } from '../../../@core/auth/auth.service';
import { AuthServiceTesting } from '../../../@core/auth/auth.service.mock';
import { EnvService } from '../../../@core/env/env.service';
import { ThemeModule } from '../../../@theme/theme.module';
import { ListModule } from '../../../crud/list/list.module';
import { SideMenuModule } from '../../../side-menu/side-menu.module';

import { CourseListComponent } from './course-list.component';

describe('CourseListComponent', () => {
  let component: CourseListComponent;
  let fixture: ComponentFixture<CourseListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CourseListComponent],
      imports: [
          NbAuthModule.forRoot(),
          HttpClientTestingModule,
          RouterTestingModule,
          TranslateModule.forRoot(),
          ThemeModule,
          SideMenuModule,
          NbCardModule,
          NbButtonModule,
          NbIconModule,
          NbActionsModule,
          ListModule,
      ],
      providers: [
          ThemeModule.forRoot().providers,
          { provide: AuthService, useClass: AuthServiceTesting },
          EnvService,
          DatePipe,
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
