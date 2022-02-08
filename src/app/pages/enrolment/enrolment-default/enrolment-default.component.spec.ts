import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NbAuthModule } from '@nebular/auth';
import { NbButtonModule, NbCardModule, NbActionsModule, NbIconModule, NbLayoutModule, NbProgressBarModule } from '@nebular/theme';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService } from '../../../@core/auth/auth.service';
import { AuthServiceTesting } from '../../../@core/auth/auth.service.mock';
import { EnvService } from '../../../@core/env/env.service';
import { ThemeModule } from '../../../@theme/theme.module';
import { EnrolmentStatusModule } from '../../../common/enrolment-status/enrolment-status.module';
import { SideMenuModule } from '../../../side-menu/side-menu.module';
import { EnrolmentRoutingModule } from '../enrolment-routing.module';

import { EnrolmentDefaultComponent } from './enrolment-default.component';

describe('EnrolmentDefaultComponent', () => {
  let component: EnrolmentDefaultComponent;
  let fixture: ComponentFixture<EnrolmentDefaultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnrolmentDefaultComponent ],
      imports: [ 
        EnrolmentRoutingModule,
        ThemeModule,
        SideMenuModule,
        NbButtonModule,
        NbCardModule,
        NbActionsModule,
        NbIconModule,
        EnrolmentStatusModule,
        NbLayoutModule,
        NbProgressBarModule,
        NbAuthModule.forRoot(),
        HttpClientTestingModule,
        RouterTestingModule,
        TranslateModule.forRoot() 
      ],
      providers: [ 
        ThemeModule.forRoot().providers,
        { provide: AuthService, useClass: AuthServiceTesting },
        EnvService 
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnrolmentDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
