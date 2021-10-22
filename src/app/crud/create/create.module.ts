import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import {
  NbButtonModule,
  NbInputModule,
  NbSelectModule,
  NbFormFieldModule,
  NbAutocompleteModule,
  NbDatepickerModule,
  NbCheckboxModule,
} from '@nebular/theme';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CreateComponent } from './create.component';
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
    NbDatepickerModule,
    NbFormFieldModule,
    NbCheckboxModule,
    SelectRemoteModule,
  ],
  declarations: [
    CreateComponent,
  ],
  exports: [
    CreateComponent,
  ],
})
export class CreateModule { }
