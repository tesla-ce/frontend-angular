import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstitutionSendComponent } from './institution-send.component';

describe('InstitutionSendComponent', () => {
  let component: InstitutionSendComponent;
  let fixture: ComponentFixture<InstitutionSendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InstitutionSendComponent],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstitutionSendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
