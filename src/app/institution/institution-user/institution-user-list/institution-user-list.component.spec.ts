import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstitutionUserListComponent } from './institution-user-list.component';

describe('InstitutionUserListComponent', () => {
  let component: InstitutionUserListComponent;
  let fixture: ComponentFixture<InstitutionUserListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstitutionUserListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstitutionUserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
