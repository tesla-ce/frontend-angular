import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminInstitutionListComponent } from './admin-institution-list.component';

describe('AdminInstitutionListComponent', () => {
  let component: AdminInstitutionListComponent;
  let fixture: ComponentFixture<AdminInstitutionListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminInstitutionListComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminInstitutionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
