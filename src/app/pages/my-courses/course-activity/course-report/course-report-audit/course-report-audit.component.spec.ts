import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NbAuthModule } from '@nebular/auth';
import { NbCardModule, NbButtonModule, NbIconModule, NbActionsModule, NbTabsetModule } from '@nebular/theme';
import { TranslateModule } from '@ngx-translate/core';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { AuthService } from '../../../../../@core/auth/auth.service';
import { AuthServiceTesting } from '../../../../../@core/auth/auth.service.mock';
import { EnvService } from '../../../../../@core/env/env.service';
import { ThemeModule } from '../../../../../@theme/theme.module';

import { CourseReportAuditComponent } from './course-report-audit.component';

describe('CourseReportAuditComponent', () => {
  let component: CourseReportAuditComponent;
  let fixture: ComponentFixture<CourseReportAuditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseReportAuditComponent ],
      imports: [
        NbAuthModule.forRoot(),
        HttpClientTestingModule,
        RouterTestingModule,
        TranslateModule.forRoot(),
        ThemeModule,
        NbCardModule,
        NbButtonModule,
        NbIconModule,
        NbActionsModule,
        NbTabsetModule,
        CarouselModule,
      ],
      providers: [
          ThemeModule.forRoot().providers,
          { provide: AuthService, useClass: AuthServiceTesting },
          EnvService,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseReportAuditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
