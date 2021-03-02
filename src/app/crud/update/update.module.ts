import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import {
  NbButtonModule,
  NbInputModule,
  NbSelectModule,
  NbFormFieldModule,
  NbAutocompleteModule,
} from '@nebular/theme';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UpdateComponent } from './update.component';

@NgModule({
  imports: [
    ThemeModule,
    FormsModule,
    ReactiveFormsModule,
    NbButtonModule,
    NbInputModule,
    NbAutocompleteModule,
    NbSelectModule,
    NbFormFieldModule,
  ],
  declarations: [
    UpdateComponent,
  ],
  exports: [
    UpdateComponent,
  ],
})
export class UpdateModule { }
