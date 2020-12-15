import { NgModule } from '@angular/core';

import { ThemeModule } from '../@theme/theme.module';
import {
  NbButtonModule,
  NbInputModule,
  NbSelectModule,
  NbFormFieldModule,
} from '@nebular/theme';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CreateComponent } from './create.component';

@NgModule({
  imports: [
    ThemeModule,
    FormsModule,
    ReactiveFormsModule,
    NbButtonModule,
    NbInputModule,
    NbSelectModule,
    NbFormFieldModule,
  ],
  declarations: [
    CreateComponent,
  ],
  exports: [
    CreateComponent,
  ],
})
export class CreateModule { }
