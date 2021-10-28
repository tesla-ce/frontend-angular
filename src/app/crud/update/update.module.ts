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

import { UpdateComponent } from './update.component';
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
    NbCheckboxModule,
    SelectRemoteModule,
  ],
  declarations: [
    UpdateComponent,
  ],
  exports: [
    UpdateComponent,
  ],
})
export class UpdateModule { }
