import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import {
  NbButtonModule,
  NbInputModule,
  NbSelectModule,
  NbFormFieldModule,
  NbAutocompleteModule,
  NbCheckboxModule,
} from '@nebular/theme';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ReadComponent } from './read.component';
import { SelectRemoteModule } from '../inputs/select-remote/select-remote.module';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    ThemeModule,
    FormsModule,
    ReactiveFormsModule,
    NbButtonModule,
    NbInputModule,
    NbAutocompleteModule,
    NbCheckboxModule,
    NbSelectModule,
    NbFormFieldModule,
    SelectRemoteModule,
    SharedModule,
  ],
  declarations: [
    ReadComponent,
  ],
  exports: [
    ReadComponent,
  ],
})
export class ReadModule { }
