import { Component, OnInit } from '@angular/core';
import {AuthService } from '../@core/auth/auth.service';
import { User } from '../@core/models/user';
import { NbMenuItem } from '@nebular/theme';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'ngx-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
})
export class SideMenuComponent implements OnInit {

  user: User;
  menu: NbMenuItem[] = [];

  constructor(
    private authService: AuthService,
    private translate: TranslateService,
  ) { }

  ngOnInit(): void {
    this.authService.getUser()
      .pipe()
      .subscribe((user: User) => {
        if (user) {
            this.user = user;
            this.menu = [
            {
                title: this.translate.instant('SIDE_MENU.DASHBOARD'),
                icon: { icon: 'common-dashboard', pack: 'tesla'},
                link: '/dashboard',
                hidden: user.routes.indexOf('dashboard') === -1,
            },
            {
                title: this.translate.instant('SIDE_MENU.MY_COURSES'),
                icon: { icon: 'common-course', pack: 'tesla' },
                link: '/course',
                hidden: user.routes.indexOf('course') === -1,
            },
            {
                title: this.translate.instant('SIDE_MENU.TEST_PAGE'),
                icon: { icon: 'common-menu_logo', pack: 'tesla' },
                link: '/test',
                hidden: user.routes.indexOf('test-page') === -1,
            },
            {
                title: this.translate.instant('SIDE_MENU.ADMINISTRATION'),
                icon: { icon: 'common-monitoring', pack: 'tesla' },
                link: '/institution',
                hidden: user.routes.indexOf('administration') === -1,
                children: [
                    {
                        title: this.translate.instant('SIDE_MENU.USERS'),
                        icon: { icon: 'common-user', pack: 'tesla' },
                        link: '/institution/user',
                        hidden: user.routes.indexOf('administration-users') === -1,
                    },
                    {
                        title: this.translate.instant('SIDE_MENU.INFORMED_CONSENT'),
                        icon: { icon: 'common-informed-consent', pack: 'tesla' },
                        link: '/institution/ic',
                        hidden: user.routes.indexOf('administration-ic') === -1,
                    },
                    {
                        title: this.translate.instant('SIDE_MENU.SEND'),
                        icon: { icon: 'role-send', pack: 'tesla' },
                        link: '/institution/send',
                        hidden: user.routes.indexOf('administration-send') === -1,
                        children: [
                            {
                                title: this.translate.instant('SIDE_MENU.CATEGORIES'),
                                icon: { icon: 'role-send', pack: 'tesla' },
                                link: '/institution/send/category',
                                hidden: user.routes.indexOf('administration-send-categories') === -1,
                            },
                            {
                                title: this.translate.instant('SIDE_MENU.USERS'),
                                icon: { icon: 'role-send', pack: 'tesla' },
                                link: '/institution/send/user',
                                hidden: user.routes.indexOf('administration-send-users') === -1,
                            },
                        ],
                    },
                    {
                        title: this.translate.instant('SIDE_MENU.COURSES'),
                        icon: { icon: 'instrument-plagiarism', pack: 'tesla' },
                        link: '/institution/course',
                        hidden: user.routes.indexOf('administration-courses') === -1,
                    },
                    {
                        title: this.translate.instant('SIDE_MENU.INSTITUTION'),
                        icon: { icon: 'instrument-vr', pack: 'tesla' },
                        link: '/institution/data-management',
                        hidden: user.routes.indexOf('administration-institution') === -1,
                    },
                    {
                        title: this.translate.instant('SIDE_MENU.SETTINGS'),
                        icon: { icon: 'common-system', pack: 'tesla' },
                        link: '/institution/settings',
                        hidden: user.routes.indexOf('administration-settings') === -1,
                    },
                ],
            },
            {
                title: this.translate.instant('SIDE_MENU.STATISTICS'),
                icon: { icon: 'sensor-camera', pack: 'tesla' },
                link: '/statistics',
                hidden: user.routes.indexOf('statistics') === -1,
            },
            {
                title: this.translate.instant('SIDE_MENU.MONITORING'),
                icon: { icon: 'sensor-keyboard', pack: 'tesla' },
                link: '/monitoring',
                hidden: user.routes.indexOf('monitoring') === -1,
            },
            {
                title: this.translate.instant('SIDE_MENU.SYSTEM'),
                icon: { icon: 'common-system', pack: 'tesla' },
                link: '/system',
                hidden: user.routes.indexOf('system') === -1,
                children: [
                    {
                        title: this.translate.instant('SIDE_MENU.USERS'),
                        icon: { icon: 'common-user', pack: 'tesla' },
                        link: '/system/admin-user',
                        hidden: user.routes.indexOf('system-user') === -1,
                    },
                    {
                        title: this.translate.instant('SIDE_MENU.INSTITUTIONS'),
                        icon: { icon: 'common-course', pack: 'tesla' },
                        link: '/system/admin-institution',
                        hidden: user.routes.indexOf('system-institutions') === -1,
                    },
                    {
                        title: this.translate.instant('SIDE_MENU.INSTRUMENTS'),
                        icon: { icon: 'common-dashboard', pack: 'tesla' },
                        link: '/system/admin-instrument',
                        hidden: user.routes.indexOf('system-instruments') === -1,
                    },
                    {
                        title: this.translate.instant('SIDE_MENU.SERVICES'),
                        icon: { icon: 'common-dashboard', pack: 'tesla' },
                        link: '/system/service',
                        hidden: user.routes.indexOf('system-services') === -1,
                    },
                    {
                        title: this.translate.instant('SIDE_MENU.STATUS'),
                        icon: { icon: 'common-dashboard', pack: 'tesla' },
                        link: '/system/status',
                        hidden: user.routes.indexOf('system-status') === -1,
                    },
                ],
            }];
        }
    });
  }
}
