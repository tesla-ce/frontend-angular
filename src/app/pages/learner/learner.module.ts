import { LearnerIcComponent } from './learner-ic/learner-ic.component';
import { CKEditorModule } from 'ng2-ckeditor';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { LearnerRoutingModule } from './learner-routing.module';
import { NgModule } from '@angular/core';
import { SideMenuModule } from '../../side-menu/side-menu.module';

import { ThemeModule } from '../../@theme/theme.module';
import { LearnerComponent } from './learner.component';
import { NbTabsetModule, NbIconModule, NbFormFieldModule, NbSelectModule, NbInputModule, NbButtonModule, NbCardModule } from '@nebular/theme';

@NgModule({
    imports: [
        ThemeModule,
        LearnerRoutingModule,
        NbCardModule,
        NbButtonModule,
        NbInputModule,
        NbSelectModule,
        NbFormFieldModule,
        NbIconModule,
        CKEditorModule,
        SideMenuModule,
        NbTabsetModule,
        PdfViewerModule,
    ],
    declarations: [
        LearnerIcComponent,
        LearnerComponent,
    ],
})
export class LearnerModule {
}
