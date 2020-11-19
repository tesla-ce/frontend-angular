import { NgModule } from '@angular/core';

import { ThemeModule } from '../@theme/theme.module';
import { InstructorComponent } from './instructor.component';
import { InstructorRoutingModule } from './instructor-routing.module';
import { SideMenuModule } from '../side-menu/side-menu.module';

@NgModule({
  imports: [
    InstructorRoutingModule,
    ThemeModule,
    SideMenuModule,
  ],
  declarations: [
    InstructorComponent,
  ],
})
export class InstructorModule {
}
