import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
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

import { AuthInterceptorService } from './auth/auth-interceptor';
import { AuthUserData, AuthService} from './auth/auth.service';
import {AuthGuardAuthenticated} from './auth/guards/auth-guard-authenticated';
import {AuthGuardAdmin} from './auth/guards/auth-guard-admin';
import {LauncherModule} from './launcher/launcher.module';
import { EnvServiceFactory, EnvServiceProvider } from './env/env.service.provider';
import {EnvService} from './env/env.service';
import { environment } from '../../environments/environment';

// const environment: EnvService = EnvServiceFactory();
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
  { provide: AuthUserData, useClass: AuthService },
  // { provide: UserData, useClass: UserService },
];

export const NB_CORE_PROVIDERS = [
  ...DATA_SERVICES,
  ...NbAuthModule.forRoot({

    strategies: [
      NbPasswordAuthStrategy.setup({
        name: 'email',
        token: {
          class: NbAuthOAuth2JWTToken,
          key: 'token',
        },
        baseEndpoint: environment.apiUrl,
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
  EnvServiceProvider,
  AnalyticsService,
  LayoutService,
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptorService,
    multi: true,
  },
];

@NgModule({
  imports: [
    CommonModule,
    LauncherModule,
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
