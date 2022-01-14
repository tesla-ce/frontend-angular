import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { InstitutionSendUserComponent } from './institution-send-user.component';

describe('InstitutionSendUserComponent', () => {
  let component: InstitutionSendUserComponent;
  let fixture: ComponentFixture<InstitutionSendUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstitutionSendUserComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstitutionSendUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
