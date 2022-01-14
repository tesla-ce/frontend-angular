import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NbAuthModule } from '@nebular/auth';
import { NbThemeModule, NbToastrModule } from '@nebular/theme';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService } from '../../../../@core/auth/auth.service';
import { EnvService } from '../../../../@core/env/env.service';

import { InstitutionUserCreateComponent } from './institution-user-create.component';

describe('InstitutionUserCreateComponent', () => {
  let component: InstitutionUserCreateComponent;
  let fixture: ComponentFixture<InstitutionUserCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstitutionUserCreateComponent ],
      imports: [ HttpClientTestingModule,
        NbAuthModule.forRoot(),
        RouterTestingModule,
        NbToastrModule.forRoot(),
        TranslateModule.forRoot() ],
      providers: [ NbThemeModule.forRoot().providers,
        EnvService,
        AuthService ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstitutionUserCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
