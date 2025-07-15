import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { GetConversionService } from '../../services/get-conversion';

import { Currency, CurrencyConversion } from '../../interfaces/currencies';


@Component({
  selector: 'app-form-element',
  imports: [ReactiveFormsModule],
  templateUrl: './form-element.html',
  styleUrl: './form-element.scss'
})
export class FormElement {
  @Input() currencyArray: Currency[] = [];

  constructor(private convertCurrency: GetConversionService) { }

  convertedAmount:number = 0;

  converterForm: FormGroup = new FormGroup({
    amount: new FormControl(1),
    currencyFrom: new FormControl('GBP'),
    currencyTo: new FormControl('EUR')
  });

  convert() {
    const formValue = this.converterForm.value;
    const from = formValue.currencyFrom;
    const to = formValue.currencyTo;
    const amount = formValue.amount;

    this.convertCurrency.getConversion(from, to, amount)
    .subscribe((data: CurrencyConversion) => {
      this.convertedAmount = data.response.value;
    });
  }
}
