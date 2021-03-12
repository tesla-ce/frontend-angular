import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstitutionIcListComponent } from './institution-ic-list.component';

describe('InstitutionIcListComponent', () => {
  let component: InstitutionIcListComponent;
  let fixture: ComponentFixture<InstitutionIcListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstitutionIcListComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstitutionIcListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
