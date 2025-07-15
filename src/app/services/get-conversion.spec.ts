import { TestBed } from '@angular/core/testing';

import { GetConversion } from './get-conversion';

describe('GetConversion', () => {
  let service: GetConversion;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetConversion);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
