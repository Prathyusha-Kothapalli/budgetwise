/* BudgetWise Merchant Category Codes (MCC) & Auto-Categorization Taxonomy Registry */

export const MERCHANT_CATEGORY_CODES = {
  // Agricultural Services
  501: { mcc: 501, category: 'Utilities', name: 'Veterinary Services', riskLevel: 'low' },
  502: { mcc: 502, category: 'Utilities', name: 'Agricultural Cooperatives', riskLevel: 'low' },
  503: { mcc: 503, category: 'Utilities', name: 'Horticultural Services', riskLevel: 'low' },
  // Utilities & Housing
  4900: { mcc: 4900, category: 'Utilities', name: 'Utilities - Electric, Gas, Heating, Water, Sanitary', riskLevel: 'low' },
  4814: { mcc: 4814, category: 'Bills', name: 'Telecommunication Services & Broadband Fiber', riskLevel: 'low' },
  4899: { mcc: 4899, category: 'Bills', name: 'Cable, Satellite & Streaming Media Services', riskLevel: 'low' },
  // Food & Grocery
  5411: { mcc: 5411, category: 'Food', name: 'Grocery Stores, Supermarkets, Organic Markets', riskLevel: 'low' },
  5422: { mcc: 5422, category: 'Food', name: 'Meat Provisioners, Freezer Lockers', riskLevel: 'low' },
  5441: { mcc: 5441, category: 'Food', name: 'Candy, Nut, Confectionery Stores', riskLevel: 'low' },
  5451: { mcc: 5451, category: 'Food', name: 'Dairy Products Stores', riskLevel: 'low' },
  5462: { mcc: 5462, category: 'Food', name: 'Bakeries & Artisan Pastry Shops', riskLevel: 'low' },
  5812: { mcc: 5812, category: 'Food', name: 'Eating Places, Fine Dining Restaurants', riskLevel: 'medium' },
  5814: { mcc: 5814, category: 'Food', name: 'Fast Food Restaurants, Quick Service Dining', riskLevel: 'low' },
  // Travel & Transportation
  5541: { mcc: 5541, category: 'Travel', name: 'Service Stations, Fuel & Gas Refill', riskLevel: 'low' },
  4121: { mcc: 4121, category: 'Travel', name: 'Taxicabs, Rideshares (Uber, Lyft), Transit', riskLevel: 'low' },
  4511: { mcc: 4511, category: 'Travel', name: 'Air Carriers, Commercial Airlines', riskLevel: 'medium' },
  7011: { mcc: 7011, category: 'Travel', name: 'Hotels, Motels, Resorts, Lodging', riskLevel: 'medium' },
  7512: { mcc: 7512, category: 'Travel', name: 'Car Rental Agencies', riskLevel: 'medium' },
  // Healthcare & Wellness
  5912: { mcc: 5912, category: 'Healthcare', name: 'Drug Stores, Pharmacies, Prescription Care', riskLevel: 'low' },
  8011: { mcc: 8011, category: 'Healthcare', name: 'Doctors & Physicians Services', riskLevel: 'low' },
  8021: { mcc: 8021, category: 'Healthcare', name: 'Dentists, Orthodontists & Oral Surgery', riskLevel: 'low' },
  7997: { mcc: 7997, category: 'Healthcare', name: 'Fitness Clubs, Gyms, Athletic Facilities', riskLevel: 'low' },
  // Education
  8220: { mcc: 8220, category: 'Education', name: 'Colleges, Universities, Professional Schools', riskLevel: 'low' },
  8249: { mcc: 8249, category: 'Education', name: 'Vocational, Trade & Online Skill Courses', riskLevel: 'low' },
  5942: { mcc: 5942, category: 'Education', name: 'Book Stores & Educational Literature', riskLevel: 'low' },
  // Entertainment & Leisure
  7832: { mcc: 7832, category: 'Entertainment', name: 'Motion Picture Theaters, Cinema Nights', riskLevel: 'low' },
  7999: { mcc: 7999, category: 'Entertainment', name: 'Recreation & Amusement Services', riskLevel: 'medium' },
  5816: { mcc: 5816, category: 'Entertainment', name: 'Digital Gaming & Entertainment Software', riskLevel: 'low' }
};

export const MERCHANT_KEYWORD_RULES = [
  { pattern: /whole\s*foods/i, category: 'Food', subcategory: 'Groceries', confidence: 0.98 },
  { pattern: /trader\s*joe/i, category: 'Food', subcategory: 'Groceries', confidence: 0.98 },
  { pattern: /safeway|kroger|walmart|target/i, category: 'Food', subcategory: 'Groceries', confidence: 0.90 },
  { pattern: /starbucks|peet|blue\s*bottle|dunkin/i, category: 'Food', subcategory: 'Coffee', confidence: 0.95 },
  { pattern: /mcdonald|burger\s*king|wendy|chipotle|sweetgreen/i, category: 'Food', subcategory: 'Dining', confidence: 0.95 },
  { pattern: /chevron|shell|bp|exxon|mobil|7-eleven/i, category: 'Travel', subcategory: 'Fuel', confidence: 0.95 },
  { pattern: /uber|lyft|cab|taxi|waymo/i, category: 'Travel', subcategory: 'Rideshare', confidence: 0.98 },
  { pattern: /delta|united|american\s*air|southwest|jetblue/i, category: 'Travel', subcategory: 'Flights', confidence: 0.98 },
  { pattern: /marriott|hilton|hyatt|airbnb|booking/i, category: 'Travel', subcategory: 'Hotels', confidence: 0.95 },
  { pattern: /amazon|amzn|ebay|aliexpress/i, category: 'Shopping', subcategory: 'Online', confidence: 0.92 },
  { pattern: /apple|best\s*buy|micro\s*center/i, category: 'Shopping', subcategory: 'Electronics', confidence: 0.95 },
  { pattern: /nike|adidas|zara|h&m|nordstrom/i, category: 'Shopping', subcategory: 'Apparel', confidence: 0.95 },
  { pattern: /netflix|hbo|hulu|spotify|disney/i, category: 'Bills', subcategory: 'Subscriptions', confidence: 0.99 },
  { pattern: /comcast|xfinity|at&t|verizon|t-mobile/i, category: 'Bills', subcategory: 'Telecom', confidence: 0.98 },
  { pattern: /pge|coned|power|electric|gas\s*co|water\s*dept/i, category: 'Utilities', subcategory: 'Public Utilities', confidence: 0.98 },
  { pattern: /cvs|walgreens|rite\s*aid|pharmacy/i, category: 'Healthcare', subcategory: 'Pharmacy', confidence: 0.95 },
  { pattern: /equinox|planet\s*fitness|24\s*hour|gym/i, category: 'Healthcare', subcategory: 'Fitness', confidence: 0.95 },
  { pattern: /udemy|coursera|pluralsight|frontend\s*masters/i, category: 'Education', subcategory: 'Online Courses', confidence: 0.98 },
  { pattern: /steam|playstation|xbox|nintendo/i, category: 'Entertainment', subcategory: 'Gaming', confidence: 0.98 }
];

export function autoCategorizeTransaction(description = '') {
  if (!description) return { category: 'Other', confidence: 0.0 };

  for (const rule of MERCHANT_KEYWORD_RULES) {
    if (rule.pattern.test(description)) {
      return {
        category: rule.category,
        subcategory: rule.subcategory,
        confidence: rule.confidence
      };
    }
  }

  return { category: 'Other', subcategory: 'General', confidence: 0.5 };
}
