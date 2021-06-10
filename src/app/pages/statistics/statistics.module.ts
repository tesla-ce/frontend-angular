import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { StatisticsComponent } from './statistics.component';
import { StatisticsRoutingModule } from './statistics-routing.module';
import { SideMenuModule } from '../../side-menu/side-menu.module';
import { StatisticsDefaultComponent } from './statistics-default/statistics-default.component';
import { NbButtonModule, NbCardModule, NbIconModule, NbActionsModule } from '@nebular/theme';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    StatisticsRoutingModule,
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
    StatisticsComponent,
    StatisticsDefaultComponent,
  ],
})
export class StatisticsModule {
}
