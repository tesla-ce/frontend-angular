import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SelectRemoteComponent } from './select-remote.component';
import { EnvService } from '../../../@core/env/env.service';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NbAutocompleteModule, NbInputModule } from '@nebular/theme';
import { ThemeModule } from '../../../@theme/theme.module';
import { ApiServiceTesting } from '../../../@core/mock/api.service.mock';

describe('SelectRemoteComponent', () => {
  let component: SelectRemoteComponent;
  let fixture: ComponentFixture<SelectRemoteComponent>;
  let httpMock: HttpTestingController;
  const apiServiceTesting =  new ApiServiceTesting(new EnvService());

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
    httpMock = TestBed.get(HttpTestingController);
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
    component.parentForm = new FormGroup({
      institution_id: new FormControl('1'),
    });
    component.options = [{id: 1, name: 'test-initial-value'},{id: 2, name: 'test-changed-value'}];
    component.initialValue = {id: 1, name: 'test-initial-value'};
    component.value = 'test';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get mocked options', () => {
    const institutionResponse: any = apiServiceTesting.getData('/institution/?search=test');
    const getRequest = httpMock.match(apiServiceTesting.getUrl('/institution/?search=test'));
    getRequest[0].flush(institutionResponse);
    getRequest[1].flush(institutionResponse);
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should filter existing options', () => {
    component.onModelChange('test');
    expect(component).toBeTruthy();
  });

  it('should filter non existing options', () => {
    component.onModelChange('not-found');
    expect(component).toBeTruthy();
  });

  it('should filter options', () => {
    component.filter('test', component.options);
    expect(component).toBeTruthy();
  });
});
