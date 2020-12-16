import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUserShowComponent } from './admin-user-show.component';

describe('AdminUserShowComponent', () => {
  let component: AdminUserShowComponent;
  let fixture: ComponentFixture<AdminUserShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminUserShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminUserShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
