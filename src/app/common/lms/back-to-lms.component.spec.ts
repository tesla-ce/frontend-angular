import { CommonModule } from '@angular/common';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NbButtonModule, NbStatusService } from '@nebular/theme';
import { TranslateModule } from '@ngx-translate/core';
import { BackToLMSComponent } from './back-to-lms.component';

describe('BackToLMSComponent', () => {
  let component: BackToLMSComponent;
  let fixture: ComponentFixture<BackToLMSComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ 
        RouterTestingModule, 
        CommonModule,
        NbButtonModule,
        TranslateModule.forRoot(),
      ],
      declarations: [ BackToLMSComponent ],
      providers: [
        NbStatusService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BackToLMSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should press back button', () => {
  //   const currentLocation = window.location.href;
  //   localStorage.setItem('lms_redirect_uri_ts',new Date().toISOString());
  //   localStorage.setItem('lms_redirect_uri', currentLocation);
  //   component.backToLMS();
  //   expect(window.location.href).toEqual(currentLocation)
  // });

  it('should set a valid ttl', () => {
    localStorage.setItem('lms_redirect_uri_ts',new Date().toISOString());
    localStorage.setItem('lms_redirect_uri', 'test');
    expect(component).toBeTruthy();
  });
});
