import { NgModule } from '@angular/core';
import { ThemeModule } from '../@theme/theme.module';
import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { CreateUserComponent } from './create-user/create-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SideMenuModule } from '../side-menu/side-menu.module';

@NgModule({
  imports: [
    AdminRoutingModule,
    ThemeModule,
    FormsModule,
    ReactiveFormsModule,
    SideMenuModule
  ],
  declarations: [
    AdminComponent,
    CreateUserComponent
  ],
})
export class AdminModule {
}
