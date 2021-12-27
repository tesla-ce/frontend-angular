import { Component, Input } from '@angular/core';

@Component({
  selector: 'ngx-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss'],
})
export class LogoComponent {
  @Input() type = 'image+text'; // ["image", "text", "image+text"]
  @Input() title = 'TeSLA-CE';
  @Input() logo = '/assets/logo.png';
}
