import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NbCardModule, NbButtonModule, NbInputModule, NbSelectModule, NbActionsModule, NbFormFieldModule, NbIconModule } from '@nebular/theme';
import { ThemeModule } from '../../../../@theme/theme.module';
import { CreateModule } from '../../../../crud/create/create.module';
import { ListModule } from '../../../../crud/list/list.module';
import { ReadModule } from '../../../../crud/read/read.module';
import { UpdateModule } from '../../../../crud/update/update.module';
import { SideMenuModule } from '../../../../side-menu/side-menu.module';
import { InstitutionSendCategoryComponent } from './institution-send-category.component';

describe('InstitutionSendCategoryComponent', () => {
  let component: InstitutionSendCategoryComponent;
  let fixture: ComponentFixture<InstitutionSendCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstitutionSendCategoryComponent ],
      imports: [
        ThemeModule,
        FormsModule,
        ReactiveFormsModule,
        SideMenuModule,
        NbCardModule,
        NbButtonModule,
        NbInputModule,
        NbSelectModule,
        NbActionsModule,
        NbFormFieldModule,
        RouterTestingModule,
        NbIconModule,
        ListModule,
        CreateModule,
        ReadModule,
        UpdateModule,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstitutionSendCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
