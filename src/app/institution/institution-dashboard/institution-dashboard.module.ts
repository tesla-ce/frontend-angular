import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { InstitutionDashboardComponent } from './institution-dashboard.component';
import { SideMenuModule } from '../../side-menu/side-menu.module';
import { NbButtonModule, NbCardModule, NbListModule } from '@nebular/theme';

@NgModule({
  imports: [
    ThemeModule,
    SideMenuModule,
    NbButtonModule,
    NbCardModule,
    NbListModule,
  ],
  declarations: [
    InstitutionDashboardComponent,
  ],
})
export class InstitutionDashboardModule { }
