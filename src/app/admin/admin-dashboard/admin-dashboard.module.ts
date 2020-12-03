import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { AdminDashboardComponent } from './admin-dashboard.component';
import { SideMenuModule } from '../../side-menu/side-menu.module';

@NgModule({
  imports: [
    ThemeModule,
    SideMenuModule,
  ],
  declarations: [
    AdminDashboardComponent,
  ],
})
export class AdminDashboardModule { }
