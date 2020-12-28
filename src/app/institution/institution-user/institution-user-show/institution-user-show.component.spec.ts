import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstitutionUserShowComponent } from './institution-user-show.component';

describe('InstitutionUserShowComponent', () => {
  let component: InstitutionUserShowComponent;
  let fixture: ComponentFixture<InstitutionUserShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstitutionUserShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstitutionUserShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
