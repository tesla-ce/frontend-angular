import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NbAuthModule } from '@nebular/auth';
import { NbThemeModule, NbToastrModule } from '@nebular/theme';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService } from '../../../../../@core/auth/auth.service';
import { EnvService } from '../../../../../@core/env/env.service';

import { InstitutionSendCategoryListComponent } from './institution-send-category-list.component';

describe('InstitutionSendCategoryListComponent', () => {
  let component: InstitutionSendCategoryListComponent;
  let fixture: ComponentFixture<InstitutionSendCategoryListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstitutionSendCategoryListComponent ],
      imports: [ NbAuthModule.forRoot(),
        HttpClientTestingModule,
        RouterTestingModule,
        TranslateModule.forRoot(),
        NbToastrModule.forRoot() ],
      providers: [ AuthService,
        NbThemeModule.forRoot().providers,
        EnvService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstitutionSendCategoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
