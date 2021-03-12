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

import { ReadComponent } from './read.component';
import { SelectRemoteModule } from '../inputs/select-remote/select-remote.module';

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
    SelectRemoteModule,
  ],
  declarations: [
    ReadComponent,
  ],
  exports: [
    ReadComponent,
  ],
})
export class ReadModule { }
