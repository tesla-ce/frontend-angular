import { DatePipe } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NbAuthModule } from '@nebular/auth';
import { NbDialogModule, NbToastrModule } from '@nebular/theme';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService } from '../../../../../@core/auth/auth.service';
import { EnvService } from '../../../../../@core/env/env.service';
import { ThemeModule } from '../../../../../@theme/theme.module';

import { InstitutionSendUserReadComponent } from './institution-send-user-read.component';

describe('InstitutionSendUserReadComponent', () => {
  let component: InstitutionSendUserReadComponent;
  let fixture: ComponentFixture<InstitutionSendUserReadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstitutionSendUserReadComponent ],
      imports: [ RouterTestingModule,
        HttpClientTestingModule,
        NbAuthModule.forRoot(),
        TranslateModule.forRoot(),
        NbDialogModule.forRoot(),
        NbToastrModule.forRoot(),
    ],
      providers: [ ThemeModule.forRoot().providers,
        EnvService,
        AuthService,
        DatePipe ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstitutionSendUserReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
