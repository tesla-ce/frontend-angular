import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NbCardModule } from '@nebular/theme';
import { TranslateModule } from '@ngx-translate/core';
import { ThemeModule } from '../../../@theme/theme.module';

import { MonitoringDefaultComponent } from './monitoring-default.component';

describe('MonitoringDefaultComponent', () => {
  let component: MonitoringDefaultComponent;
  let fixture: ComponentFixture<MonitoringDefaultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonitoringDefaultComponent ],
      imports: [ 
        TranslateModule.forRoot(),
        NbCardModule,
      ],
      providers: [
        ThemeModule.forRoot().providers,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitoringDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
