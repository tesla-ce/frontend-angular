import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { SideMenuModule } from '../../side-menu/side-menu.module';


@NgModule({
  imports: [
    AdminRoutingModule,
    ThemeModule,
    SideMenuModule,
  ],
  declarations: [
    AdminComponent,
  ],
})
export class AdminModule {
}
