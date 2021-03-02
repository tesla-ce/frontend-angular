import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstitutionUserCreateComponent } from './institution-user-create.component';

describe('InstitutionUserCreateComponent', () => {
  let component: InstitutionUserCreateComponent;
  let fixture: ComponentFixture<InstitutionUserCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstitutionUserCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstitutionUserCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
