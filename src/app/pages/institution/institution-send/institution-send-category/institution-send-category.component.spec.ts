import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { InstitutionSendCategoryComponent } from './institution-send-category.component';

describe('InstitutionSendCategoryComponent', () => {
  let component: InstitutionSendCategoryComponent;
  let fixture: ComponentFixture<InstitutionSendCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstitutionSendCategoryComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstitutionSendCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
