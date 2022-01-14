import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NbAuthModule } from '@nebular/auth';
import { AuthService } from '../../../../../@core/auth/auth.service';
import { EnvService } from '../../../../../@core/env/env.service';

import { InstitutionSendCategoryReadComponent } from './institution-send-category-read.component';

describe('InstitutionSendCategoryReadComponent', () => {
  let component: InstitutionSendCategoryReadComponent;
  let fixture: ComponentFixture<InstitutionSendCategoryReadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstitutionSendCategoryReadComponent ],
      imports: [ RouterTestingModule, HttpClientTestingModule, NbAuthModule.forRoot() ],
      providers: [ EnvService, AuthService ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstitutionSendCategoryReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
