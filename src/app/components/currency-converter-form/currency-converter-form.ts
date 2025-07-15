import { Component, Input, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { GetConversionService } from '../../services/get-conversion';

import { Currency, CurrencyConversion } from '../../interfaces/currencies';
import { CurrencyPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';

@Component({
  selector: 'app-currency-converter-form',
  imports: [
    ReactiveFormsModule,
    CurrencyPipe,
    MatButtonModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule
  ],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, 
      useValue: {
        appearance: 'outline'
      }
    }
  ],
  templateUrl: './currency-converter-form.html',
  styleUrl: './currency-converter-form.scss'
})
export class FormElement {
  @Input() currencyArray: Currency[] = [];

  private readonly convertCurrency = inject(GetConversionService);
  convertedAmount = 0;
  convertedCurrency = '';

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
        this.convertedCurrency = data.response.to;
      },
      );
  }
}
