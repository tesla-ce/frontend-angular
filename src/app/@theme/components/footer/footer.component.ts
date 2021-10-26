import { Component } from '@angular/core';
import { EnvService } from '../../../@core/env/env.service';

@Component({
  selector: 'ngx-footer',
  styleUrls: ['./footer.component.scss'],
  templateUrl: './footer.component.html',
})
export class FooterComponent {
  public version;
  public constructor(
    private envService: EnvService,
  ) {
    this.version = envService.version;
  }
}
