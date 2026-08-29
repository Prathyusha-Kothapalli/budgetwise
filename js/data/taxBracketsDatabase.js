/* BudgetWise Comprehensive Tax Brackets & Municipal Tax Rules Database */

export const US_STATE_TAX_BRACKETS = {
  Alabama: { single: [{ limit: 500, rate: 0.02 }, { limit: 3000, rate: 0.04 }, { limit: Infinity, rate: 0.05 }], joint: [{ limit: 1000, rate: 0.02 }, { limit: 6000, rate: 0.04 }, { limit: Infinity, rate: 0.05 }] },
  Alaska: { single: [{ limit: Infinity, rate: 0.0 }], joint: [{ limit: Infinity, rate: 0.0 }] },
  Arizona: { single: [{ limit: Infinity, rate: 0.025 }], joint: [{ limit: Infinity, rate: 0.025 }] },
  Arkansas: { single: [{ limit: 4300, rate: 0.02 }, { limit: 8500, rate: 0.03 }, { limit: 87000, rate: 0.044 }], joint: [{ limit: 4300, rate: 0.02 }, { limit: 8500, rate: 0.03 }, { limit: 87000, rate: 0.044 }] },
  California: { single: [{ limit: 10099, rate: 0.01 }, { limit: 23942, rate: 0.02 }, { limit: 37788, rate: 0.04 }, { limit: 52455, rate: 0.06 }, { limit: 66295, rate: 0.08 }, { limit: 338639, rate: 0.093 }, { limit: 406364, rate: 0.103 }, { limit: 677275, rate: 0.113 }, { limit: 1000000, rate: 0.123 }, { limit: Infinity, rate: 0.133 }] },
  Colorado: { single: [{ limit: Infinity, rate: 0.044 }], joint: [{ limit: Infinity, rate: 0.044 }] },
  Connecticut: { single: [{ limit: 10000, rate: 0.03 }, { limit: 50000, rate: 0.05 }, { limit: 100000, rate: 0.055 }, { limit: 200000, rate: 0.06 }, { limit: 250000, rate: 0.065 }, { limit: 500000, rate: 0.069 }, { limit: Infinity, rate: 0.0699 }] },
  Delaware: { single: [{ limit: 2000, rate: 0.0 }, { limit: 5000, rate: 0.022 }, { limit: 10000, rate: 0.039 }, { limit: 20000, rate: 0.048 }, { limit: 25000, rate: 0.052 }, { limit: 60000, rate: 0.0555 }, { limit: Infinity, rate: 0.066 }] },
  Florida: { single: [{ limit: Infinity, rate: 0.0 }], joint: [{ limit: Infinity, rate: 0.0 }] },
  Georgia: { single: [{ limit: Infinity, rate: 0.0549 }], joint: [{ limit: Infinity, rate: 0.0549 }] },
  Hawaii: { single: [{ limit: 2400, rate: 0.014 }, { limit: 4800, rate: 0.032 }, { limit: 9600, rate: 0.055 }, { limit: 14400, rate: 0.064 }, { limit: 19200, rate: 0.068 }, { limit: 24000, rate: 0.072 }, { limit: 36000, rate: 0.076 }, { limit: 48000, rate: 0.079 }, { limit: 150000, rate: 0.0825 }, { limit: 175000, rate: 0.09 }, { limit: 200000, rate: 0.10 }, { limit: Infinity, rate: 0.11 }] },
  Idaho: { single: [{ limit: Infinity, rate: 0.0569 }], joint: [{ limit: Infinity, rate: 0.0569 }] },
  Illinois: { single: [{ limit: Infinity, rate: 0.0495 }], joint: [{ limit: Infinity, rate: 0.0495 }] },
  Indiana: { single: [{ limit: Infinity, rate: 0.0305 }], joint: [{ limit: Infinity, rate: 0.0305 }] },
  Iowa: { single: [{ limit: 6000, rate: 0.044 }, { limit: 30000, rate: 0.0482 }, { limit: 75000, rate: 0.057 }, { limit: Infinity, rate: 0.06 }] },
  Kansas: { single: [{ limit: 15000, rate: 0.031 }, { limit: 30000, rate: 0.0525 }, { limit: Infinity, rate: 0.057 }] },
  Kentucky: { single: [{ limit: Infinity, rate: 0.04 }], joint: [{ limit: Infinity, rate: 0.04 }] },
  Louisiana: { single: [{ limit: 12500, rate: 0.0185 }, { limit: 50000, rate: 0.035 }, { limit: Infinity, rate: 0.0425 }] },
  Maine: { single: [{ limit: 26050, rate: 0.058 }, { limit: 61600, rate: 0.0675 }, { limit: Infinity, rate: 0.0715 }] },
  Maryland: { single: [{ limit: 1000, rate: 0.02 }, { limit: 2000, rate: 0.03 }, { limit: 3000, rate: 0.04 }, { limit: 100000, rate: 0.0475 }, { limit: 125000, rate: 0.05 }, { limit: 150000, rate: 0.0525 }, { limit: 250000, rate: 0.055 }, { limit: Infinity, rate: 0.0575 }] },
  Massachusetts: { single: [{ limit: 1000000, rate: 0.05 }, { limit: Infinity, rate: 0.09 }] },
  Michigan: { single: [{ limit: Infinity, rate: 0.0425 }], joint: [{ limit: Infinity, rate: 0.0425 }] },
  Minnesota: { single: [{ limit: 31690, rate: 0.0535 }, { limit: 104090, rate: 0.068 }, { limit: 193000, rate: 0.0785 }, { limit: Infinity, rate: 0.0985 }] },
  Mississippi: { single: [{ limit: 10000, rate: 0.0 }, { limit: Infinity, rate: 0.047 }] },
  Missouri: { single: [{ limit: 1207, rate: 0.02 }, { limit: 2414, rate: 0.025 }, { limit: 3621, rate: 0.03 }, { limit: 4828, rate: 0.035 }, { limit: 6035, rate: 0.04 }, { limit: 7242, rate: 0.045 }, { limit: 8449, rate: 0.048 }, { limit: Infinity, rate: 0.0495 }] },
  Montana: { single: [{ limit: 20500, rate: 0.047 }, { limit: Infinity, rate: 0.059 }] },
  Nebraska: { single: [{ limit: 3700, rate: 0.0246 }, { limit: 22170, rate: 0.0351 }, { limit: 35730, rate: 0.0501 }, { limit: Infinity, rate: 0.0584 }] },
  Nevada: { single: [{ limit: Infinity, rate: 0.0 }], joint: [{ limit: Infinity, rate: 0.0 }] },
  NewHampshire: { single: [{ limit: Infinity, rate: 0.03 }], joint: [{ limit: Infinity, rate: 0.03 }] },
  NewJersey: { single: [{ limit: 20000, rate: 0.014 }, { limit: 35000, rate: 0.0175 }, { limit: 40000, rate: 0.035 }, { limit: 75000, rate: 0.05525 }, { limit: 500000, rate: 0.0637 }, { limit: 1000000, rate: 0.0897 }, { limit: Infinity, rate: 0.1075 }] },
  NewMexico: { single: [{ limit: 5500, rate: 0.017 }, { limit: 11000, rate: 0.032 }, { limit: 16000, rate: 0.047 }, { limit: 210000, rate: 0.049 }, { limit: Infinity, rate: 0.059 }] },
  NewYork: { single: [{ limit: 8500, rate: 0.04 }, { limit: 11700, rate: 0.045 }, { limit: 13900, rate: 0.0525 }, { limit: 80650, rate: 0.055 }, { limit: 215400, rate: 0.06 }, { limit: 1077550, rate: 0.0685 }, { limit: 5000000, rate: 0.0965 }, { limit: 25000000, rate: 0.103 }, { limit: Infinity, rate: 0.109 }] },
  NorthCarolina: { single: [{ limit: Infinity, rate: 0.0475 }], joint: [{ limit: Infinity, rate: 0.0475 }] },
  NorthDakota: { single: [{ limit: 44725, rate: 0.0 }, { limit: 225975, rate: 0.0195 }, { limit: Infinity, rate: 0.025 }] },
  Ohio: { single: [{ limit: 26050, rate: 0.0 }, { limit: 100000, rate: 0.0275 }, { limit: 115300, rate: 0.03226 }, { limit: Infinity, rate: 0.0375 }] },
  Oklahoma: { single: [{ limit: 1000, rate: 0.0025 }, { limit: 2500, rate: 0.0075 }, { limit: 3750, rate: 0.0175 }, { limit: 4900, rate: 0.0275 }, { limit: 7200, rate: 0.0375 }, { limit: Infinity, rate: 0.0475 }] },
  Oregon: { single: [{ limit: 4050, rate: 0.0475 }, { limit: 10200, rate: 0.0675 }, { limit: 125000, rate: 0.0875 }, { limit: Infinity, rate: 0.099 }] },
  Pennsylvania: { single: [{ limit: Infinity, rate: 0.0307 }], joint: [{ limit: Infinity, rate: 0.0307 }] },
  RhodeIsland: { single: [{ limit: 73450, rate: 0.0375 }, { limit: 166950, rate: 0.0475 }, { limit: Infinity, rate: 0.0599 }] },
  SouthCarolina: { single: [{ limit: 3200, rate: 0.0 }, { limit: 16040, rate: 0.03 }, { limit: Infinity, rate: 0.064 }] },
  SouthDakota: { single: [{ limit: Infinity, rate: 0.0 }], joint: [{ limit: Infinity, rate: 0.0 }] },
  Tennessee: { single: [{ limit: Infinity, rate: 0.0 }], joint: [{ limit: Infinity, rate: 0.0 }] },
  Texas: { single: [{ limit: Infinity, rate: 0.0 }], joint: [{ limit: Infinity, rate: 0.0 }] },
  Utah: { single: [{ limit: Infinity, rate: 0.0465 }], joint: [{ limit: Infinity, rate: 0.0465 }] },
  Vermont: { single: [{ limit: 45400, rate: 0.0335 }, { limit: 110000, rate: 0.066 }, { limit: 229550, rate: 0.076 }, { limit: Infinity, rate: 0.0875 }] },
  Virginia: { single: [{ limit: 3000, rate: 0.02 }, { limit: 5000, rate: 0.03 }, { limit: 17000, rate: 0.05 }, { limit: Infinity, rate: 0.0575 }] },
  Washington: { single: [{ limit: 250000, rate: 0.0 }, { limit: Infinity, rate: 0.07 }] },
  WestVirginia: { single: [{ limit: 10000, rate: 0.0236 }, { limit: 25000, rate: 0.0315 }, { limit: 40000, rate: 0.0354 }, { limit: 60000, rate: 0.0472 }, { limit: Infinity, rate: 0.0512 }] },
  Wisconsin: { single: [{ limit: 13810, rate: 0.0354 }, { limit: 27630, rate: 0.044 }, { limit: 304070, rate: 0.053 }, { limit: Infinity, rate: 0.0765 }] },
  Wyoming: { single: [{ limit: Infinity, rate: 0.0 }], joint: [{ limit: Infinity, rate: 0.0 }] }
};

export function calculateStateTax(taxableIncome, stateName = 'California', filingStatus = 'single') {
  const stateRule = US_STATE_TAX_BRACKETS[stateName] || US_STATE_TAX_BRACKETS['California'];
  const brackets = stateRule[filingStatus] || stateRule['single'];

  let tax = 0;
  let prev = 0;

  for (const b of brackets) {
    if (taxableIncome > prev) {
      const chunk = Math.min(taxableIncome - prev, b.limit - prev);
      tax += chunk * b.rate;
      prev = b.limit;
    } else {
      break;
    }
  }

  return {
    stateName,
    taxableIncome,
    stateTaxAmount: Math.round(tax * 100) / 100,
    effectiveStateRate: taxableIncome > 0 ? Math.round((tax / taxableIncome) * 10000) / 100 : 0
  };
}
