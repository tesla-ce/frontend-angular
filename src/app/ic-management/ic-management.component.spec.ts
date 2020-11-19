import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IcManagementComponent } from './ic-management.component';

describe('IcManagementComponent', () => {
  let component: IcManagementComponent;
  let fixture: ComponentFixture<IcManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IcManagementComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IcManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
