import { IcIframeComponent } from './ic-iframe/ic-iframe.component';
import { CKEditorModule } from 'ng2-ckeditor';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { IframeRoutingModule } from './iframe-routing.module';
import { NgModule } from '@angular/core';
import { SideMenuModule } from '../../side-menu/side-menu.module';

import { ThemeModule } from '../../@theme/theme.module';
import { IframeComponent } from './iframe.component';
import { NbTabsetModule, NbIconModule, NbFormFieldModule, NbSelectModule, NbInputModule, NbButtonModule, NbCardModule } from '@nebular/theme';

@NgModule({
    imports: [
        ThemeModule,
        IframeRoutingModule,
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
        IcIframeComponent,
        IframeComponent,
    ],
})
export class IframeModule {
}
