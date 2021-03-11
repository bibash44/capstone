import { TestBed } from '@angular/core/testing';

import { ClothingsService } from './clothings.service';

describe('ClothingsService', () => {
  let service: ClothingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClothingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
