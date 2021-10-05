import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ngx-back-to-lms',
  templateUrl: './back-to-lms.component.html',
  styleUrls: ['./back-to-lms.component.scss'],
})
export class BackToLMSComponent implements OnInit {

  @Output() click: EventEmitter<String> = new EventEmitter<String>();
  redirectUri: string;
  allowedDomains: String[] = ['www.example.com'];

  constructor(private route: ActivatedRoute) {

    this.route.queryParams.subscribe(params => {
      if (params['redirect_uri']) {
        const domain = (new URL(params['redirect_uri'])).hostname;
        if (this.allowedDomains.indexOf(domain) !== -1 ) this.redirectUri = params['redirect_uri'];
      }
    });
  }

  ngOnInit() {
  }

  backToLMS() {
    window.location.href = this.redirectUri;
  }
}
