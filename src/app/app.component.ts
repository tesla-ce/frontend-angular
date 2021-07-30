/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from './@core/utils/analytics.service';
import {TranslateService} from '@ngx-translate/core';
import { NbIconLibraries } from '@nebular/theme';

@Component({
  selector: 'ngx-app',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {

  constructor(
    private analytics: AnalyticsService,
    public translate: TranslateService,
    private iconLibraries: NbIconLibraries,
  ) {

    // CK EDITOR
    window['CKEDITOR_BASEPATH'] = '//cdn.ckeditor.com/4.6.2/full-all/';


    // i18n
    translate.addLangs(['en', 'fr']);
     // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('en');
     // get the borwser lang
    const browserLang = translate.getBrowserLang();
     // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');

    // font-awesome icons
    this.iconLibraries.registerFontPack('fa', { packClass: 'fa', iconClassPrefix: 'fa' });
  }

  ngOnInit() {
    this.analytics.trackPageViews();
  }
}
