import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class GetConversionService {
  private baseUrl = 'https://api.currencybeacon.com/v1/convert';
  private apiKey = 'iYKF0kM8VmLx5wQvVURqyyZaJkeyXZem';

  constructor(private http: HttpClient) {}

  getConversion(from: string, to: string, amount: number): Observable<any> {
    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('from', from)
      .set('to', to)
      .set('amount', amount.toString());

    return this.http.get(this.baseUrl, { params });
  }
}
