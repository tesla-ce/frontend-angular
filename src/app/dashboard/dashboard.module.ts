import { NgModule } from '@angular/core';
import {NbCardModule, NbMenuModule} from '@nebular/theme';
import { ThemeModule } from '../@theme/theme.module';
import { DashboardComponent } from './dashboard.component';

@NgModule({
  imports: [
    ThemeModule,
    NbMenuModule,
  ],
  declarations: [
    DashboardComponent,
  ],
})
export class DashboardModule { }
