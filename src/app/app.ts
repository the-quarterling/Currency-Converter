import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

import { Currency } from './interfaces/currencies';

import { GetCurrenciesService } from './services/get-currencies';
import { FormElement } from "./components/form-element/form-element";
import { MatCard, MatCardContent, MatCardHeader } from '@angular/material/card';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, FormElement, MatCard, MatCardHeader, MatCardContent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})

export class App implements OnInit {
  currencies: Currency[] = [];
  currencyArray: Currency[] = [];
    
  convertedAmount:number = 0;

  protected readonly title = signal('convert-o-matic');

  constructor(private getCurrencies: GetCurrenciesService) { }

  ngOnInit(): void {
    this.loadCurrencies();
  }
  
  loadCurrencies(): void {
    this.getCurrencies.GetCurrencies().subscribe(currencies => {
      this.currencies = currencies
      //convert to array
      this.currencyArray = Object.values(currencies);
    })
  }
}
