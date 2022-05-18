import { Location } from '@angular/common';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NbCardModule, NbButtonModule, NbInputModule, NbSelectModule, NbFormFieldModule, NbCheckboxModule, NbIconModule, NbActionsModule } from '@nebular/theme';
import { of } from 'rxjs';
import { EnvService } from '../../../../@core/env/env.service';
import { ApiServiceTesting } from '../../../../@core/mock/api.service.mock';
import { ThemeModule } from '../../../../@theme/theme.module';
import { ReadModule } from '../../../../crud/read/read.module';
import { SideMenuModule } from '../../../../side-menu/side-menu.module';

import { AdminInstrumentReadComponent } from './admin-instrument-read.component';

describe('AdminInstrumentReadComponent', () => {
  let component: AdminInstrumentReadComponent;
  let fixture: ComponentFixture<AdminInstrumentReadComponent>;
  let httpMock: HttpTestingController;
  const apiServiceTesting =  new ApiServiceTesting(new EnvService());
  const locationStub = {
    back: jasmine.createSpy('back')
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminInstrumentReadComponent ],
      imports: [
            RouterTestingModule,
            HttpClientTestingModule,
            ThemeModule,
            FormsModule,
            ReactiveFormsModule,
            SideMenuModule,
            NbCardModule,
            NbButtonModule,
            NbInputModule,
            NbSelectModule,
            NbFormFieldModule,
            NbCheckboxModule,
            NbIconModule,
            NbActionsModule,
            ReadModule,
      ],
      providers: [
          EnvService,
          { provide: Location, useValue: locationStub},
          {
            provide: ActivatedRoute,
            useValue: {
              params: of({
                id: 1,
              }),
            },
          },
      ]
    })
    .compileComponents();
    httpMock = TestBed.get(HttpTestingController);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminInstrumentReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create', () => {
    const userResponse: any = apiServiceTesting.getData('/admin/user/1/');
    const getRequest = httpMock.expectOne(apiServiceTesting.getUrl('/admin/user/1/'));
    getRequest.flush(userResponse);
    expect(component).toBeTruthy();
  });

  it('should call back method', async () => {
    component.back();
    const location = fixture.debugElement.injector.get(Location);
    expect(location.back).toHaveBeenCalled();
  });
});
