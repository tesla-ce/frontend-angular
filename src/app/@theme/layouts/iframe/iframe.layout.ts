import { Component } from '@angular/core';

@Component({
    selector: 'ngx-iframe-layout',
    styleUrls: ['./iframe.layout.scss'],
    template: `
    <nb-layout windowMode>
      <nb-layout-column>
        <ng-content></ng-content>
      </nb-layout-column>

      <nb-layout-footer fixed>
        <ngx-footer></ngx-footer>
      </nb-layout-footer>
    </nb-layout>
  `,
})
export class IframeLayoutComponent { }
