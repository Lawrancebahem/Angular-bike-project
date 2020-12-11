import { TestBed } from '@angular/core/testing';

import { LeavingSiteGuardGuard } from './leaving-site-guard.guard';

describe('LeavingSiteGuardGuard', () => {
  let guard: LeavingSiteGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(LeavingSiteGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
