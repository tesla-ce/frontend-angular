import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Subject } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';
import { CreateComponent } from './create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NbButtonModule, NbInputModule, NbAutocompleteModule, NbSelectModule, NbDatepickerModule, NbFormFieldModule, NbCheckboxModule } from '@nebular/theme';
import { ThemeModule } from '../../@theme/theme.module';
import { SelectRemoteModule } from '../inputs/select-remote/select-remote.module';

describe('CreateComponent', () => {
  let component: CreateComponent;
  let fixture: ComponentFixture<CreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateComponent ],
      imports: [ TranslateModule.forRoot(),
        ThemeModule,
        FormsModule,
        ReactiveFormsModule,
        NbButtonModule,
        NbInputModule,
        NbAutocompleteModule,
        NbSelectModule,
        NbDatepickerModule,
        NbFormFieldModule,
        NbCheckboxModule,
        SelectRemoteModule,
      ],
      providers: [ ThemeModule.forRoot().providers ]
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

  it('should submit form', () => {
    component.onSubmit();
    expect(component).toBeTruthy();
  });
});
