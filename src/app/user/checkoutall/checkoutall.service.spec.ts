import { TestBed } from '@angular/core/testing';

import { CheckoutallService } from './checkoutall.service';

describe('CheckoutallService', () => {
  let service: CheckoutallService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CheckoutallService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
