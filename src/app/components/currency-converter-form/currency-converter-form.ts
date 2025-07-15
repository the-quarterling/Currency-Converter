import { Component, Input, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { GetConversionService } from '../../services/get-conversion';

import { Currency, CurrencyConversion } from '../../interfaces/currencies';


@Component({
  selector: 'app-currency-converter-form',
  imports: [ReactiveFormsModule],
  templateUrl: './currency-converter-form.html',
  styleUrl: './currency-converter-form.scss'
})
export class FormElement {
  @Input() currencyArray: Currency[] = [];

  private readonly convertCurrency = inject(GetConversionService);
  convertedAmount = 0;

  converterForm: FormGroup = new FormGroup({
    amount: new FormControl(1),
    currencyFrom: new FormControl('GBP'),
    currencyTo: new FormControl('EUR')
  });

  convert(): void {
    const formValue = this.converterForm.value;
    const from = formValue.currencyFrom;
    const to = formValue.currencyTo;
    const amount = formValue.amount;

    this.convertCurrency.getConversion(from, to, amount)
      .subscribe((data: CurrencyConversion) => {
        this.convertedAmount = data.response.value;
      },
    );
  }
}
