import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SelectRemoteComponent } from './select-remote.component';
import { EnvService } from '../../../@core/env/env.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NbAutocompleteModule, NbInputModule } from '@nebular/theme';
import { ThemeModule } from '../../../@theme/theme.module';

describe('SelectRemoteComponent', () => {
  let component: SelectRemoteComponent;
  let fixture: ComponentFixture<SelectRemoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectRemoteComponent ],
      imports: [ 
        HttpClientTestingModule,
        CommonModule,
        NbAutocompleteModule,
        NbInputModule,
        ReactiveFormsModule,
        FormsModule,
      ] ,
      providers: [ EnvService, ThemeModule.forRoot().providers ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectRemoteComponent);
    component = fixture.componentInstance;
    component.field = {
        creable: true,
        showable: true,
        editable: false,
        key: 'institution_id',
        dataType: 'object',
        label: 'ENTITIES.USER.INSTITUTION',
        inputType: 'select-remote',
        search: 'search',
        optionLabelAccessor: 'name',
        optionValueAccessor: 'id',
        inputName: 'institution-input-name',
        formControlName: 'institution-form-control-name',
        placeholder: 'uoc', 
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
