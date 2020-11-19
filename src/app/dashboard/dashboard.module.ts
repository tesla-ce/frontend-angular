import { NgModule } from '@angular/core';
import { ThemeModule } from '../@theme/theme.module';
import { DashboardComponent } from './dashboard.component';
import { SideMenuModule } from '../side-menu/side-menu.module';

@NgModule({
  imports: [
    ThemeModule,
    SideMenuModule,
  ],
  declarations: [
    DashboardComponent,
  ],
})
export class DashboardModule { }
