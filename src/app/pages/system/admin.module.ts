import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { SideMenuModule } from '../../side-menu/side-menu.module';
import { ServiceComponent } from './service/service.component';
import { StatusComponent } from './status/status.component';
import { NbActionsModule, NbButtonModule, NbCardModule } from '@nebular/theme';


@NgModule({
  imports: [
    AdminRoutingModule,
    ThemeModule,
    SideMenuModule,
    NbButtonModule,
    NbCardModule,
    NbActionsModule,
  ],
  declarations: [
    AdminComponent,
    ServiceComponent,
    StatusComponent,
  ],
})
export class AdminModule {
}
