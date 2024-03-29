import {Component} from '@angular/core';

@Component({
  selector: 'ngx-back-to-lms',
  templateUrl: './back-to-lms.component.html',
  styleUrls: ['./back-to-lms.component.scss'],
})
export class BackToLMSComponent {

  redirectUri: string;

  constructor() {
    const ttl = new Date(new Date(localStorage.getItem('lms_redirect_uri_ts')).getTime() + 5 * 60000);
    if (new Date() < ttl) this.redirectUri = localStorage.getItem('lms_redirect_uri');
  }

  backToLMS() {
    if (this.redirectUri) window.location.href = this.redirectUri;
  }
}
