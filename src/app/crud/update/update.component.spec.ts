import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Subject } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';
import { UpdateComponent } from './update.component';
import { ThemeModule } from '../../@theme/theme.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NbAutocompleteModule, NbButtonModule, NbCheckboxModule, NbFormFieldModule, NbInputModule, NbSelectModule } from '@nebular/theme';
import { SelectRemoteModule } from '../inputs/select-remote/select-remote.module';

describe('UpdateComponent', () => {
  let component: UpdateComponent;
  let fixture: ComponentFixture<UpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateComponent ],
      imports: [ TranslateModule.forRoot(),
        ThemeModule,
        FormsModule,
        ReactiveFormsModule,
        NbButtonModule,
        NbInputModule,
        NbAutocompleteModule,
        NbSelectModule,
        NbFormFieldModule,
        NbCheckboxModule,
        SelectRemoteModule,
      ],
      providers: [ ThemeModule.forRoot().providers ]
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
        },
        email: {
          creable: true,
          showable: true,
          editable: true,
          key: 'email',
          dataType: 'string',
          label: 'ENTITIES.USER.EMAIL',
          inputType: 'email',
          inputName: 'email-input-name',
          formControlName: 'email-form-control-name',
          placeholder: 'joedoe@example.com',
          required: true,
        },
    };
    component.instance = {
        username: 'Joe Doe',
        email: 'joe@doe.com',
    }
    component.errors = new Subject();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should submit', () => {
    fixture.detectChanges();
    component.onSubmit();
    expect(component).toBeTruthy();
  });
});
