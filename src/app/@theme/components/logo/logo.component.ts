import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ngx-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss']
})
export class LogoComponent implements OnInit {

  @Input() type: string = 'image+text'; // ["image", "text", "image+text"]
  @Input() title: string = 'TeSLA-CE';
  @Input() logo: string = '/assets/logo.png';

  constructor() { }

  ngOnInit(): void {
  }

}
