import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstitutionIcComponent } from './institution-ic.component';

describe('InstitutionIcComponent', () => {
  let component: InstitutionIcComponent;
  let fixture: ComponentFixture<InstitutionIcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstitutionIcComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstitutionIcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
