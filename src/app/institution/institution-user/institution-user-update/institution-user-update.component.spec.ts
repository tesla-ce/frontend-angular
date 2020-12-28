import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstitutionUserUpdateComponent } from './institution-user-update.component';

describe('InstitutionUserUpdateComponent', () => {
  let component: InstitutionUserUpdateComponent;
  let fixture: ComponentFixture<InstitutionUserUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstitutionUserUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstitutionUserUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
