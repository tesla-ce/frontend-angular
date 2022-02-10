import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NbCardModule } from '@nebular/theme';
import { TranslateModule } from '@ngx-translate/core';
import { ThemeModule } from '../../../@theme/theme.module';
import { TestDefaultComponent } from './test-default.component';

describe('TestDefaultComponent', () => {
  let component: TestDefaultComponent;
  let fixture: ComponentFixture<TestDefaultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestDefaultComponent ],
      imports: [ TranslateModule.forRoot(),
        ThemeModule,
        NbCardModule,
      ],
      providers: [ ThemeModule.forRoot().providers ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
