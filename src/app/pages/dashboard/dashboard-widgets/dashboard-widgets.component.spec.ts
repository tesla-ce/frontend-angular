import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { JsonFormsModule } from '@jsonforms/angular';
import { JsonFormsAngularMaterialModule } from '@jsonforms/angular-material';
import { NbAuthModule } from '@nebular/auth';
import { NbButtonModule, NbCardModule, NbListModule, NbTreeGridModule, NbInputModule, NbIconModule, NbCalendarModule } from '@nebular/theme';
import { TranslateModule } from '@ngx-translate/core';
import { GridsterModule } from 'angular-gridster2';
import { AuthService } from '../../../@core/auth/auth.service';
import { AuthServiceTesting } from '../../../@core/auth/auth.service.mock';
import { EnvService } from '../../../@core/env/env.service';
import { ThemeModule } from '../../../@theme/theme.module';

import { DashboardWidgetsComponent } from './dashboard-widgets.component';

describe('DashboardWidgetsComponent', () => {
  let component: DashboardWidgetsComponent;
  let fixture: ComponentFixture<DashboardWidgetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardWidgetsComponent ],
      imports: [ 
        HttpClientTestingModule,
        NbAuthModule.forRoot(),
        RouterTestingModule,
        TranslateModule.forRoot(),
        ThemeModule,
        NbButtonModule,
        NbCardModule,
        NbListModule,
        NbTreeGridModule,
        NbInputModule,
        NbIconModule,
        JsonFormsModule,
        JsonFormsAngularMaterialModule,
        GridsterModule,
        NbCalendarModule,
      ],
      providers: [ { provide: AuthService, useClass: AuthServiceTesting },
        EnvService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardWidgetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call all methods', () => {
    component.items = [{x:1,y:2,rows:1,cols:1}]
    component.changedOptions();
    component.removeItem(new TouchEvent('test'),{x:1,y:2,rows:1,cols:1});
    expect(component).toBeTruthy();
  });
});
