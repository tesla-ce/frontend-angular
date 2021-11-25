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

  constructor() {
    const ttl = new Date(new Date(localStorage.getItem('lms_redirect_uri_ts')).getTime() + 5 * 60000);
    if (new Date() < ttl) this.redirectUri = localStorage.getItem('lms_redirect_uri');
  }

  ngOnInit() {
  }

  backToLMS() {
    window.location.href = this.redirectUri;
  }
}
