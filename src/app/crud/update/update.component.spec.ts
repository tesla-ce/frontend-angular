import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Subject } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';
import { UpdateComponent } from './update.component';

describe('UpdateComponent', () => {
  let component: UpdateComponent;
  let fixture: ComponentFixture<UpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateComponent ],
      imports: [ TranslateModule.forRoot() ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateComponent);
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
    component.instance = {
        username: 'Joe Doe',
    }
    component.errors = new Subject();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
