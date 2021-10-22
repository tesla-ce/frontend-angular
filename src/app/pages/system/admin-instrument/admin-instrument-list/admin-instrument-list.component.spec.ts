import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminInstrumentListComponent } from './admin-instrument-list.component';

describe('AdminInstrumentListComponent', () => {
  let component: AdminInstrumentListComponent;
  let fixture: ComponentFixture<AdminInstrumentListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminInstrumentListComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminInstrumentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
