/* BudgetWise Global ISO 4217 Currencies & Historical FX Rates Database */

export const WORLD_CURRENCIES_REGISTRY = {
  USD: { code: 'USD', numeric: '840', name: 'US Dollar', symbol: '$', decimalDigits: 2, symbolFirst: true, country: 'United States' },
  EUR: { code: 'EUR', numeric: '978', name: 'Euro', symbol: '€', decimalDigits: 2, symbolFirst: false, country: 'Eurozone' },
  GBP: { code: 'GBP', numeric: '826', name: 'British Pound Sterling', symbol: '£', decimalDigits: 2, symbolFirst: true, country: 'United Kingdom' },
  JPY: { code: 'JPY', numeric: '392', name: 'Japanese Yen', symbol: '¥', decimalDigits: 0, symbolFirst: true, country: 'Japan' },
  CAD: { code: 'CAD', numeric: '124', name: 'Canadian Dollar', symbol: 'CA$', decimalDigits: 2, symbolFirst: true, country: 'Canada' },
  AUD: { code: 'AUD', numeric: '036', name: 'Australian Dollar', symbol: 'A$', decimalDigits: 2, symbolFirst: true, country: 'Australia' },
  CHF: { code: 'CHF', numeric: '756', name: 'Swiss Franc', symbol: 'CHF', decimalDigits: 2, symbolFirst: true, country: 'Switzerland' },
  CNY: { code: 'CNY', numeric: '156', name: 'Chinese Yuan', symbol: '¥', decimalDigits: 2, symbolFirst: true, country: 'China' },
  INR: { code: 'INR', numeric: '356', name: 'Indian Rupee', symbol: '₹', decimalDigits: 2, symbolFirst: true, country: 'India' },
  BRL: { code: 'BRL', numeric: '986', name: 'Brazilian Real', symbol: 'R$', decimalDigits: 2, symbolFirst: true, country: 'Brazil' },
  RUB: { code: 'RUB', numeric: '643', name: 'Russian Ruble', symbol: '₽', decimalDigits: 2, symbolFirst: false, country: 'Russia' },
  KRW: { code: 'KRW', numeric: '410', name: 'South Korean Won', symbol: '₩', decimalDigits: 0, symbolFirst: true, country: 'South Korea' },
  MXN: { code: 'MXN', numeric: '484', name: 'Mexican Peso', symbol: 'MX$', decimalDigits: 2, symbolFirst: true, country: 'Mexico' },
  SGD: { code: 'SGD', numeric: '702', name: 'Singapore Dollar', symbol: 'S$', decimalDigits: 2, symbolFirst: true, country: 'Singapore' },
  NZD: { code: 'NZD', numeric: '554', name: 'New Zealand Dollar', symbol: 'NZ$', decimalDigits: 2, symbolFirst: true, country: 'New Zealand' },
  HKD: { code: 'HKD', numeric: '344', name: 'Hong Kong Dollar', symbol: 'HK$', decimalDigits: 2, symbolFirst: true, country: 'Hong Kong' },
  SEK: { code: 'SEK', numeric: '752', name: 'Swedish Krona', symbol: 'kr', decimalDigits: 2, symbolFirst: false, country: 'Sweden' },
  NOK: { code: 'NOK', numeric: '578', name: 'Norwegian Krone', symbol: 'kr', decimalDigits: 2, symbolFirst: false, country: 'Norway' },
  DKK: { code: 'DKK', numeric: '208', name: 'Danish Krone', symbol: 'kr.', decimalDigits: 2, symbolFirst: false, country: 'Denmark' },
  PLN: { code: 'PLN', numeric: '985', name: 'Polish Zloty', symbol: 'zł', decimalDigits: 2, symbolFirst: false, country: 'Poland' },
  ZAR: { code: 'ZAR', numeric: '710', name: 'South African Rand', symbol: 'R', decimalDigits: 2, symbolFirst: true, country: 'South Africa' },
  TRY: { code: 'TRY', numeric: '949', name: 'Turkish Lira', symbol: '₺', decimalDigits: 2, symbolFirst: true, country: 'Turkey' },
  AED: { code: 'AED', numeric: '784', name: 'United Arab Emirates Dirham', symbol: 'AED', decimalDigits: 2, symbolFirst: true, country: 'United Arab Emirates' },
  SAR: { code: 'SAR', numeric: '682', name: 'Saudi Riyal', symbol: 'SAR', decimalDigits: 2, symbolFirst: true, country: 'Saudi Arabia' },
  THB: { code: 'THB', numeric: '764', name: 'Thai Baht', symbol: '฿', decimalDigits: 2, symbolFirst: true, country: 'Thailand' },
  MYR: { code: 'MYR', numeric: '458', name: 'Malaysian Ringgit', symbol: 'RM', decimalDigits: 2, symbolFirst: true, country: 'Malaysia' },
  IDR: { code: 'IDR', numeric: '360', name: 'Indonesian Rupiah', symbol: 'Rp', decimalDigits: 0, symbolFirst: true, country: 'Indonesia' },
  PHP: { code: 'PHP', numeric: '608', name: 'Philippine Peso', symbol: '₱', decimalDigits: 2, symbolFirst: true, country: 'Philippines' },
  CZK: { code: 'CZK', numeric: '203', name: 'Czech Koruna', symbol: 'Kč', decimalDigits: 2, symbolFirst: false, country: 'Czech Republic' },
  HUF: { code: 'HUF', numeric: '348', name: 'Hungarian Forint', symbol: 'Ft', decimalDigits: 0, symbolFirst: false, country: 'Hungary' },
  ILS: { code: 'ILS', numeric: '376', name: 'Israeli New Shekel', symbol: '₪', decimalDigits: 2, symbolFirst: true, country: 'Israel' },
  CLP: { code: 'CLP', numeric: '152', name: 'Chilean Peso', symbol: 'CLP$', decimalDigits: 0, symbolFirst: true, country: 'Chile' },
  COP: { code: 'COP', numeric: '170', name: 'Colombian Peso', symbol: 'COL$', decimalDigits: 0, symbolFirst: true, country: 'Colombia' },
  ARS: { code: 'ARS', numeric: '032', name: 'Argentine Peso', symbol: 'ARS$', decimalDigits: 2, symbolFirst: true, country: 'Argentina' },
  EGP: { code: 'EGP', numeric: '818', name: 'Egyptian Pound', symbol: 'E£', decimalDigits: 2, symbolFirst: true, country: 'Egypt' },
  VND: { code: 'VND', numeric: '704', name: 'Vietnamese Dong', symbol: '₫', decimalDigits: 0, symbolFirst: false, country: 'Vietnam' },
  NGN: { code: 'NGN', numeric: '566', name: 'Nigerian Naira', symbol: '₦', decimalDigits: 2, symbolFirst: true, country: 'Nigeria' },
  PKR: { code: 'PKR', numeric: '586', name: 'Pakistani Rupee', symbol: 'Rs', decimalDigits: 2, symbolFirst: true, country: 'Pakistan' },
  BDT: { code: 'BDT', numeric: '050', name: 'Bangladeshi Taka', symbol: '৳', decimalDigits: 2, symbolFirst: true, country: 'Bangladesh' },
  RON: { code: 'RON', numeric: '946', name: 'Romanian Leu', symbol: 'lei', decimalDigits: 2, symbolFirst: false, country: 'Romania' }
};

export const FX_EXCHANGE_RATES_USD_BASE = {
  USD: 1.0,
  EUR: 0.92,
  GBP: 0.79,
  JPY: 154.2,
  CAD: 1.36,
  AUD: 1.51,
  CHF: 0.90,
  CNY: 7.23,
  INR: 83.4,
  BRL: 5.15,
  RUB: 91.5,
  KRW: 1375.0,
  MXN: 16.8,
  SGD: 1.35,
  NZD: 1.66,
  HKD: 7.82,
  SEK: 10.8,
  NOK: 10.9,
  DKK: 6.87,
  PLN: 3.98,
  ZAR: 18.5,
  TRY: 32.2,
  AED: 3.67,
  SAR: 3.75,
  THB: 36.8,
  MYR: 4.73,
  IDR: 16100.0,
  PHP: 57.5,
  CZK: 23.4,
  HUF: 362.0,
  ILS: 3.72,
  CLP: 940.0,
  COP: 3890.0,
  ARS: 880.0,
  EGP: 47.8,
  VND: 25400.0,
  NGN: 1390.0,
  PKR: 278.0,
  BDT: 117.0,
  RON: 4.58
};

export function convertCurrency(amount, fromCode = 'USD', toCode = 'EUR') {
  const fromRate = FX_EXCHANGE_RATES_USD_BASE[fromCode] || 1.0;
  const toRate = FX_EXCHANGE_RATES_USD_BASE[toCode] || 1.0;
  
  const amountInUSD = amount / fromRate;
  const converted = amountInUSD * toRate;

  return Math.round(converted * 100) / 100;
}
