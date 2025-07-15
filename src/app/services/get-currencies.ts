import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Currency } from '../interfaces/currencies';

@Injectable({
  providedIn: 'root'
})
export class GetCurrenciesService {
  private baseUrl = 'https://api.currencybeacon.com/v1/currencies?api_key=iYKF0kM8VmLx5wQvVURqyyZaJkeyXZem';

  constructor(private http: HttpClient) {  }

  GetCurrencies():Observable<Currency[]> {
    return this.http.get<Currency[]>(this.baseUrl);
  }
}
