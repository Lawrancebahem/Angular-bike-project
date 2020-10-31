import { TestBed } from '@angular/core/testing';

import { ScooterSbServiceService } from './scooter-sb-service.service';

describe('ScooterSbServiceService', () => {
  let service: ScooterSbServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScooterSbServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
