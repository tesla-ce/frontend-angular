import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { SideMenuModule } from '../../side-menu/side-menu.module';
import {NbButtonModule, NbCardModule, NbListModule, NbIconModule, NbCalendarModule, NbTreeGridModule, NbInputModule} from '@nebular/theme';
import { SharedModule } from '../../shared/shared.module';
import { JsonFormsModule } from '@jsonforms/angular';
import { JsonFormsAngularMaterialModule } from '@jsonforms/angular-material';
import { GridsterModule } from 'angular-gridster2';
import {DashboardWidgetsComponent} from './dashboard-widgets/dashboard-widgets.component';
import {BaseWidgetComponent} from './dashboard-widgets/widgets/base-widget.component';
import {
  CoursesWidgetComponent,
  ActivityIconComponent,
  InstrumentIconsComponent,
} from './dashboard-widgets/widgets/courses/courses-widget.component';
import {CalendarWidgetComponent} from './dashboard-widgets/widgets/calendar/calendar-widget.component';
import {DayCellComponent} from './dashboard-widgets/widgets/calendar/day-cell/day-cell.component';


@NgModule({
  imports: [
    DashboardRoutingModule,
    ThemeModule,
    SideMenuModule,
    NbButtonModule,
    NbCardModule,
    NbListModule,
    NbTreeGridModule,
    NbInputModule,
    // i18n
    SharedModule,
    // tesla icons
    NbIconModule,
    // json forms
    JsonFormsModule,
    JsonFormsAngularMaterialModule,
    // Gridster 2 module
    GridsterModule,
    NbCalendarModule,
  ],
  declarations: [
    DashboardComponent,
    DashboardWidgetsComponent,
    BaseWidgetComponent,
    CoursesWidgetComponent,
    ActivityIconComponent,
    InstrumentIconsComponent,
    CalendarWidgetComponent,
    DayCellComponent,
  ],
})
export class DashboardModule {
}
