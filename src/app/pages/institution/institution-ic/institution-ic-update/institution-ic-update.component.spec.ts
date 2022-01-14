import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NbAuthModule } from '@nebular/auth';
import { NbThemeModule, NbToastrModule, NbWindowModule } from '@nebular/theme';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService } from '../../../../@core/auth/auth.service';
import { EnvService } from '../../../../@core/env/env.service';

import { InstitutionIcUpdateComponent } from './institution-ic-update.component';

describe('InstitutionIcUpdateComponent', () => {
  let component: InstitutionIcUpdateComponent;
  let fixture: ComponentFixture<InstitutionIcUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstitutionIcUpdateComponent ],
      imports: [ RouterTestingModule,
        NbAuthModule.forRoot(),
        HttpClientTestingModule,
        NbWindowModule.forRoot(),
        TranslateModule.forRoot(),
        NbToastrModule.forRoot(),
       ],
      providers: [ AuthService,
        NbThemeModule.forRoot().providers,
        EnvService ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstitutionIcUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
