import { CommonModule } from '@angular/common';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NbButtonModule } from '@nebular/theme';
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
});
