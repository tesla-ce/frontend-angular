import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbAutocompleteModule } from '@nebular/theme';
import { SelectRemoteComponent } from './select-remote.component';

@NgModule({
  declarations: [
    SelectRemoteComponent,
  ],
  imports: [
    CommonModule,
    NbAutocompleteModule,
  ],
  exports: [
    SelectRemoteComponent,
  ],
})
export class SelectRemoteModule { }
