import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstitutionIcCreateComponent } from './institution-ic-create.component';

describe('InstitutionIcCreateComponent', () => {
  let component: InstitutionIcCreateComponent;
  let fixture: ComponentFixture<InstitutionIcCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstitutionIcCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstitutionIcCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
