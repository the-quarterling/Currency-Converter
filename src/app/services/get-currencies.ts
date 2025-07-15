import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Currency } from '../interfaces/currencies';

@Injectable({
  providedIn: 'root'
})

export class GetCurrenciesService {
  private baseUrl = 'https://api.currencybeacon.com/v1/currencies?api_key=iYKF0kM8VmLx5wQvVURqyyZaJkeyXZem';

  private readonly http = inject(HttpClient);

  // add a time out to the api call
  getCurrencies(): Observable<Currency[]> {
    return this.http.get<Currency[]>(this.baseUrl).pipe(
      catchError(error => {
        console.error('Failed to fetch currencies:', error);
        return throwError(() => new Error('Unable to retrieve currency list. Please try again later.'));
      })
    );
  }
}
