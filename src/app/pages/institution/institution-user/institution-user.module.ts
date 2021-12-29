import { NgModule } from '@angular/core';

import { ThemeModule } from '../../../@theme/theme.module';
import {
  NbButtonModule,
  NbCardModule,
  NbInputModule,
  NbSelectModule,
  NbIconModule,
  NbFormFieldModule,
  NbActionsModule,
} from '@nebular/theme';

import { InstitutionUserComponent } from './institution-user.component';
import { InstitutionUserRoutingModule } from './institution-user-routing.module';
import { SideMenuModule } from '../../../side-menu/side-menu.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ListModule } from '../../../crud/list/list.module';
import { CreateModule } from '../../../crud/create/create.module';
import { InstitutionUserCreateComponent } from './institution-user-create/institution-user-create.component';
import { InstitutionUserUpdateComponent } from './institution-user-update/institution-user-update.component';
import { InstitutionUserReadComponent } from './institution-user-read/institution-user-read.component';
import { InstitutionUserListComponent } from './institution-user-list/institution-user-list.component';
import { ReadModule } from '../../../crud/read/read.module';
import { UpdateModule } from '../../../crud/update/update.module';
import { InstitutionUserChangePasswordComponent } from './institution-user-update/institution-user-change-password.component';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  imports: [
    InstitutionUserRoutingModule,
    ThemeModule,
    FormsModule,
    ReactiveFormsModule,
    SideMenuModule,
    NbCardModule,
    NbButtonModule,
    NbInputModule,
    NbSelectModule,
    NbFormFieldModule,
    NbActionsModule,
    NbIconModule,
    ListModule,
    CreateModule,
    ReadModule,
    UpdateModule,
    SharedModule,
  ],
  declarations: [
    InstitutionUserComponent,
    InstitutionUserCreateComponent,
    InstitutionUserUpdateComponent,
    InstitutionUserReadComponent,
    InstitutionUserListComponent,
    InstitutionUserChangePasswordComponent,
  ],
})
export class InstitutionUserModule {
}
