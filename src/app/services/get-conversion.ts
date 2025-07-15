import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CurrencyConversion } from '../interfaces/currencies';

@Injectable({
  providedIn: 'root'
})

export class GetConversionService {
  private baseUrl = 'https://api.currencybeacon.com/v1/convert';
  private apiKey = 'iYKF0kM8VmLx5wQvVURqyyZaJkeyXZem';

  private readonly http = inject(HttpClient);

  getConversion(from: string, to: string, amount: number): Observable<CurrencyConversion> {
    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('from', from)
      .set('to', to)
      .set('amount', amount.toString());

    // add a time out to the api call
    return this.http.get<CurrencyConversion>(this.baseUrl, { params }).pipe(
      catchError(error => {
        console.error('Conversion API error:', error);
        return throwError(() => new Error('Unable to fetch conversion rate. Please try again later.'));
      })
    );
  }
}
