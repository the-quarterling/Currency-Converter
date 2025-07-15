export interface Currency {
  id: number;
  name: string;
  short_code: string;
  code: string;
  precision: number;
  subunit: number;
  symbol: string;
  symbol_first: boolean;
  decimal_mark: string;
  thousands_separator: string;
};

export interface CurrencyConversion {
  response: {
    value: number;
    timestamp: number;
    date: string;
    from: string;
    to: string;
    amount: number;
  };
};