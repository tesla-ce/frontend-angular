import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import {
  NbButtonModule,
  NbCardModule,
  NbInputModule,
  NbSelectModule,
  NbIconModule,
  NbFormFieldModule,
} from '@nebular/theme';

import { AdminUserComponent } from './admin-user.component';
import { AdminUserRoutingModule } from './admin-user-routing.module';
import { SideMenuModule } from '../../side-menu/side-menu.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CreateUserComponent } from './create-user/create-user.component';
import { ListModule } from '../../list/list.module';
import { CreateModule } from '../../create/create.module';
import { AdminUserCreateComponent } from './admin-user-create/admin-user-create.component';
import { AdminUserUpdateComponent } from './admin-user-update/admin-user-update.component';
import { AdminUserShowComponent } from './admin-user-show/admin-user-show.component';
import { AdminUserListComponent } from './admin-user-list/admin-user-list.component';

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
  ],
  declarations: [
    AdminUserComponent,
    CreateUserComponent,
    AdminUserCreateComponent,
    AdminUserUpdateComponent,
    AdminUserShowComponent,
    AdminUserListComponent,
  ],
})
export class AdminUserModule {
}
