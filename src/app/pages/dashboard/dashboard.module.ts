import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { DashboardComponent } from './dashboard.component';
import { SideMenuModule } from '../../side-menu/side-menu.module';
import {NbButtonModule, NbCardModule, NbIconModule, NbListModule} from '@nebular/theme';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
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
  ],
})
export class DashboardModule { }
