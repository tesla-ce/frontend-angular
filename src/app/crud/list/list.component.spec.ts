import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NbButtonModule, NbCardModule, NbDialogModule, NbFormFieldModule, NbIconModule, NbInputModule, NbSelectModule } from '@nebular/theme';
import { TranslateModule } from '@ngx-translate/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { EnvService } from '../../@core/env/env.service';
import { ThemeModule } from '../../@theme/theme.module';

import { ListComponent } from './list.component';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListComponent ],
      imports: [ 
        HttpClientTestingModule,
        RouterTestingModule,
        TranslateModule.forRoot(),
        Ng2SmartTableModule,
        ThemeModule,
        NbIconModule,
        NbSelectModule,
        NbFormFieldModule,
        NbInputModule,
        NbButtonModule,
        NbCardModule,
        NbDialogModule,
      ],
      providers: [ 
        EnvService, 
        ThemeModule.forRoot().providers,
      ],
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
