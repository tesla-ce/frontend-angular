import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NbCardModule, NbDatepickerModule, NbDialogModule } from '@nebular/theme';
import { AuthService } from '../../../../../@core/auth/auth.service';
import { AuthServiceTesting } from '../../../../../@core/auth/auth.service.mock';
import { EnvService } from '../../../../../@core/env/env.service';
import { ApiServiceTesting } from '../../../../../@core/mock/api.service.mock';
import { InstitutionSendUserCategoryAddComponent } from './institution-send-user-category-add.component';

describe('InstitutionSendUserCategoryAddComponent', () => {
  let component: InstitutionSendUserCategoryAddComponent;
  let fixture: ComponentFixture<InstitutionSendUserCategoryAddComponent>;
  let httpMock: HttpTestingController;
  const apiServiceTesting =  new ApiServiceTesting(new EnvService());

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstitutionSendUserCategoryAddComponent ],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        NbCardModule,
        NbDatepickerModule,
        NbDialogModule.forRoot(),
      ],
      providers: [
        { provide: AuthService, useClass: AuthServiceTesting },
        EnvService,
      ]
    })
    .compileComponents();
    httpMock = TestBed.get(HttpTestingController);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstitutionSendUserCategoryAddComponent);
    component = fixture.componentInstance;
    component.userId = 1,
    component.institutionId = 1,
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
    component.selectedCategory = {
      category: 1,
      description: 'test',
      data: {
        enabled_options: [],
        disabled_instruments: [],
      }
    };
    component.selectedDate = new Date();
    component.onSave();
    const createSendUserCategory = httpMock.expectOne(apiServiceTesting.getUrl('/institution/1/learner/1/send/'));
    createSendUserCategory.flush(true);
    expect(component).toBeTruthy();
  });
});
