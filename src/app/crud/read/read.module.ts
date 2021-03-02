import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import {
  NbButtonModule,
  NbInputModule,
  NbSelectModule,
  NbFormFieldModule,
} from '@nebular/theme';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ReadComponent } from './read.component';

@NgModule({
  imports: [
    ThemeModule,
    NbButtonModule,
  ],
  declarations: [
    ReadComponent,
  ],
  exports: [
    ReadComponent,
  ],
})
export class ReadModule { }
