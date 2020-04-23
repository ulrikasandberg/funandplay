import { TestBed } from '@angular/core/testing';

import { SrappService } from './srapp.service';

describe('SrappService', () => {
  let service: SrappService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SrappService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
