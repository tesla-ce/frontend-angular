import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbAutocompleteModule, NbInputModule } from '@nebular/theme';
import { SelectRemoteComponent } from './select-remote.component';

@NgModule({
  declarations: [
    SelectRemoteComponent,
  ],
  imports: [
    CommonModule,
    NbAutocompleteModule,
    NbInputModule,
    ReactiveFormsModule
  ],
  exports: [
    SelectRemoteComponent,
  ],
})
export class SelectRemoteModule { }
