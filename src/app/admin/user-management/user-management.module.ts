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

import { UserManagementComponent } from './user-management.component';
import { UserManagementRoutingModule } from './user-management-routing.module';
import { SideMenuModule } from '../../side-menu/side-menu.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CreateUserComponent } from './create-user/create-user.component';
import { ListModule } from '../../list/list.module';
import { CreateModule } from '../../create/create.module';

@NgModule({
  imports: [
    UserManagementRoutingModule,
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
    UserManagementComponent,
    CreateUserComponent,
  ],
})
export class UserManagementModule {
}
