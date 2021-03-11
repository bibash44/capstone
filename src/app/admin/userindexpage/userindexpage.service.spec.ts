import { TestBed } from '@angular/core/testing';

import { UserindexpageService } from './userindexpage.service';

describe('UserindexpageService', () => {
  let service: UserindexpageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserindexpageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
