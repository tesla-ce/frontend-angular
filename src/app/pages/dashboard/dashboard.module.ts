import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { DashboardComponent } from './dashboard.component';
import { DashRoutingModule } from './dashboard-routing.module';
import { SideMenuModule } from '../../side-menu/side-menu.module';
import { DashboardDefaultComponent } from './dashboard-default/dashboard-default.component';
import { NbButtonModule, NbCardModule, NbListModule, NbIconModule } from '@nebular/theme';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  imports: [
    DashRoutingModule,
    ThemeModule,
    SideMenuModule,
    NbButtonModule,
    NbCardModule,
    NbListModule,
    SharedModule,
    NbIconModule,
  ],
  declarations: [
    DashboardComponent,
    DashboardDefaultComponent,
  ],
})
export class DashModule {
}
