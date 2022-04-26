import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NbAutocompleteModule, NbButtonModule, NbCheckboxModule, NbFormFieldModule, NbInputModule, NbSelectModule } from '@nebular/theme';
import { TranslateModule } from '@ngx-translate/core';
import { ThemeModule } from '../../@theme/theme.module';
import { SelectRemoteModule } from '../inputs/select-remote/select-remote.module';
import { ReadComponent } from './read.component';

describe('ReadComponent', () => {
  let component: ReadComponent;
  let fixture: ComponentFixture<ReadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReadComponent ],
      imports: [ TranslateModule.forRoot(),
        ThemeModule,
        FormsModule,
        ReactiveFormsModule,
        NbButtonModule,
        NbInputModule,
        NbAutocompleteModule,
        NbCheckboxModule,
        NbSelectModule,
        NbFormFieldModule,
        SelectRemoteModule,
      ],
      providers: [ ThemeModule.forRoot().providers ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadComponent);
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
        username: 'Joe Doe'
    };

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
