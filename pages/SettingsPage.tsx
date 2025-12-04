import React from 'react';
import NavBar from '../components/NavBar';
import { useTheme } from '../context/ThemeContext';
import { useSettings } from '../context/SettingsContext';
import { Theme } from '../types';

const SettingsPage: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { settings, updateSettings, resetSettings } = useSettings();

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-dash-bg group/design-root overflow-x-hidden font-display text-text-primary transition-colors duration-300">
      <NavBar />

      <div className="flex flex-1 justify-center py-5 px-4 sm:px-8 md:px-20 lg:px-40">
        <div className="layout-content-container flex flex-col max-w-[960px] flex-1">

          <div className="flex flex-wrap justify-between gap-3 p-4 mt-4">
            <div className="flex min-w-0 flex-col gap-3">
              <p className="text-text-primary text-3xl sm:text-4xl font-black leading-tight tracking-[-0.033em]">Settings</p>
              <p className="text-text-secondary text-sm sm:text-base font-normal leading-normal">Manage your preferences for the UniCon application.</p>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-text-primary text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Appearance</h2>
            <div className="p-4">
              <div className="flex flex-1 flex-col items-start justify-between gap-4 rounded-lg border border-dash-border bg-dash-card p-5 sm:flex-row sm:items-center shadow-sm">
                <div className="flex flex-col gap-1">
                  <p className="text-text-primary text-base font-bold leading-tight">Theme</p>
                  <p className="text-text-secondary text-base font-normal leading-normal">Toggle between light and dark mode.</p>
                </div>
                <label className="relative flex h-[31px] w-[51px] cursor-pointer items-center rounded-full border-none bg-input-bg p-0.5 has-[:checked]:justify-end has-[:checked]:bg-dash-primary transition-colors">
                  <div className="h-full w-[27px] rounded-full bg-white shadow-sm"></div>
                  <input
                    type="checkbox"
                    checked={theme === Theme.DARK}
                    onChange={toggleTheme}
                    className="invisible absolute"
                  />
                </label>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <h2 className="text-text-primary text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Preferences</h2>
            <div className="grid grid-cols-1 gap-4 p-4">

              {/* Base Currency */}
              <div className="rounded-lg border border-dash-border bg-dash-card p-5 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex flex-col gap-1">
                    <p className="text-text-primary text-base font-bold leading-tight">Base Currency</p>
                    <p className="text-text-secondary text-base font-normal leading-normal">Select your default currency for conversions.</p>
                  </div>
                  <div className="relative w-full sm:w-56">
                    <select
                      value={settings.baseCurrency}
                      onChange={(e) => updateSettings({ baseCurrency: e.target.value })}
                      className="w-full h-10 appearance-none rounded-lg border border-dash-border bg-input-bg px-3 text-text-primary focus:border-dash-primary focus:outline-none focus:ring-2 focus:ring-dash-primary/50 transition-colors"
                    >
                      <option value="USD" className="bg-dash-card text-text-primary">USD - United States Dollar</option>
                      <option value="EUR" className="bg-dash-card text-text-primary">EUR - Euro</option>
                      <option value="GBP" className="bg-dash-card text-text-primary">GBP - British Pound</option>
                      <option value="JPY" className="bg-dash-card text-text-primary">JPY - Japanese Yen</option>
                    </select>
                    <span className="material-symbols-outlined pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary">expand_more</span>
                  </div>
                </div>
              </div>

              {/* Measurement System */}
              <div className="rounded-lg border border-dash-border bg-dash-card p-5 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex flex-col gap-1">
                    <p className="text-text-primary text-base font-bold leading-tight">Default Measurement System</p>
                    <p className="text-text-secondary text-base font-normal leading-normal">Choose between Metric and Imperial systems.</p>
                  </div>
                  <div className="flex items-center gap-2 rounded-lg bg-input-bg p-1">
                    <button
                      onClick={() => updateSettings({ measurementSystem: 'metric' })}
                      className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${settings.measurementSystem === 'metric' ? 'bg-dash-primary text-white shadow-sm' : 'text-text-secondary hover:text-text-primary'}`}
                    >
                      Metric
                    </button>
                    <button
                      onClick={() => updateSettings({ measurementSystem: 'imperial' })}
                      className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${settings.measurementSystem === 'imperial' ? 'bg-dash-primary text-white shadow-sm' : 'text-text-secondary hover:text-text-primary'}`}
                    >
                      Imperial
                    </button>
                  </div>
                </div>
              </div>

              {/* Decimal Rounding */}
              <div className="rounded-lg border border-dash-border bg-dash-card p-5 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex flex-col gap-1">
                    <p className="text-text-primary text-base font-bold leading-tight">Decimal Rounding</p>
                    <p className="text-text-secondary text-base font-normal leading-normal">Set the number of decimal places for results.</p>
                  </div>
                  <div className="flex items-center gap-4 w-full sm:w-56">
                    <input
                      className="w-full h-2 bg-input-bg rounded-lg appearance-none cursor-pointer accent-dash-primary"
                      max="8"
                      min="0"
                      type="range"
                      value={settings.decimalRounding}
                      onChange={(e) => updateSettings({ decimalRounding: parseInt(e.target.value) })}
                    />
                    <span className="flex items-center justify-center h-8 w-8 rounded-md bg-input-bg text-sm font-medium text-text-primary border border-dash-border">{settings.decimalRounding}</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

          <div className="mt-4">
            <h2 className="text-text-primary text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Account Data</h2>
            <div className="p-4">
              <div className="flex flex-1 flex-col items-start justify-between gap-4 rounded-lg border border-dash-border bg-dash-card p-5 sm:flex-row sm:items-center shadow-sm">
                <div className="flex flex-col gap-1">
                  <p className="text-text-primary text-base font-bold leading-tight">Reset Preferences</p>
                  <p className="text-text-secondary text-base font-normal leading-normal">Restore all settings to their default values.</p>
                </div>
                <button
                  onClick={resetSettings}
                  className="flex items-center justify-center rounded-lg h-10 bg-red-500/10 text-red-500 gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-4 hover:bg-red-500/20 transition-colors"
                >
                  Reset to Defaults
                </button>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-4 p-4 mt-8 border-t border-dash-border">
            <button className="flex items-center justify-center rounded-lg h-10 bg-dash-primary text-white text-sm font-bold min-w-0 px-6 disabled:opacity-50 hover:bg-dash-primary/90 transition-colors shadow-lg shadow-green-500/20">
              Saved Automatically
            </button>
          </div>

        </div>
      </div>

    </div>
  );
};

export default SettingsPage;
