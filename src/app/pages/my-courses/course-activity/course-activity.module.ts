// import { JsonFormsAngularMaterialModule } from '@jsonforms/angular-material';
// import { JsonFormsModule } from '@jsonforms/angular';
import { NgModule } from '@angular/core';

import { ThemeModule } from '../../../@theme/theme.module';
import {
  NbButtonModule,
  NbCardModule,
  NbInputModule,
  NbSelectModule,
  NbIconModule,
  NbFormFieldModule,
  NbTabsetModule,
  NbToggleModule,
  NbActionsModule,
} from '@nebular/theme';

import { CourseRoutingModule } from './course-activity-routing.module';
import { SideMenuModule } from '../../../side-menu/side-menu.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators'; // <-- #2 import module

import { ListModule } from '../../../crud/list/list.module';
import { CreateModule } from '../../../crud/create/create.module';
import { CourseActivityComponent } from './course-activity.component';
// import { DataDisplayComponent } from '../course-activity/control';
import { CourseActivityListComponent } from './course-activity-list/course-activity-list.component';
import { CourseActivityUpdateComponent } from './course-activity-update/course-activity-update.component';
import { CourseActivityReadComponent } from './course-activity-read/course-activity-read.component';
import { CourseActivityInstrumentComponent } from './course-activity-instrument/course-activity-instrument.component';
import { SharedModule } from '../../../shared/shared.module';
import { JsonFormsModule } from '@jsonforms/angular';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { JsonParsePipe } from '../../../@core/pipes/json-parse.pipe';
import { CourseActivityInstrumentSettingsComponent } from './course-activity-instrument/course-activity-instrument-settings.component';
import { CourseActivityInstrumentAddComponent } from './course-activity-instrument/course-activity-instrument-add.component';


@NgModule({
  imports: [
    CourseRoutingModule,
    ThemeModule,
    FormsModule,
    ReactiveFormsModule,
    SideMenuModule,
    NbCardModule,
    NbButtonModule,
    NbInputModule,
    NbSelectModule,
    NbToggleModule,
    NbFormFieldModule,
    RxReactiveFormsModule,
    NbIconModule,
    ListModule,
    CreateModule,
    NbActionsModule,
    NbTabsetModule,
    SharedModule,
    // json forms
    JsonFormsModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatAutocompleteModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
  ],
  declarations: [
    // DataDisplayComponent,
    CourseActivityComponent,
    CourseActivityListComponent,
    CourseActivityReadComponent,
    CourseActivityUpdateComponent,
    CourseActivityInstrumentComponent,
    CourseActivityInstrumentSettingsComponent,
    CourseActivityInstrumentAddComponent,
    JsonParsePipe,
  ],
  exports: [
    CourseActivityListComponent,
  ],
  entryComponents: [
    // DataDisplayComponent,
  ],

})
export class CourseActivityModule {
}

