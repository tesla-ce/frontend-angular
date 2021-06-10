import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { MonitoringComponent } from './monitoring.component';
import { MonitoringRoutingModule } from './monitoring-routing.module';
import { SideMenuModule } from '../../side-menu/side-menu.module';
import { MonitoringDefaultComponent } from './monitoring-default/monitoring-default.component';
import { NbButtonModule, NbCardModule, NbIconModule, NbActionsModule } from '@nebular/theme';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    MonitoringRoutingModule,
    ThemeModule,
    SideMenuModule,
    NbButtonModule,
    NbCardModule,
    NbActionsModule,
    // i18n
    SharedModule,
    // tesla icons
    NbIconModule,
  ],
  declarations: [
    MonitoringComponent,
    MonitoringDefaultComponent,
  ],
})
export class MonitoringModule {
}
