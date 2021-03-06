import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NbButtonModule, NbCardModule, NbActionsModule, NbIconModule } from '@nebular/theme';
import { TranslateModule } from '@ngx-translate/core';
import { ThemeModule } from '../../../@theme/theme.module';

import { StatisticsDefaultComponent } from './statistics-default.component';

describe('StatisticsDefaultComponent', () => {
  let component: StatisticsDefaultComponent;
  let fixture: ComponentFixture<StatisticsDefaultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatisticsDefaultComponent ],
      imports: [ TranslateModule.forRoot(),
        ThemeModule,
        NbButtonModule,
        NbCardModule,
        NbActionsModule,
        NbIconModule,
      ],
      providers: [ ThemeModule.forRoot().providers ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatisticsDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
