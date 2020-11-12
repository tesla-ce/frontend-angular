import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateIcComponent } from './create-ic.component';

describe('CreateIcComponent', () => {
  let component: CreateIcComponent;
  let fixture: ComponentFixture<CreateIcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateIcComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateIcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
