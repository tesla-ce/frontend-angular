import { NgModule } from '@angular/core';

import { ThemeModule } from '../@theme/theme.module';
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
import { SideMenuModule } from '../side-menu/side-menu.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CreateUserComponent } from './create-user/create-user.component';
import { ListModule } from './list/list.module';

@NgModule({
  imports: [
    UserManagementRoutingModule,
    ThemeModule,
    FormsModule,
    ReactiveFormsModule,
    SideMenuModule,
    NbButtonModule,
    NbCardModule,
    NbInputModule,
    NbSelectModule,
    NbIconModule,
    NbSelectModule,
    NbFormFieldModule,
    ListModule,
  ],
  declarations: [
    UserManagementComponent,
    CreateUserComponent,
  ],
})
export class UserManagementModule {
}
