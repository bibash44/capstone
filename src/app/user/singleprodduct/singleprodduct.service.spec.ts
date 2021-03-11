import { TestBed } from '@angular/core/testing';

import { SingleprodductService } from './singleprodduct.service';

describe('SingleprodductService', () => {
  let service: SingleprodductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SingleprodductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
