import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { App } from './app';
import { GetCurrenciesService } from './services/get-currencies';
import { of } from 'rxjs';

const get_currencies_mock = {
  getCurrencies: () => of(
    [
        {
            "id": 1,
            "name": "UAE Dirham",
            "short_code": "AED",
            "code": "784",
            "precision": 2,
            "subunit": 100,
            "symbol": "د.إ",
            "symbol_first": true,
            "decimal_mark": ".",
            "thousands_separator": ","
        },
        {
            "id": 2,
            "name": "Afghani",
            "short_code": "AFN",
            "code": "971",
            "precision": 2,
            "subunit": 100,
            "symbol": "؋",
            "symbol_first": false,
            "decimal_mark": ".",
            "thousands_separator": ","
        }
      ]
  )
}

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [
        provideHttpClient(),
        { provide: GetCurrenciesService, useValue: get_currencies_mock }
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
    // todo test if currencyArray has correct data.
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Convert-o-matic');
  });

  it('should include the currency-converter-form component in the template', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const child = compiled.querySelector('app-currency-converter-form');
    expect(child).toBeTruthy(); 
  });
  
});
