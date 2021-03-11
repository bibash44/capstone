import { TestBed } from '@angular/core/testing';

import { TabletService } from './tablet.service';

describe('TabletService', () => {
  let service: TabletService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TabletService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
