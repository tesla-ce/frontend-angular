import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { EnvService } from '../../@core/env/env.service';

import { ListComponent } from './list.component';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  const fakeActivatedRoute = {
    snapshot: { data: {  } }
  } as ActivatedRoute;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListComponent ],
      imports: [ HttpClientTestingModule, RouterTestingModule, TranslateModule.forRoot() ],
      providers: [ EnvService, {provide: ActivatedRoute, useValue: fakeActivatedRoute} ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    component.settings = {
        username: {
        creable: true,
        showable: true,
        editable: true,
        key: 'username',
        dataType: 'string',
        label: 'ENTITIES.USER.USERNAME',
        inputType: 'text',
        inputName: 'username-input-name',
        formControlName: 'username-form-control-name',
        placeholder: 'joedoe',
        required: true,
        },
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
