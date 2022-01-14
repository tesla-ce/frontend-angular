import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NbAuthModule } from '@nebular/auth';
import { NbOverlayModule, NbThemeModule, NbToastrModule } from '@nebular/theme';
import { AuthService } from '../../../../../@core/auth/auth.service';
import { EnvService } from '../../../../../@core/env/env.service';

import { InstitutionSendCategoryUpdateComponent } from './institution-send-category-update.component';

describe('InstitutionSendCategoryUpdateComponent', () => {
  let component: InstitutionSendCategoryUpdateComponent;
  let fixture: ComponentFixture<InstitutionSendCategoryUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstitutionSendCategoryUpdateComponent ],
      imports: [ RouterTestingModule, HttpClientTestingModule, NbAuthModule.forRoot(), NbToastrModule.forRoot() ],
      providers: [ EnvService,
        NbThemeModule.forRoot().providers,
        AuthService ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstitutionSendCategoryUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
