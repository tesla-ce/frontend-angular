import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NbAuthModule } from '@nebular/auth';
import { NbLayoutScrollService, NbOverlayModule, NbToastrModule, NbToastrService } from '@nebular/theme';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService } from '../../../../@core/auth/auth.service';
import { EnvService } from '../../../../@core/env/env.service';

import { InstitutionIcCreateComponent } from './institution-ic-create.component';

describe('InstitutionIcCreateComponent', () => {
  let component: InstitutionIcCreateComponent;
  let fixture: ComponentFixture<InstitutionIcCreateComponent>;
  const toastrService = {
    success: null,
    error: null,
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstitutionIcCreateComponent ],
      imports: [ NbAuthModule.forRoot(),
        NbToastrModule.forRoot(),
        NbOverlayModule.forRoot(),
        HttpClientTestingModule,
        RouterTestingModule,
        TranslateModule.forRoot() ],
      providers: [  { provide: NbToastrService,
        useValue: toastrService },
        AuthService,
        EnvService,
        NbLayoutScrollService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstitutionIcCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
