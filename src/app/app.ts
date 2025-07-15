import { Component, OnInit, signal, Injectable, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

import { Currency } from './interfaces/currencies';

import { GetCurrenciesService } from './services/get-currencies';
import { FormElement } from "./components/currency-converter-form/currency-converter-form";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, FormElement],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})

export class App implements OnInit {
  currencyArray: Currency[] = [];
    
  convertedAmount = 0;

  protected readonly title = signal('convert-o-matic');

  private readonly getCurrenciesService = inject(GetCurrenciesService);

  ngOnInit(): void {
    this.loadCurrencies();
  }
  
  loadCurrencies(): void {
    this.getCurrenciesService.getCurrencies().subscribe(currencies => {
      //convert to array
      this.currencyArray = Object.values(currencies);
    })
  }
}
