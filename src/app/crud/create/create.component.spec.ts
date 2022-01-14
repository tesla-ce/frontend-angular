import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Subject } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';
import { CreateComponent } from './create.component';

describe('CreateComponent', () => {
  let component: CreateComponent;
  let fixture: ComponentFixture<CreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateComponent ],
      imports: [ TranslateModule.forRoot() ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateComponent);
    component = fixture.componentInstance;
    component.fields = {
        username: {
          creable: true,
          showable: true,
          editable: true,
          key: 'username',
          dataType: 'string',
          label: 'ENTITIES.USER.USERNAME',
          inputType: 'text',
          inputName: 'username-input-name',
          formControlName: 'username-form-control-name',
          placeholder: 'joedoe',
          required: true,
        }
    };
    component.errors = new Subject();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
