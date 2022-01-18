import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';

import { StatisticsDefaultComponent } from './statistics-default.component';

describe('StatisticsDefaultComponent', () => {
  let component: StatisticsDefaultComponent;
  let fixture: ComponentFixture<StatisticsDefaultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatisticsDefaultComponent ],
      imports: [ TranslateModule.forRoot() ]
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
