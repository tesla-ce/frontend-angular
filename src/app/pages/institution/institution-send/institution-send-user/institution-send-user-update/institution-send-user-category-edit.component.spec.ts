import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NbCardModule, NbDatepickerModule, NbDialogModule } from '@nebular/theme';
import { AuthService } from '../../../../../@core/auth/auth.service';
import { AuthServiceTesting } from '../../../../../@core/auth/auth.service.mock';
import { EnvService } from '../../../../../@core/env/env.service';
import { ApiServiceTesting } from '../../../../../@core/mock/api.service.mock';
import { ThemeModule } from '../../../../../@theme/theme.module';
import { InstitutionSendUserCategoryEditComponent } from './institution-send-user-category-edit.component';

describe('InstitutionSendUserCategoryEditComponent', () => {
  let component: InstitutionSendUserCategoryEditComponent;
  let fixture: ComponentFixture<InstitutionSendUserCategoryEditComponent>;
  let httpMock: HttpTestingController;
  const apiServiceTesting =  new ApiServiceTesting(new EnvService());

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstitutionSendUserCategoryEditComponent ],
      imports: [
        RouterTestingModule,
        NbCardModule,
        NbDatepickerModule.forRoot(),
        HttpClientTestingModule,
        NbDialogModule.forRoot(),
      ],
      providers: [
        { provide: AuthService, useClass: AuthServiceTesting },
        ThemeModule.forRoot().providers,
        EnvService,
      ]
    })
    .compileComponents();
    httpMock = TestBed.get(HttpTestingController);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstitutionSendUserCategoryEditComponent);
    component = fixture.componentInstance;
    component.userId = 1,
    component.institutionId = 1,
    component.sendUserCategoryId = 1,
    fixture.detectChanges();
  });

  it('should create', () => {
    const getInstrumentsResponse: any = apiServiceTesting.getData('/institution/1/instrument/');
    const getInstrumentsRequest = httpMock.expectOne(apiServiceTesting.getUrl('/institution/1/instrument/'));
    getInstrumentsRequest.flush(getInstrumentsResponse);
    expect(component).toBeTruthy();
  });

  it('should select category', () => {
    component.selectCategory({data:{
      category: 1,
      description: 'test',
      data: {
        enabled_options: [],
        disabled_instruments: [],
      },
    }})
    expect(component).toBeTruthy();
  });

  it('should save category', () => {
    const getInstrumentsResponse: any = apiServiceTesting.getData('/institution/1/instrument/');
    const getInstrumentsRequest = httpMock.expectOne(apiServiceTesting.getUrl('/institution/1/instrument/'));
    getInstrumentsRequest.flush(getInstrumentsResponse);
    component.selectedCategory = {
      category: 1,
      description: 'test',
      data: {
        enabled_options: [],
        disabled_instruments: [],
      }
    };
    component.selectedDate = new Date();
    fixture.detectChanges();
    component.onSave();
    const updateSendUserCategory = httpMock.expectOne(apiServiceTesting.getUrl('/institution/1/learner/1/send/1/'));
    expect(updateSendUserCategory.request.method).toBe('PATCH');
    updateSendUserCategory.flush(true);
    expect(component).toBeTruthy();
  });
});
