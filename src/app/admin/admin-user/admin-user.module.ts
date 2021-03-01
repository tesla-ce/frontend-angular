import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import {
  NbButtonModule,
  NbCardModule,
  NbInputModule,
  NbSelectModule,
  NbIconModule,
  NbFormFieldModule,
  NbAutocompleteModule
} from '@nebular/theme';

import { AdminUserComponent } from './admin-user.component';
import { AdminUserRoutingModule } from './admin-user-routing.module';
import { SideMenuModule } from '../../side-menu/side-menu.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CreateUserComponent } from './create-user/create-user.component';
import { ListModule } from '../../crud/list/list.module';
import { CreateModule } from '../../crud/create/create.module';
import { AdminUserCreateComponent } from './admin-user-create/admin-user-create.component';
import { AdminUserUpdateComponent } from './admin-user-update/admin-user-update.component';
import { AdminUserReadComponent } from './admin-user-read/admin-user-read.component';
import { AdminUserListComponent } from './admin-user-list/admin-user-list.component';
import { ReadModule } from '../../crud/read/read.module';
import { UpdateModule } from '../../crud/update/update.module';

@NgModule({
  imports: [
    AdminUserRoutingModule,
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
    AdminUserComponent,
    CreateUserComponent,
    AdminUserCreateComponent,
    AdminUserUpdateComponent,
    AdminUserReadComponent,
    AdminUserListComponent,
  ],
})
export class AdminUserModule {
}
