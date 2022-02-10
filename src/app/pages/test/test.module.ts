import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { TestComponent } from './test.component';
import { TestRoutingModule } from './test-routing.module';
import { SideMenuModule } from '../../side-menu/side-menu.module';
import { TestDefaultComponent } from './test-default/test-default.component';
import { NbButtonModule, NbCardModule, NbListModule, NbIconModule } from '@nebular/theme';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    TestRoutingModule,
    ThemeModule,
    SideMenuModule,
    NbButtonModule,
    NbCardModule,
    NbListModule,
    // i18n
    SharedModule,
    // tesla icons
    NbIconModule,
  ],
  declarations: [
    TestComponent,
    TestDefaultComponent,
  ],
})
export class TestModule {
}
