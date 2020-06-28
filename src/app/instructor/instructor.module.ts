import { NgModule } from '@angular/core';
import { NbMenuModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { InstructorComponent } from './instructor.component';
import { InstructorRoutingModule } from './instructor-routing.module';

@NgModule({
  imports: [
    InstructorRoutingModule,
    ThemeModule,
    NbMenuModule,
  ],
  declarations: [
    InstructorComponent,
  ],
})
export class InstructorModule {
}
