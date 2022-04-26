import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NbAuthModule } from '@nebular/auth';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService } from '../../../@core/auth/auth.service';
import { AuthServiceTesting } from '../../../@core/auth/auth.service.mock';
import { EnvService } from '../../../@core/env/env.service';
import { ThemeModule } from '../../../@theme/theme.module';
import { EnrolmentModule } from '../../enrolment/enrolment.module';

import { BiometricComponent } from './biometric.component';

describe('BiometricComponent', () => {
  let component: BiometricComponent;
  let fixture: ComponentFixture<BiometricComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BiometricComponent ],
      imports: [
        EnrolmentModule,
        NbAuthModule.forRoot(),
        HttpClientTestingModule,
        RouterTestingModule,
        TranslateModule.forRoot(),
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
    fixture = TestBed.createComponent(BiometricComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
