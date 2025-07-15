import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { GetCurrenciesService } from './get-currencies';

describe('GetCurrencies', () => {
  let service: GetCurrenciesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });

    TestBed.configureTestingModule({});
    service = TestBed.inject(GetCurrenciesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should make HTTP GET request', () => {
    service.getCurrencies().subscribe();

    const req = httpMock.expectOne('https://api.currencybeacon.com/v1/currencies?api_key=iYKF0kM8VmLx5wQvVURqyyZaJkeyXZem');
    expect(req.request.method).toBe('GET');
  });

  it('should handle errors ', () => {
    const errorMessage = 'Unable to retrieve currency list. Please try again later.';

    service.getCurrencies().subscribe({
      error: (error) => {
        expect(error.message).toBe(errorMessage);
      }
    });

    const req = httpMock.expectOne('https://api.currencybeacon.com/v1/currencies?api_key=iYKF0kM8VmLx5wQvVURqyyZaJkeyXZem');
    req.flush('Server Error', { status: 500, statusText: 'Internal Server Error' });
  });

});