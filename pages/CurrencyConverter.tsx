import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import { CurrencyOption } from '../types';
import { fetchExchangeRate, fetchSupportedCurrencies, fetchUserCurrency, fetchRatesForBase } from '../services/currencyApi';
import { useSettings } from '../context/SettingsContext';

const MAJOR_CURRENCIES = ['USD', 'EUR', 'GBP', 'JPY', 'AUD', 'CAD', 'CHF', 'CNY', 'INR', 'NZD'];

const CurrencyConverter: React.FC = () => {
  const { settings } = useSettings();
  const [amount, setAmount] = useState<number>(1);
  const [fromCurrency, setFromCurrency] = useState<string>('USD');
  const [toCurrency, setToCurrency] = useState<string>('EUR');
  const [exchangeRate, setExchangeRate] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  const [currencies, setCurrencies] = useState<CurrencyOption[]>([]);
  const [loadingCurrencies, setLoadingCurrencies] = useState<boolean>(true);

  const [localCurrency, setLocalCurrency] = useState<string | null>(null);
  const [majorRates, setMajorRates] = useState<Record<string, number>>({});

  // Fetch supported currencies and detect local currency on mount
  useEffect(() => {
    const init = async () => {
      // 1. Load supported currencies
      try {
        const supportedData = await fetchSupportedCurrencies();
        const formattedCurrencies: CurrencyOption[] = supportedData.map(c => ({
          code: c.code,
          name: c.name,
          symbol: c.code
        }));
        setCurrencies(formattedCurrencies);
      } catch (err) {
        console.error("Failed to load currencies", err);
        setError("Failed to load currency list.");
      } finally {
        setLoadingCurrencies(false);
      }

      // 2. Detect local currency (Independent of list loading)
      try {
        const detected = await fetchUserCurrency();
        setLocalCurrency(detected);

        // Set "To" currency to local, "From" is already USD
        if (detected) {
          setToCurrency(detected);

          // 3. Fetch rates for local currency against major currencies
          const rates = await fetchRatesForBase(detected);
          setMajorRates(rates);
        }
      } catch (err) {
        console.error("Local currency detection failed", err);
        // Fallback or silent fail - user will see defaults (USD/EUR)
      }
    };
    init();
  }, []);

  // Fetch Exchange Rate when currencies change
  useEffect(() => {
    const getRate = async () => {
      if (fromCurrency === toCurrency) {
        setExchangeRate(1);
        setError(null);
        return;
      }

      setLoading(true);
      setError(null);
      try {
        const rate = await fetchExchangeRate(fromCurrency, toCurrency);
        setExchangeRate(rate);
      } catch (err) {
        setError("Failed to fetch exchange rates. Please check your connection.");
        setExchangeRate(null);
      } finally {
        setLoading(false);
      }
    };

    if (fromCurrency && toCurrency) {
      getRate();
    }
  }, [fromCurrency, toCurrency]);

  // Calculate result when amount or exchangeRate changes
  useEffect(() => {
    if (exchangeRate !== null) {
      setResult(amount * exchangeRate);
    }
  }, [amount, exchangeRate]);

  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const handleRefresh = () => {
    setExchangeRate(null);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const currentFrom = fromCurrency;
      setFromCurrency('');
      setTimeout(() => setFromCurrency(currentFrom), 10);
    }, 100);
  };

  const formatResult = (value: number): string => {
    // Ensure decimalRounding is within valid range (0-20)
    const fractionDigits = Math.min(Math.max(settings.decimalRounding || 2, 0), 20);
    return value.toLocaleString(undefined, {
      minimumFractionDigits: fractionDigits,
      maximumFractionDigits: fractionDigits
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-conv-bg font-display text-text-primary transition-colors duration-300">
      <NavBar />

      <main className="w-full flex-grow flex flex-col items-center justify-center p-4">
        <div className="flex w-full max-w-2xl flex-col gap-2 p-4 text-center mb-8">
          <h1 className="text-text-primary text-4xl sm:text-5xl font-black leading-tight tracking-[-0.033em]">Currency Converter</h1>
          <p className="text-text-secondary text-base font-normal leading-normal">Real-time exchange rates</p>
        </div>

        <div className="w-full max-w-2xl rounded-xl bg-conv-card shadow-2xl overflow-hidden transition-colors duration-300">
          <div className="p-6 sm:p-8 space-y-6">

            {/* Error Message */}
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 flex items-center gap-3 text-red-500">
                <span className="material-symbols-outlined">error</span>
                <p className="text-sm font-medium">{error}</p>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
              <label className="flex flex-col w-full">
                <p className="text-text-secondary text-sm font-medium leading-normal pb-2">Amount</p>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-conv-primary border border-conv-border bg-conv-input focus:border-conv-primary h-14 placeholder:text-text-muted p-[15px] text-lg font-normal leading-normal transition-colors"
                />
              </label>
              <div className="w-full">
                <p className="text-text-secondary text-sm font-medium leading-normal pb-2">Converted to</p>
                <div className="flex items-center justify-between w-full min-w-0 resize-none overflow-hidden rounded-lg border border-conv-border bg-conv-input h-14 p-[15px] transition-colors">
                  {loading ? (
                    <div className="flex items-center gap-2 text-text-muted">
                      <span className="material-symbols-outlined animate-spin text-sm">progress_activity</span>
                      <span className="text-base">Loading...</span>
                    </div>
                  ) : (
                    <p className="text-text-primary text-lg font-medium leading-normal">{formatResult(result)}</p>
                  )}
                  <p className="text-text-secondary text-lg font-medium leading-normal">{toCurrency}</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
              <label className="flex flex-col flex-1">
                <p className="text-text-secondary text-sm font-medium leading-normal pb-2">From</p>
                <div className="relative w-full">
                  <select
                    value={fromCurrency}
                    onChange={(e) => setFromCurrency(e.target.value)}
                    disabled={loadingCurrencies}
                    className="form-select appearance-none w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-conv-primary border border-conv-border bg-conv-input focus:border-conv-primary h-14 placeholder:text-text-muted p-[15px] pr-10 text-base font-normal leading-normal transition-colors"
                  >
                    {loadingCurrencies ? <option>Loading...</option> : currencies.map(c => (
                      <option key={c.code} value={c.code} className="bg-conv-card text-text-primary">{c.code} - {c.name}</option>
                    ))}
                  </select>
                  <span className="material-symbols-outlined pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary">expand_more</span>
                </div>
              </label>

              <button
                onClick={handleSwap}
                className="flex min-w-[44px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-11 w-11 sm:mt-7 bg-input-bg hover:bg-border-subtle transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 self-center"
              >
                <span className="material-symbols-outlined text-text-primary text-2xl sm:rotate-0 rotate-90">swap_horiz</span>
              </button>

              <label className="flex flex-col flex-1">
                <p className="text-text-secondary text-sm font-medium leading-normal pb-2">To</p>
                <div className="relative w-full">
                  <select
                    value={toCurrency}
                    onChange={(e) => setToCurrency(e.target.value)}
                    disabled={loadingCurrencies}
                    className="form-select appearance-none w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-conv-primary border border-conv-border bg-conv-input focus:border-conv-primary h-14 placeholder:text-text-muted p-[15px] pr-10 text-base font-normal leading-normal transition-colors"
                  >
                    {loadingCurrencies ? <option>Loading...</option> : currencies.map(c => (
                      <option key={c.code} value={c.code} className="bg-conv-card text-text-primary">{c.code} - {c.name}</option>
                    ))}
                  </select>
                  <span className="material-symbols-outlined pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary">expand_more</span>
                </div>
              </label>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={handleRefresh}
                className="flex flex-1 min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-6 bg-conv-primary hover:bg-conv-primary/90 text-black text-base font-bold leading-normal tracking-[0.015em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 shadow-lg shadow-green-500/20"
              >
                <span className={`material-symbols-outlined text-xl mr-2 ${loading ? 'animate-spin' : ''}`}>refresh</span>
                <span className="truncate">Refresh Rate</span>
              </button>
              <button
                onClick={() => setAmount(0)}
                className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-6 bg-transparent text-text-secondary hover:bg-input-bg hover:text-text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 border border-conv-border"
              >
                <span className="truncate">Reset</span>
              </button>
            </div>
          </div>

          <div className="bg-input-bg px-6 py-3 flex items-center justify-between text-xs text-text-muted border-t border-conv-border transition-colors">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-sm text-green-400">currency_exchange</span>
              <span>Live market rates</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">update</span>
              <span>Updated just now</span>
            </div>
          </div>
        </div>

        {/* Enhanced Currency Exchange Rates */}
        {localCurrency && (
          <div className="w-full max-w-2xl mt-8">
            <div className="mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-conv-primary text-2xl">currency_exchange</span>
              <h3 className="text-text-primary text-lg sm:text-xl font-bold">
                Live Exchange Rates
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {MAJOR_CURRENCIES.filter(c => c !== localCurrency).slice(0, 10).map(currency => {
                // Calculate buy/sell rates (adding 0.5% spread for buy, subtracting for sell)
                const baseRate = majorRates['USD'] ? (1 / majorRates['USD']) : 0;
                const buyRate = baseRate * 1.005; // 0.5% markup for buy
                const sellRate = baseRate * 0.995; // 0.5% markdown for sell

                // Currency symbols mapping
                const currencySymbols: Record<string, string> = {
                  'USD': '$', 'EUR': '€', 'GBP': '£', 'JPY': '¥', 'AUD': 'A$',
                  'CAD': 'C$', 'CHF': 'Fr', 'CNY': '¥', 'INR': '₹', 'NZD': 'NZ$',
                  'NGN': '₦', 'ZAR': 'R', 'KES': 'KSh', 'GHS': '₵'
                };

                const localSymbol = currencySymbols[localCurrency] || localCurrency;

                // Country code mapping for flags (using flagcdn.com)
                const countryFlags: Record<string, string> = {
                  'USD': 'us', 'EUR': 'eu', 'GBP': 'gb', 'JPY': 'jp', 'AUD': 'au',
                  'CAD': 'ca', 'CHF': 'ch', 'CNY': 'cn', 'INR': 'in', 'NZD': 'nz',
                  'NGN': 'ng', 'ZAR': 'za', 'KES': 'ke', 'GHS': 'gh'
                };

                const flagCode = countryFlags[currency] || 'un';

                return (
                  <div
                    key={currency}
                    className="bg-conv-card border border-conv-border rounded-xl p-4 hover:border-conv-primary transition-all shadow-sm hover:shadow-md"
                  >
                    {/* Header with flag and currency */}
                    <div className="flex items-center gap-3 mb-3 pb-3 border-b border-conv-border">
                      <img
                        src={`https://flagcdn.com/48x36/${flagCode}.png`}
                        alt={`${currency} flag`}
                        className="w-8 h-6 rounded shadow-sm"
                        onError={(e) => {
                          // Fallback to a placeholder if flag fails to load
                          e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="48" height="36"%3E%3Crect width="48" height="36" fill="%23ddd"/%3E%3C/svg%3E';
                        }}
                      />
                      <div className="flex-1">
                        <p className="text-text-primary font-bold text-base">{currency}</p>
                        <p className="text-text-secondary text-xs">
                          {currency === 'USD' ? 'US Dollar' :
                            currency === 'EUR' ? 'Euro' :
                              currency === 'GBP' ? 'British Pound' :
                                currency === 'JPY' ? 'Japanese Yen' :
                                  currency === 'AUD' ? 'Australian Dollar' :
                                    currency === 'CAD' ? 'Canadian Dollar' :
                                      currency === 'CHF' ? 'Swiss Franc' :
                                        currency === 'CNY' ? 'Chinese Yuan' :
                                          currency === 'INR' ? 'Indian Rupee' :
                                            'New Zealand Dollar'}
                        </p>
                      </div>
                    </div>

                    {/* Buy/Sell Rates */}
                    <div className="grid grid-cols-2 gap-3">
                      {/* BUY Rate */}
                      <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3">
                        <p className="text-green-600 dark:text-green-400 text-xs font-bold mb-1 uppercase">Buy</p>
                        <div className="flex items-baseline gap-1">
                          <span className="text-text-secondary text-xs">{localSymbol}</span>
                          <span className="text-text-primary text-lg font-bold">
                            {buyRate.toFixed(2)}
                          </span>
                        </div>
                        <p className="text-text-muted text-[10px] mt-1">per {currencySymbols[currency] || currency}</p>
                      </div>

                      {/* SELL Rate */}
                      <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                        <p className="text-red-600 dark:text-red-400 text-xs font-bold mb-1 uppercase">Sell</p>
                        <div className="flex items-baseline gap-1">
                          <span className="text-text-secondary text-xs">{localSymbol}</span>
                          <span className="text-text-primary text-lg font-bold">
                            {sellRate.toFixed(2)}
                          </span>
                        </div>
                        <p className="text-text-muted text-[10px] mt-1">per {currencySymbols[currency] || currency}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Disclaimer */}
            <div className="mt-4 p-3 bg-input-bg border border-conv-border rounded-lg">
              <p className="text-text-muted text-xs text-center">
                <span className="material-symbols-outlined text-sm align-middle mr-1">info</span>
                Rates include a 0.5% spread. Actual rates may vary by provider.
              </p>
            </div>
          </div>
        )}

      </main>
    </div>
  );
};

export default CurrencyConverter;
