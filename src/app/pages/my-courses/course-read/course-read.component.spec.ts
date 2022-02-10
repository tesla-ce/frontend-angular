import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NbAuthModule } from '@nebular/auth';
import { NbActionsModule, NbButtonModule, NbCardModule, NbIconModule, NbWindowModule } from '@nebular/theme';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService } from '../../../@core/auth/auth.service';
import { AuthServiceTesting } from '../../../@core/auth/auth.service.mock';
import { EnvService } from '../../../@core/env/env.service';
import { ThemeModule } from '../../../@theme/theme.module';
import { ListModule } from '../../../crud/list/list.module';
import { SideMenuModule } from '../../../side-menu/side-menu.module';

import { CourseReadComponent } from './course-read.component';

describe('CourseReadComponent', () => {
  let component: CourseReadComponent;
  let fixture: ComponentFixture<CourseReadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseReadComponent ],
      imports: [
          NbWindowModule.forRoot(),
          RouterTestingModule,
          NbAuthModule.forRoot(),
          HttpClientTestingModule,
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
        { provide: AuthService, useClass: AuthServiceTesting },
          EnvService,
          ThemeModule.forRoot().providers,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
