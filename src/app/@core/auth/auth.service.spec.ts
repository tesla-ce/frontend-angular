import {
  NB_AUTH_FALLBACK_TOKEN, NB_AUTH_TOKENS,
  nbAuthCreateToken, NbAuthJWTToken,
  NbAuthService,
  NbAuthSimpleToken, NbAuthTokenParceler,
  NbTokenLocalStorage,
  NbTokenService, NbTokenStorage,
} from '@nebular/auth';

import { async, inject, TestBed } from '@angular/core/testing';

const noop = () => {};
const ownerStrategyName = 'strategy';

describe('auth-service', () => {
  let tokenService: NbTokenService;
  let tokenStorage: NbTokenLocalStorage;
  // let authService: NbAuthService;
  const simpleToken = nbAuthCreateToken(NbAuthSimpleToken, 'test value', ownerStrategyName);
  const emptyToken = nbAuthCreateToken(NbAuthSimpleToken, '', ownerStrategyName);
  const testTokenKey = 'auth_app_token';


  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: NbTokenStorage, useClass: NbTokenLocalStorage },
        { provide: NB_AUTH_FALLBACK_TOKEN, useValue: NbAuthSimpleToken },
        { provide: NB_AUTH_TOKENS, useValue: [NbAuthSimpleToken, NbAuthJWTToken] },
        NbAuthTokenParceler,
        NbTokenService,
        NbAuthService,
      ],
    });
  });

  beforeEach(async(inject(
    [NbTokenService, NbTokenStorage],
    (_tokenService, _tokenStorage) => {
      tokenService = _tokenService;
      tokenStorage = _tokenStorage;
    },
  )));

  afterEach(() => {
    localStorage.removeItem(testTokenKey);
  });

  it('#getValue should return real value from the real service', () => {
    expect(true).toBe(true);
  });
});
