import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  NbAuthModule,
  NbPasswordAuthStrategy,
  NbAuthOAuth2JWTToken,
} from '@nebular/auth';
import { NbSecurityModule, NbRoleProvider } from '@nebular/security';

import { throwIfAlreadyLoaded } from './module-import-guard';
import {
  AnalyticsService,
  LayoutService,
} from './utils';
import { UserData } from './data/users';
import { UserService } from './mock/users.service';
import { MockDataModule } from './mock/mock-data.module';
import { AuthService} from './auth/auth.service';
import {AuthGuardAuthenticated} from './auth/guards/auth-guard-authenticated';
import {AuthGuardAdmin} from './auth/guards/auth-guard-admin';

const socialLinks = [
  {
    url: 'https://github.com/akveo/nebular',
    target: '_blank',
    icon: 'github',
  },
  {
    url: 'https://www.facebook.com/akveo/',
    target: '_blank',
    icon: 'facebook',
  },
  {
    url: 'https://twitter.com/akveo_inc',
    target: '_blank',
    icon: 'twitter',
  },
];

const DATA_SERVICES = [
  { provide: UserData, useClass: UserService },
];

export const NB_CORE_PROVIDERS = [
  ...MockDataModule.forRoot().providers,
  ...DATA_SERVICES,
  ...NbAuthModule.forRoot({

    strategies: [
      /*NbDummyAuthStrategy.setup({
        name: 'email',
        delay: 3000,
      }),*/
      NbPasswordAuthStrategy.setup({
        name: 'email',
        token: {
          class: NbAuthOAuth2JWTToken,
          key: 'token',
        },
        baseEndpoint: 'http://localhost:8000',
        login: {
          endpoint: '/api/v2/auth/login',
        },
        refreshToken: {
          endpoint: '/api/v2/auth/token/refresh',
        },
        logout: {
          endpoint: '/api/v2/auth/logout',
          redirect: {success: '/', failure: '/'},
        },
      }),
    ],
    forms: {
      login: {
        socialLinks: socialLinks,
      },
      register: {
        socialLinks: socialLinks,
      },
    },
  }).providers,
  NbSecurityModule.forRoot({
    accessControl: {
      guest: {
      },
      user: {
        parent: 'guest',
        view: '*',
        create: '*',
        edit: '*',
        remove: '*',
      },
    },
  }).providers,

  {
    provide: NbRoleProvider, useClass: AuthService,
  },
  AnalyticsService,
  LayoutService,
];

@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [
    NbAuthModule,
  ],
  declarations: [],
  providers: [AuthService, AuthGuardAuthenticated, AuthGuardAdmin],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }

  static forRoot(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [
        ...NB_CORE_PROVIDERS,
      ],
    };
  }
}
