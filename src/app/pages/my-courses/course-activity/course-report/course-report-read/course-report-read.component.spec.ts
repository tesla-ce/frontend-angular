import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NbAuthModule } from '@nebular/auth';
import { NbCardModule, NbButtonModule, NbInputModule, NbSelectModule, NbToggleModule, NbFormFieldModule, NbIconModule, NbActionsModule } from '@nebular/theme';
import { TranslateModule } from '@ngx-translate/core';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { NgxEchartsModule } from 'ngx-echarts';
import { AuthService } from '../../../../../@core/auth/auth.service';
import { AuthServiceTesting } from '../../../../../@core/auth/auth.service.mock';
import { EnvService } from '../../../../../@core/env/env.service';
import { ThemeModule } from '../../../../../@theme/theme.module';
import { ListModule } from '../../../../../crud/list/list.module';
import { SharedModule } from '../../../../../shared/shared.module';
import { SideMenuModule } from '../../../../../side-menu/side-menu.module';

import { CourseReportReadComponent } from './course-report-read.component';

describe('CourseReportReadComponent', () => {
  let component: CourseReportReadComponent;
  let fixture: ComponentFixture<CourseReportReadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseReportReadComponent ],
      imports: [
        NbAuthModule.forRoot(),
        HttpClientTestingModule,
        RouterTestingModule,
        TranslateModule.forRoot(),
        ThemeModule,
        FormsModule,
        ReactiveFormsModule,
        SideMenuModule,
        NbCardModule,
        NbButtonModule,
        NbInputModule,
        NbSelectModule,
        NbToggleModule,
        NbFormFieldModule,
        RxReactiveFormsModule,
        NbIconModule,
        ListModule,
        NbActionsModule,
        SharedModule,
        NbIconModule,
        NgxEchartsModule.forRoot({
          echarts: () => import('echarts')
        })
      ],
      providers: [
        { provide: AuthService, useClass: AuthServiceTesting },
        EnvService,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseReportReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
