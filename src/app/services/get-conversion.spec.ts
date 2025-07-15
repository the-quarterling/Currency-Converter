import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { GetConversionService } from './get-conversion';

describe('GetConversion', () => {
  let service: GetConversionService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetConversionService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should make HTTP GET request with valid arguements', () => {
    const from = 'USD';
    const to = 'EUR';
    const amount = 100;

    service.getConversion(from, to, amount).subscribe();

    const req = httpMock.expectOne('https://api.currencybeacon.com/v1/convert?api_key=iYKF0kM8VmLx5wQvVURqyyZaJkeyXZem&from=USD&to=EUR&amount=100');
    expect(req.request.method).toBe('GET');
  });

  it('should handle errors ', () => {
    const from = 'EUR';
    const to = 'GBP';
    const amount = 1000;

    const errorMessage = 'Unable to fetch conversion rate. Please try again later.';

    service.getConversion(from, to, amount).subscribe({
      error: (error) => {
        expect(error.message).toBe(errorMessage);
      }
    });

    const req = httpMock.expectOne('https://api.currencybeacon.com/v1/convert?api_key=iYKF0kM8VmLx5wQvVURqyyZaJkeyXZem&from=EUR&to=GBP&amount=1000');
    req.flush('Server Error', { status: 500, statusText: 'Internal Server Error' });
  });
});
