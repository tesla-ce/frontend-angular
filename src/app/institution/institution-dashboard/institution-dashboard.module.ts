import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { InstitutionDashboardComponent } from './institution-dashboard.component';
import { SideMenuModule } from '../../side-menu/side-menu.module';

@NgModule({
  imports: [
    ThemeModule,
    SideMenuModule,
  ],
  declarations: [
    InstitutionDashboardComponent,
  ],
})
export class InstitutionDashboardModule { }
