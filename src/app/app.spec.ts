import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { App } from './app';
import { GetCurrenciesService } from './services/get-currencies';
import { of, throwError } from 'rxjs';

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
  let component: App;
  let fixture: ComponentFixture<App>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [
        provideHttpClient(),
        { provide: GetCurrenciesService, useValue: get_currencies_mock }
      ],
    }).compileComponents();

      fixture = TestBed.createComponent(App);
      component = fixture.componentInstance;
      fixture.detectChanges();
  });

  it('should create the app', () => {
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render title', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Convert-o-matic');
  });

  it('should include the currency-converter-form component in the template', () => {

    const compiled = fixture.nativeElement as HTMLElement;
    const child = compiled.querySelector('app-currency-converter-form');
    expect(child).toBeTruthy();
  });

  it('should show an error message if there is an issue with the API call', () => {
    const errorMessage = 'Failed to fetch currencies';
    const mockError = new Error(errorMessage);

    // Spy on the service method via the component's injected service
    spyOn(component['getCurrenciesService'], 'getCurrencies').and.returnValue(
      throwError(() => mockError)
    );

    // Act
    component.loadCurrencies();

    // Assert
    expect(component.errorMessage).toBe(errorMessage);
    expect(component.currencyArray).toEqual([]);
    expect(component['getCurrenciesService'].getCurrencies).toHaveBeenCalled();
  });
});
