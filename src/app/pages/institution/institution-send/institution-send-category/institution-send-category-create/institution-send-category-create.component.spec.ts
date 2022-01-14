import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NbAuthModule } from '@nebular/auth';
import { NbOverlayModule, NbThemeModule, NbToastrModule } from '@nebular/theme';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService } from '../../../../../@core/auth/auth.service';
import { EnvService } from '../../../../../@core/env/env.service';

import { InstitutionSendCategoryCreateComponent } from './institution-send-category-create.component';

describe('InstitutionSendCategoryCreateComponent', () => {
  let component: InstitutionSendCategoryCreateComponent;
  let fixture: ComponentFixture<InstitutionSendCategoryCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstitutionSendCategoryCreateComponent ],
      imports: [ NbAuthModule.forRoot(),
        HttpClientTestingModule,
        RouterTestingModule,
        TranslateModule.forRoot(),
        NbToastrModule.forRoot(),
        NbOverlayModule.forRoot(),
     ],
      providers: [ AuthService,
        NbThemeModule.forRoot().providers,
        EnvService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstitutionSendCategoryCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
