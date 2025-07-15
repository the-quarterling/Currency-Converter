import { TestBed } from '@angular/core/testing';

import { GetCurrencies } from './get-currencies';

describe('GetCurrencies', () => {
  let service: GetCurrencies;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetCurrencies);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
