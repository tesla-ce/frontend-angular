import { NgModule } from '@angular/core';

import { ThemeModule } from '../../../../@theme/theme.module';
import {
  NbButtonModule,
  NbCardModule,
  NbInputModule,
  NbSelectModule,
  NbIconModule,
  NbFormFieldModule,
} from '@nebular/theme';

import { InstitutionSendCategoryComponent } from './institution-send-category.component';
import { InstitutionSendCategoryRoutingModule } from './institution-send-category-routing.module';
import { SideMenuModule } from '../../../../side-menu/side-menu.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ListModule } from '../../../../crud/list/list.module';
import { CreateModule } from '../../../../crud/create/create.module';
import { InstitutionSendCategoryCreateComponent } from './institution-send-category-create/institution-send-category-create.component';
import { InstitutionSendCategoryUpdateComponent } from './institution-send-category-update/institution-send-category-update.component';
import { InstitutionSendCategoryReadComponent } from './institution-send-category-read/institution-send-category-read.component';
import { InstitutionSendCategoryListComponent } from './institution-send-category-list/institution-send-category-list.component';
import { ReadModule } from '../../../../crud/read/read.module';
import { UpdateModule } from '../../../../crud/update/update.module';

@NgModule({
  imports: [
    InstitutionSendCategoryRoutingModule,
    ThemeModule,
    FormsModule,
    ReactiveFormsModule,
    SideMenuModule,
    NbCardModule,
    NbButtonModule,
    NbInputModule,
    NbSelectModule,
    NbFormFieldModule,
    NbIconModule,
    ListModule,
    CreateModule,
    ReadModule,
    UpdateModule,
  ],
  declarations: [
    InstitutionSendCategoryComponent,
    InstitutionSendCategoryCreateComponent,
    InstitutionSendCategoryUpdateComponent,
    InstitutionSendCategoryReadComponent,
    InstitutionSendCategoryListComponent,
  ],
})
export class InstitutionSendCategoryModule {
}
