import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { FormElement } from './currency-converter-form';
import { of } from 'rxjs';
import { GetConversionService } from '../../services/get-conversion';

describe('FormElement', () => {
  let component: FormElement;
  let fixture: ComponentFixture<FormElement>;
  let mockService: any; 

  beforeEach(async () => {
    mockService = {
      getConversion: jasmine.createSpy('getConversion').and.returnValue(of({
        "meta": { "code": 200 },
        "response": {
          "timestamp": 1752569736,
          "date": "2025-07-15",
          "from": "GBP",
          "to": "USD",
          "amount": 200,
          "value": 268.873766
        }
      }))
    };

    await TestBed.configureTestingModule({
      imports: [FormElement],
      providers: [
        provideHttpClient(),
        { provide: GetConversionService, useValue: mockService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(FormElement);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have initial form values', () => {
    expect(component.converterForm).toBeDefined();
    expect(component.converterForm.get('amount')?.value).toBe(1);
    expect(component.converterForm.get('currencyFrom')?.value).toBe('GBP');
    expect(component.converterForm.get('currencyTo')?.value).toBe('EUR');
  });

  it('should call service method when convert is called', () => {
    component.converterForm.patchValue({
      amount: 100,
      currencyFrom: 'GBP',
      currencyTo: 'EUR'
    });

    component.convert();

    expect(mockService.getConversion).toHaveBeenCalled();
  });
});