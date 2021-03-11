import { TestBed } from '@angular/core/testing';

import { UserordersService } from './userorders.service';

describe('UserordersService', () => {
  let service: UserordersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserordersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
