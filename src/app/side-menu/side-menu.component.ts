import { Component, OnInit } from '@angular/core';
import {AuthService } from '../@core/auth/auth.service';
import { User } from '../@core/models/user';
import { NbMenuItem } from '@nebular/theme';

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
  ) { }

  ngOnInit(): void {
    this.authService.getUser()
      .pipe()
      .subscribe((user: User) => {
        if (user) {
            this.user = user;
            this.menu = [
            {
                title: 'Dashboard',
                icon: { icon: 'common-dashboard', pack: 'tesla'},
                link: '/dashboard',
                hidden: user.routes.indexOf('dashboard') === -1,
            },
            {
                title: 'My Courses',
                icon: { icon: 'common-course', pack: 'tesla' },
                link: '/course',
                hidden: user.routes.indexOf('course') === -1,
            },
            {
                title: 'Test page',
                icon: { icon: 'common-menu_logo', pack: 'tesla' },
                link: '/test',
                hidden: user.routes.indexOf('test-page') === -1,
            },
            {
                title: 'Administration',
                icon: { icon: 'common-monitoring', pack: 'tesla' },
                link: '/institution',
                hidden: user.routes.indexOf('administration') === -1,
                children: [
                    {
                        title: 'Users',
                        icon: { icon: 'common-user', pack: 'tesla' },
                        link: '/institution/user',
                        hidden: user.routes.indexOf('administration-users') === -1,
                    },
                    {
                        title: 'Informed Consent',
                        icon: { icon: 'common-informed-consent', pack: 'tesla' },
                        link: '/institution/ic',
                        hidden: user.routes.indexOf('administration-ic') === -1,
                    },
                    {
                        title: 'SEND',
                        icon: { icon: 'role-send', pack: 'tesla' },
                        link: '/institution/send',
                        hidden: user.routes.indexOf('administration-send') === -1,
                    },
                    {
                        title: 'Courses',
                        icon: { icon: 'instrument-plagiarism', pack: 'tesla' },
                        link: '/institution/course',
                        hidden: user.routes.indexOf('administration-courses') === -1,
                    },
                    {
                        title: 'Data Management',
                        icon: { icon: 'instrument-vr', pack: 'tesla' },
                        link: '/institution/data-management',
                        hidden: user.routes.indexOf('administration-data-management') === -1,
                    },
                    {
                        title: 'Institution',
                        icon: { icon: 'instrument-vr', pack: 'tesla' },
                        link: '/institution/data-management',
                        hidden: user.routes.indexOf('administration-institution') === -1,
                    },
                    {
                        title: 'Settings',
                        icon: { icon: 'common-system', pack: 'tesla' },
                        link: '/institution/settings',
                        hidden: user.routes.indexOf('administration-settings') === -1,
                    },
                ],
            },
            {
                title: 'Statistics',
                icon: { icon: 'sensor-camera', pack: 'tesla' },
                link: '/statistics',
                hidden: user.routes.indexOf('statistics') === -1,
            },
            {
                title: 'Monitoring',
                icon: { icon: 'sensor-keyboard', pack: 'tesla' },
                link: '/monitoring',
                hidden: user.routes.indexOf('monitoring') === -1,
            },
            {
                title: 'System',
                icon: { icon: 'common-system', pack: 'tesla' },
                link: '/system',
                hidden: user.routes.indexOf('system') === -1,
                children: [
                    {
                        title: 'Users',
                        icon: { icon: 'common-user', pack: 'tesla' },
                        link: '/system/admin-user',
                        hidden: user.routes.indexOf('system-user') === -1,
                    },
                    {
                        title: 'Institutions',
                        icon: { icon: 'common-course', pack: 'tesla' },
                        link: '/system/admin-institution',
                        hidden: user.routes.indexOf('system-institutions') === -1,
                    },
                    {
                        title: 'Instruments',
                        icon: { icon: 'common-dashboard', pack: 'tesla' },
                        link: '/system/instrument',
                        hidden: user.routes.indexOf('system-instruments') === -1,
                    },
                    {
                        title: 'Services',
                        icon: { icon: 'common-dashboard', pack: 'tesla' },
                        link: '/system/service',
                        hidden: user.routes.indexOf('system-services') === -1,
                    },
                    {
                        title: 'Status',
                        icon: { icon: 'common-dashboard', pack: 'tesla' },
                        link: '/system/status',
                        hidden: user.routes.indexOf('system-status') === -1,
                    },
                ],
            }];
        }
    });
  }

  getMockedRoutes(): string[] {
    return [
        'dashboard',
        'my-courses',
        // 'test-page',
        'administration',
        // 'administration-users',
        'administration-ic',
        // 'administration-send',
        // 'administration-courses',
        // 'administration-data-management',
        // 'administration-settings',
        // 'settings',
        // 'statistics',
        // 'monitoring',
        'system',
        'system-users',
        // 'system-institutions',
        // 'system-instruments',
        // 'system-services',
        // 'system-status',
      ];
    }

}
