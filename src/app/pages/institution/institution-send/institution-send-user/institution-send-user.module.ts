import { NgModule } from '@angular/core';

import { ThemeModule } from '../../../../@theme/theme.module';
import {
  NbButtonModule,
  NbCardModule,
  NbInputModule,
  NbSelectModule,
  NbDatepickerModule,
  NbIconModule,
  NbFormFieldModule,
  NbActionsModule,
} from '@nebular/theme';

import { InstitutionSendUserComponent } from './institution-send-user.component';
import { InstitutionSendUserRoutingModule } from './institution-send-user-routing.module';
import { SideMenuModule } from '../../../../side-menu/side-menu.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ListModule } from '../../../../crud/list/list.module';
import { CreateModule } from '../../../../crud/create/create.module';
import { InstitutionSendUserUpdateComponent } from './institution-send-user-update/institution-send-user-update.component';
import { InstitutionSendUserReadComponent } from './institution-send-user-read/institution-send-user-read.component';
import { InstitutionSendUserListComponent } from './institution-send-user-list/institution-send-user-list.component';
import { ReadModule } from '../../../../crud/read/read.module';
import { UpdateModule } from '../../../../crud/update/update.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { InstitutionSendUserCategoryAddComponent } from './institution-send-user-update/institution-send-user-category-add.component';
import { InstitutionSendUserCategoryEditComponent } from './institution-send-user-update/institution-send-user-category-edit.component';
import { SharedModule } from '../../../../shared/shared.module';

@NgModule({
  imports: [
    InstitutionSendUserRoutingModule,
    ThemeModule,
    FormsModule,
    ReactiveFormsModule,
    SideMenuModule,
    NbCardModule,
    NbButtonModule,
    NbInputModule,
    NbSelectModule,
    NbIconModule,
    NbActionsModule,
    NbFormFieldModule,
    NbDatepickerModule,
    NbIconModule,
    ListModule,
    CreateModule,
    ReadModule,
    UpdateModule,
    Ng2SmartTableModule,
    SharedModule,
  ],
  declarations: [
    InstitutionSendUserComponent,
    InstitutionSendUserUpdateComponent,
    InstitutionSendUserReadComponent,
    InstitutionSendUserListComponent,
    InstitutionSendUserCategoryAddComponent,
    InstitutionSendUserCategoryEditComponent,
  ],
})
export class InstitutionSendUserModule {
}
