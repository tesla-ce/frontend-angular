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

import { InstitutionSendUserUpdateComponent } from './institution-send-user-update.component';

describe('InstitutionSendUserUpdateComponent', () => {
  let component: InstitutionSendUserUpdateComponent;
  let fixture: ComponentFixture<InstitutionSendUserUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstitutionSendUserUpdateComponent ],
      imports: [ RouterTestingModule,
        HttpClientTestingModule,
        NbAuthModule.forRoot(),
        TranslateModule.forRoot(),
        NbDialogModule.forRoot(),
        NbToastrModule.forRoot()
    ],
      providers: [ EnvService,
        AuthService,
        DatePipe,
        ThemeModule.forRoot().providers ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstitutionSendUserUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
