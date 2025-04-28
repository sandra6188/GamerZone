import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { authSinChildGuard } from './auth-sin-child.guard';

describe('authSinChildGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => authSinChildGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
