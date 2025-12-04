// This service handles currency exchange rate API calls with optimization for API quota limits.

export interface ExchangeRateResponse {
    rate: number;
    lastUpdated?: string;
}

export interface CurrencyCode {
    code: string;
    name: string;
}

const API_KEY = '43a76e110f8466702ec4a9b8';
const BASE_URL = 'https://v6.exchangerate-api.com/v6';

// Cache for exchange rates (in-memory, resets on page reload)
interface RateCache {
    [key: string]: {
        rates: Record<string, number>;
        timestamp: number;
    };
}

const rateCache: RateCache = {};
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour in milliseconds

/**
 * Hardcoded list of supported currencies to avoid API calls.
 * This list is comprehensive and covers all major world currencies.
 */
const SUPPORTED_CURRENCIES: CurrencyCode[] = [
    { code: 'AED', name: 'UAE Dirham' },
    { code: 'AFN', name: 'Afghan Afghani' },
    { code: 'ALL', name: 'Albanian Lek' },
    { code: 'AMD', name: 'Armenian Dram' },
    { code: 'ANG', name: 'Netherlands Antillian Guilder' },
    { code: 'AOA', name: 'Angolan Kwanza' },
    { code: 'ARS', name: 'Argentine Peso' },
    { code: 'AUD', name: 'Australian Dollar' },
    { code: 'AWG', name: 'Aruban Florin' },
    { code: 'AZN', name: 'Azerbaijani Manat' },
    { code: 'BAM', name: 'Bosnia and Herzegovina Mark' },
    { code: 'BBD', name: 'Barbados Dollar' },
    { code: 'BDT', name: 'Bangladeshi Taka' },
    { code: 'BGN', name: 'Bulgarian Lev' },
    { code: 'BHD', name: 'Bahraini Dinar' },
    { code: 'BIF', name: 'Burundian Franc' },
    { code: 'BMD', name: 'Bermudian Dollar' },
    { code: 'BND', name: 'Brunei Dollar' },
    { code: 'BOB', name: 'Bolivian Boliviano' },
    { code: 'BRL', name: 'Brazilian Real' },
    { code: 'BSD', name: 'Bahamian Dollar' },
    { code: 'BTN', name: 'Bhutanese Ngultrum' },
    { code: 'BWP', name: 'Botswana Pula' },
    { code: 'BYN', name: 'Belarusian Ruble' },
    { code: 'BZD', name: 'Belize Dollar' },
    { code: 'CAD', name: 'Canadian Dollar' },
    { code: 'CDF', name: 'Congolese Franc' },
    { code: 'CHF', name: 'Swiss Franc' },
    { code: 'CLP', name: 'Chilean Peso' },
    { code: 'CNY', name: 'Chinese Renminbi' },
    { code: 'COP', name: 'Colombian Peso' },
    { code: 'CRC', name: 'Costa Rican Colon' },
    { code: 'CUP', name: 'Cuban Peso' },
    { code: 'CVE', name: 'Cape Verdean Escudo' },
    { code: 'CZK', name: 'Czech Koruna' },
    { code: 'DJF', name: 'Djiboutian Franc' },
    { code: 'DKK', name: 'Danish Krone' },
    { code: 'DOP', name: 'Dominican Peso' },
    { code: 'DZD', name: 'Algerian Dinar' },
    { code: 'EGP', name: 'Egyptian Pound' },
    { code: 'ERN', name: 'Eritrean Nakfa' },
    { code: 'ETB', name: 'Ethiopian Birr' },
    { code: 'EUR', name: 'Euro' },
    { code: 'FJD', name: 'Fiji Dollar' },
    { code: 'FKP', name: 'Falkland Islands Pound' },
    { code: 'FOK', name: 'Faroese Króna' },
    { code: 'GBP', name: 'Pound Sterling' },
    { code: 'GEL', name: 'Georgian Lari' },
    { code: 'GGP', name: 'Guernsey Pound' },
    { code: 'GHS', name: 'Ghanaian Cedi' },
    { code: 'GIP', name: 'Gibraltar Pound' },
    { code: 'GMD', name: 'Gambian Dalasi' },
    { code: 'GNF', name: 'Guinean Franc' },
    { code: 'GTQ', name: 'Guatemalan Quetzal' },
    { code: 'GYD', name: 'Guyanese Dollar' },
    { code: 'HKD', name: 'Hong Kong Dollar' },
    { code: 'HNL', name: 'Honduran Lempira' },
    { code: 'HRK', name: 'Croatian Kuna' },
    { code: 'HTG', name: 'Haitian Gourde' },
    { code: 'HUF', name: 'Hungarian Forint' },
    { code: 'IDR', name: 'Indonesian Rupiah' },
    { code: 'ILS', name: 'Israeli New Shekel' },
    { code: 'IMP', name: 'Manx Pound' },
    { code: 'INR', name: 'Indian Rupee' },
    { code: 'IQD', name: 'Iraqi Dinar' },
    { code: 'IRR', name: 'Iranian Rial' },
    { code: 'ISK', name: 'Icelandic Króna' },
    { code: 'JEP', name: 'Jersey Pound' },
    { code: 'JMD', name: 'Jamaican Dollar' },
    { code: 'JOD', name: 'Jordanian Dinar' },
    { code: 'JPY', name: 'Japanese Yen' },
    { code: 'KES', name: 'Kenyan Shilling' },
    { code: 'KGS', name: 'Kyrgyzstani Som' },
    { code: 'KHR', name: 'Cambodian Riel' },
    { code: 'KID', name: 'Kiribati Dollar' },
    { code: 'KMF', name: 'Comorian Franc' },
    { code: 'KRW', name: 'South Korean Won' },
    { code: 'KWD', name: 'Kuwaiti Dinar' },
    { code: 'KYD', name: 'Cayman Islands Dollar' },
    { code: 'KZT', name: 'Kazakhstani Tenge' },
    { code: 'LAK', name: 'Lao Kip' },
    { code: 'LBP', name: 'Lebanese Pound' },
    { code: 'LKR', name: 'Sri Lanka Rupee' },
    { code: 'LRD', name: 'Liberian Dollar' },
    { code: 'LSL', name: 'Lesotho Loti' },
    { code: 'LYD', name: 'Libyan Dinar' },
    { code: 'MAD', name: 'Moroccan Dirham' },
    { code: 'MDL', name: 'Moldovan Leu' },
    { code: 'MGA', name: 'Malagasy Ariary' },
    { code: 'MKD', name: 'Macedonian Denar' },
    { code: 'MMK', name: 'Burmese Kyat' },
    { code: 'MNT', name: 'Mongolian Tögrög' },
    { code: 'MOP', name: 'Macanese Pataca' },
    { code: 'MRU', name: 'Mauritanian Ouguiya' },
    { code: 'MUR', name: 'Mauritian Rupee' },
    { code: 'MVR', name: 'Maldivian Rufiyaa' },
    { code: 'MWK', name: 'Malawian Kwacha' },
    { code: 'MXN', name: 'Mexican Peso' },
    { code: 'MYR', name: 'Malaysian Ringgit' },
    { code: 'MZN', name: 'Mozambican Metical' },
    { code: 'NAD', name: 'Namibian Dollar' },
    { code: 'NGN', name: 'Nigerian Naira' },
    { code: 'NIO', name: 'Nicaraguan Córdoba' },
    { code: 'NOK', name: 'Norwegian Krone' },
    { code: 'NPR', name: 'Nepalese Rupee' },
    { code: 'NZD', name: 'New Zealand Dollar' },
    { code: 'OMR', name: 'Omani Rial' },
    { code: 'PAB', name: 'Panamanian Balboa' },
    { code: 'PEN', name: 'Peruvian Sol' },
    { code: 'PGK', name: 'Papua New Guinean Kina' },
    { code: 'PHP', name: 'Philippine Peso' },
    { code: 'PKR', name: 'Pakistani Rupee' },
    { code: 'PLN', name: 'Polish Złoty' },
    { code: 'PYG', name: 'Paraguayan Guaraní' },
    { code: 'QAR', name: 'Qatari Riyal' },
    { code: 'RON', name: 'Romanian Leu' },
    { code: 'RSD', name: 'Serbian Dinar' },
    { code: 'RUB', name: 'Russian Ruble' },
    { code: 'RWF', name: 'Rwandan Franc' },
    { code: 'SAR', name: 'Saudi Riyal' },
    { code: 'SBD', name: 'Solomon Islands Dollar' },
    { code: 'SCR', name: 'Seychellois Rupee' },
    { code: 'SDG', name: 'Sudanese Pound' },
    { code: 'SEK', name: 'Swedish Krona' },
    { code: 'SGD', name: 'Singapore Dollar' },
    { code: 'SHP', name: 'Saint Helena Pound' },
    { code: 'SLE', name: 'Sierra Leonean Leone' },
    { code: 'SOS', name: 'Somali Shilling' },
    { code: 'SRD', name: 'Surinamese Dollar' },
    { code: 'SSP', name: 'South Sudanese Pound' },
    { code: 'STN', name: 'São Tomé and Príncipe Dobra' },
    { code: 'SYP', name: 'Syrian Pound' },
    { code: 'SZL', name: 'Eswatini Lilangeni' },
    { code: 'THB', name: 'Thai Baht' },
    { code: 'TJS', name: 'Tajikistani Somoni' },
    { code: 'TMT', name: 'Turkmenistan Manat' },
    { code: 'TND', name: 'Tunisian Dinar' },
    { code: 'TOP', name: 'Tongan Paʻanga' },
    { code: 'TRY', name: 'Turkish Lira' },
    { code: 'TTD', name: 'Trinidad and Tobago Dollar' },
    { code: 'TVD', name: 'Tuvaluan Dollar' },
    { code: 'TWD', name: 'New Taiwan Dollar' },
    { code: 'TZS', name: 'Tanzanian Shilling' },
    { code: 'UAH', name: 'Ukrainian Hryvnia' },
    { code: 'UGX', name: 'Ugandan Shilling' },
    { code: 'USD', name: 'United States Dollar' },
    { code: 'UYU', name: 'Uruguayan Peso' },
    { code: 'UZS', name: 'Uzbekistani So\'m' },
    { code: 'VES', name: 'Venezuelan Bolívar Soberano' },
    { code: 'VND', name: 'Vietnamese Đồng' },
    { code: 'VUV', name: 'Vanuatu Vatu' },
    { code: 'WST', name: 'Samoan Tālā' },
    { code: 'XAF', name: 'Central African CFA Franc' },
    { code: 'XCD', name: 'East Caribbean Dollar' },
    { code: 'XDR', name: 'Special Drawing Rights' },
    { code: 'XOF', name: 'West African CFA franc' },
    { code: 'XPF', name: 'CFP Franc' },
    { code: 'YER', name: 'Yemeni Rial' },
    { code: 'ZAR', name: 'South African Rand' },
    { code: 'ZMW', name: 'Zambian Kwacha' },
    { code: 'ZWL', name: 'Zimbabwean Dollar' }
];

/**
 * Returns the hardcoded list of supported currencies.
 * This avoids making an API call and saves quota.
 * @returns Promise<CurrencyCode[]> List of supported currencies
 */
export const fetchSupportedCurrencies = async (): Promise<CurrencyCode[]> => {
    // Return hardcoded list immediately
    return Promise.resolve(SUPPORTED_CURRENCIES);
};

/**
 * Fetches the exchange rate between two currencies with caching.
 * @param fromCurrency The currency code to convert from (e.g., 'USD')
 * @param toCurrency The currency code to convert to (e.g., 'EUR')
 * @returns Promise<number> The exchange rate
 */
export const fetchExchangeRate = async (fromCurrency: string, toCurrency: string): Promise<number> => {
    // Check if we have cached rates for this base currency
    const cached = rateCache[fromCurrency];
    const now = Date.now();

    if (cached && (now - cached.timestamp) < CACHE_DURATION) {
        // Use cached data
        console.log(`✅ Using cached rate for ${fromCurrency} → ${toCurrency}`);
        const rate = cached.rates[toCurrency];
        if (rate) {
            return rate;
        }
    }

    // Fetch fresh data
    try {
        console.log(`🌐 Fetching fresh rates for ${fromCurrency}...`);
        const response = await fetch(`${BASE_URL}/${API_KEY}/latest/${fromCurrency}`);

        if (!response.ok) {
            throw new Error(`API Error: ${response.statusText}`);
        }

        const data = await response.json();

        // Cache all rates for this base currency
        rateCache[fromCurrency] = {
            rates: data.conversion_rates,
            timestamp: now
        };

        const rate = data.conversion_rates[toCurrency];

        if (!rate) {
            throw new Error(`Rate for ${toCurrency} not found`);
        }

        return rate;
    } catch (error) {
        console.error('Failed to fetch exchange rate:', error);
        throw error;
    }
};

/**
 * Fetches the user's local currency based on their IP address.
 * Tries multiple FREE services for reliability (does not count against API quota).
 * @returns Promise<string> The currency code (e.g., 'NGN', 'USD')
 */
export const fetchUserCurrency = async (): Promise<string> => {
    console.log('🌍 Starting currency detection...');

    // Method 1: ipapi.co (full JSON)
    try {
        console.log('Trying ipapi.co...');
        const response = await fetch('https://ipapi.co/json/');
        if (response.ok) {
            const data = await response.json();
            console.log('ipapi.co response:', data);
            if (data.currency) {
                console.log('✅ Detected currency from ipapi.co:', data.currency);
                return data.currency;
            }
        }
    } catch (error) {
        console.warn('❌ ipapi.co failed:', error);
    }

    // Method 2: ipwho.is
    try {
        console.log('Trying ipwho.is...');
        const response = await fetch('https://ipwho.is/');
        if (response.ok) {
            const data = await response.json();
            console.log('ipwho.is response:', data);
            if (data.currency && data.currency.code) {
                console.log('✅ Detected currency from ipwho.is:', data.currency.code);
                return data.currency.code;
            }
        }
    } catch (error) {
        console.warn('❌ ipwho.is failed:', error);
    }

    // Method 3: ip-api.com
    try {
        console.log('Trying ip-api.com...');
        const response = await fetch('http://ip-api.com/json/');
        if (response.ok) {
            const data = await response.json();
            console.log('ip-api.com response:', data);
            if (data.currency) {
                console.log('✅ Detected currency from ip-api.com:', data.currency);
                return data.currency;
            }
        }
    } catch (error) {
        console.warn('❌ ip-api.com failed:', error);
    }

    console.warn('⚠️ All currency detection methods failed, defaulting to USD (United States Dollar)');
    return 'USD';
};

/**
 * Fetches exchange rates for a specific base currency against all other currencies with caching.
 * @param baseCurrency The base currency code
 * @returns Promise<Record<string, number>> Object containing rates
 */
export const fetchRatesForBase = async (baseCurrency: string): Promise<Record<string, number>> => {
    // Check cache first
    const cached = rateCache[baseCurrency];
    const now = Date.now();

    if (cached && (now - cached.timestamp) < CACHE_DURATION) {
        console.log(`✅ Using cached rates for ${baseCurrency}`);
        return cached.rates;
    }

    // Fetch fresh data
    try {
        console.log(`🌐 Fetching fresh rates for ${baseCurrency}...`);
        const response = await fetch(`${BASE_URL}/${API_KEY}/latest/${baseCurrency}`);
        if (!response.ok) {
            throw new Error(`API Error: ${response.statusText}`);
        }
        const data = await response.json();

        // Cache the rates
        rateCache[baseCurrency] = {
            rates: data.conversion_rates,
            timestamp: now
        };

        return data.conversion_rates;
    } catch (error) {
        console.error(`Failed to fetch rates for base ${baseCurrency}:`, error);
        throw error;
    }
};
