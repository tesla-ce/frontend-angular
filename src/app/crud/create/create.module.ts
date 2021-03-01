import { SelectRemoteComponent } from './../inputs/select-remote/select-remote.component';
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

import { CreateComponent } from './create.component';

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
    CreateComponent,
    SelectRemoteComponent
  ],
  exports: [
    CreateComponent,
  ],
})
export class CreateModule { }
