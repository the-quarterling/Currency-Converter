import { Component, OnInit, signal, Injectable, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

import { Currency } from './interfaces/currencies';

import { GetCurrenciesService } from './services/get-currencies';
import { FormElement } from "./components/currency-converter-form/currency-converter-form";

import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    CommonModule,
    FormElement,
    MatCardModule
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})

export class App implements OnInit {
  currencyArray: Currency[] = [];

  convertedAmount: number = 0;
  errorMessage: string | null = null;

  protected readonly title = signal('convert-o-matic');

  private readonly getCurrenciesService = inject(GetCurrenciesService);

  ngOnInit(): void {
    this.loadCurrencies();
  }

  loadCurrencies(): void {
    this.errorMessage = null; 

    this.getCurrenciesService.getCurrencies().subscribe({
      next: (currencies) => {
        this.currencyArray = Object.values(currencies);
      },
      error: (error) => {
        this.errorMessage = error.message; 
        this.currencyArray = [];
      }
    });
  }
}
