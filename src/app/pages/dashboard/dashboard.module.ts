import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { SideMenuModule } from '../../side-menu/side-menu.module';
import { DashboardDefaultComponent } from './dashboard-default/dashboard-default.component';
import { NbButtonModule, NbCardModule, NbListModule, NbIconModule } from '@nebular/theme';
import { SharedModule } from '../../shared/shared.module';
import { JsonFormsModule } from '@jsonforms/angular';
import { JsonFormsAngularMaterialModule } from '@jsonforms/angular-material';

@NgModule({
  imports: [
    DashboardRoutingModule,
    ThemeModule,
    SideMenuModule,
    NbButtonModule,
    NbCardModule,
    NbListModule,
    // i18n
    SharedModule,
    // tesla icons
    NbIconModule,
    // json forms
    JsonFormsModule,
    JsonFormsAngularMaterialModule,
  ],
  declarations: [
    DashboardComponent,
    DashboardDefaultComponent,
  ],
})
export class DashboardModule {
}
