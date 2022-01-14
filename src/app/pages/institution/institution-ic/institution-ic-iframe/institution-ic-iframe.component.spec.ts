import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NbAuthModule } from '@nebular/auth';
import { AuthService } from '../../../../@core/auth/auth.service';
import { EnvService } from '../../../../@core/env/env.service';
import 'rxjs/add/observable/of';

import { InstitutionIcIframeComponent } from './institution-ic-iframe.component';

describe('InstitutionIcIframeComponent', () => {
  let component: InstitutionIcIframeComponent;
  let fixture: ComponentFixture<InstitutionIcIframeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstitutionIcIframeComponent ],
      imports: [ NbAuthModule.forRoot(), HttpClientTestingModule, RouterTestingModule ],
      providers: [ 
          AuthService,
          EnvService,
     ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstitutionIcIframeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
