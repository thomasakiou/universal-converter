import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import { useSettings } from '../context/SettingsContext';

interface TemperatureUnit {
    code: string;
    name: string;
}

const temperatureUnits: TemperatureUnit[] = [
    { code: 'C', name: 'Celsius' },
    { code: 'F', name: 'Fahrenheit' },
    { code: 'K', name: 'Kelvin' },
];

const TemperatureConverter: React.FC = () => {
    const { settings } = useSettings();
    const [amount, setAmount] = useState<number>(0);
    const [fromUnit, setFromUnit] = useState<string>('C');
    const [toUnit, setToUnit] = useState<string>('F');
    const [result, setResult] = useState<number>(0);

    useEffect(() => {
        if (settings.measurementSystem === 'imperial') {
            setFromUnit('F');
            setToUnit('C');
        } else {
            setFromUnit('C');
            setToUnit('F');
        }
    }, [settings.measurementSystem]);

    useEffect(() => {
        let celsius = 0;

        // Convert to Celsius first
        if (fromUnit === 'C') celsius = amount;
        else if (fromUnit === 'F') celsius = (amount - 32) * 5 / 9;
        else if (fromUnit === 'K') celsius = amount - 273.15;

        // Convert from Celsius to target
        let converted = 0;
        if (toUnit === 'C') converted = celsius;
        else if (toUnit === 'F') converted = (celsius * 9 / 5) + 32;
        else if (toUnit === 'K') converted = celsius + 273.15;

        setResult(converted);
    }, [amount, fromUnit, toUnit]);

    const handleSwap = () => {
        setFromUnit(toUnit);
        setToUnit(fromUnit);
    };

    const formatResult = (value: number): string => {
        if (value === 0) return '0.00';
        return value.toFixed(settings.decimalRounding);
    };

    return (
        <div className="flex flex-col min-h-screen bg-conv-bg font-display text-text-primary transition-colors duration-300">
            <NavBar />
            <main className="w-full flex-grow flex flex-col items-center justify-center p-4">
                <div className="flex w-full max-w-2xl flex-col gap-2 p-4 text-center mb-8">
                    <h1 className="text-text-primary text-4xl sm:text-5xl font-black leading-tight tracking-[-0.033em]">Temperature Converter</h1>
                    <p className="text-text-secondary text-base font-normal leading-normal">Celsius, Fahrenheit, Kelvin</p>
                </div>
                <div className="w-full max-w-2xl rounded-xl bg-conv-card shadow-2xl overflow-hidden transition-colors duration-300">
                    <div className="p-6 sm:p-8 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
                            <label className="flex flex-col w-full">
                                <p className="text-text-secondary text-sm font-medium leading-normal pb-2">Amount</p>
                                <input type="number" value={amount} onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
                                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-conv-primary border border-conv-border bg-conv-input focus:border-conv-primary h-14 placeholder:text-text-muted p-[15px] text-lg font-normal leading-normal transition-colors" />
                            </label>
                            <div className="w-full">
                                <p className="text-text-secondary text-sm font-medium leading-normal pb-2">Converted to</p>
                                <div className="flex items-center justify-between w-full min-w-0 resize-none overflow-hidden rounded-lg border border-conv-border bg-conv-input h-14 p-[15px] transition-colors">
                                    <p className="text-text-primary text-lg font-medium leading-normal">{formatResult(result)}</p>
                                    <p className="text-text-secondary text-lg font-medium leading-normal">{toUnit}</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
                            <label className="flex flex-col flex-1">
                                <p className="text-text-secondary text-sm font-medium leading-normal pb-2">From</p>
                                <div className="relative w-full">
                                    <select value={fromUnit} onChange={(e) => setFromUnit(e.target.value)}
                                        className="form-select appearance-none w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-conv-primary border border-conv-border bg-conv-input focus:border-conv-primary h-14 placeholder:text-text-muted p-[15px] pr-10 text-base font-normal leading-normal transition-colors">
                                        {temperatureUnits.map(u => <option key={u.code} value={u.code} className="bg-conv-card text-text-primary">{u.code} - {u.name}</option>)}
                                    </select>
                                    <span className="material-symbols-outlined pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary">expand_more</span>
                                </div>
                            </label>
                            <button onClick={handleSwap}
                                className="flex min-w-[44px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-11 w-11 sm:mt-7 bg-input-bg hover:bg-border-subtle transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 self-center">
                                <span className="material-symbols-outlined text-text-primary text-2xl sm:rotate-0 rotate-90">swap_horiz</span>
                            </button>
                            <label className="flex flex-col flex-1">
                                <p className="text-text-secondary text-sm font-medium leading-normal pb-2">To</p>
                                <div className="relative w-full">
                                    <select value={toUnit} onChange={(e) => setToUnit(e.target.value)}
                                        className="form-select appearance-none w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-conv-primary border border-conv-border bg-conv-input focus:border-conv-primary h-14 placeholder:text-text-muted p-[15px] pr-10 text-base font-normal leading-normal transition-colors">
                                        {temperatureUnits.map(u => <option key={u.code} value={u.code} className="bg-conv-card text-text-primary">{u.code} - {u.name}</option>)}
                                    </select>
                                    <span className="material-symbols-outlined pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary">expand_more</span>
                                </div>
                            </label>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3 pt-2">
                            <button className="flex flex-1 min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-6 bg-conv-primary hover:bg-conv-primary/90 text-black text-base font-bold leading-normal tracking-[0.015em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 shadow-lg shadow-green-500/20">
                                <span className="truncate">Convert</span>
                            </button>
                            <button onClick={() => setAmount(0)}
                                className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-6 bg-transparent text-text-secondary hover:bg-input-bg hover:text-text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 border border-conv-border">
                                <span className="truncate">Reset</span>
                            </button>
                        </div>
                    </div>
                    <div className="bg-input-bg px-6 py-3 flex items-center justify-between text-xs text-text-muted border-t border-conv-border transition-colors">
                        <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-sm text-green-400">thermostat</span>
                            <span>Accurate conversion formulas</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <span className="material-symbols-outlined text-sm">check_circle</span>
                            <span>Instant results</span>
                        </div>
                    </div>
                </div>

                {/* Quick Reference Card */}
                <div className="w-full max-w-2xl rounded-xl bg-conv-card shadow-2xl overflow-hidden mt-8 transition-colors duration-300">
                    <div className="p-6">
                        <h3 className="text-text-primary text-lg font-bold mb-4 flex items-center gap-2">
                            <span className="material-symbols-outlined text-conv-primary">info</span>
                            Quick Reference
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                            <div className="bg-input-bg rounded-lg p-3 border border-conv-border transition-colors">
                                <p className="text-text-secondary mb-1">Water Freezing</p>
                                <p className="text-text-primary">0 °C</p>
                                <p className="text-text-primary">32 °F</p>
                                <p className="text-text-primary">273.15 K</p>
                            </div>
                            <div className="bg-input-bg rounded-lg p-3 border border-conv-border transition-colors">
                                <p className="text-text-secondary mb-1">Water Boiling</p>
                                <p className="text-text-primary">100 °C</p>
                                <p className="text-text-primary">212 °F</p>
                                <p className="text-text-primary">373.15 K</p>
                            </div>
                            <div className="bg-input-bg rounded-lg p-3 border border-conv-border transition-colors">
                                <p className="text-text-secondary mb-1">Formulas</p>
                                <p className="text-text-primary">°F = (°C × 9/5) + 32</p>
                                <p className="text-text-primary">K = °C + 273.15</p>
                            </div>
                            <div className="bg-input-bg rounded-lg p-3 border border-conv-border transition-colors">
                                <p className="text-text-secondary mb-1">Fun Fact</p>
                                <p className="text-text-primary">-40 °C is exactly equal to -40 °F</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div >
    );
};

export default TemperatureConverter;
