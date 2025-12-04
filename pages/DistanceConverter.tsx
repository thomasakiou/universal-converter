import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import { useSettings } from '../context/SettingsContext';

interface DistanceUnit {
    code: string;
    name: string;
    toMeters: number; // Conversion factor to meters
}

const distanceUnits: DistanceUnit[] = [
    { code: 'mm', name: 'Millimeters', toMeters: 0.001 },
    { code: 'cm', name: 'Centimeters', toMeters: 0.01 },
    { code: 'm', name: 'Meters', toMeters: 1 },
    { code: 'km', name: 'Kilometers', toMeters: 1000 },
    { code: 'in', name: 'Inches', toMeters: 0.0254 },
    { code: 'ft', name: 'Feet', toMeters: 0.3048 },
    { code: 'yd', name: 'Yards', toMeters: 0.9144 },
    { code: 'mi', name: 'Miles', toMeters: 1609.344 },
    { code: 'nmi', name: 'Nautical Miles', toMeters: 1852 },
];

const DistanceConverter: React.FC = () => {
    const { settings } = useSettings();
    const [amount, setAmount] = useState<number>(100);
    const [fromUnit, setFromUnit] = useState<string>('m');
    const [toUnit, setToUnit] = useState<string>('ft');
    const [result, setResult] = useState<number>(0);

    // Set defaults based on measurement system
    useEffect(() => {
        if (settings.measurementSystem === 'metric') {
            setFromUnit('m');
            setToUnit('km');
        } else {
            setFromUnit('ft');
            setToUnit('mi');
        }
    }, [settings.measurementSystem]);

    // Conversion logic
    useEffect(() => {
        const fromUnitData = distanceUnits.find(u => u.code === fromUnit);
        const toUnitData = distanceUnits.find(u => u.code === toUnit);

        if (fromUnitData && toUnitData) {
            // Convert to meters first, then to target unit
            const meters = amount * fromUnitData.toMeters;
            const converted = meters / toUnitData.toMeters;
            setResult(converted);
        }
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
                    <h1 className="text-text-primary text-4xl sm:text-5xl font-black leading-tight tracking-[-0.033em]">Distance Converter</h1>
                    <p className="text-text-secondary text-base font-normal leading-normal">Convert between metric and imperial units</p>
                </div>

                <div className="w-full max-w-2xl rounded-xl bg-conv-card shadow-2xl overflow-hidden transition-colors duration-300">
                    <div className="p-6 sm:p-8 space-y-6">

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
                                    <p className="text-text-primary text-lg font-medium leading-normal">{formatResult(result)}</p>
                                    <p className="text-text-secondary text-lg font-medium leading-normal">{toUnit}</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
                            <label className="flex flex-col flex-1">
                                <p className="text-text-secondary text-sm font-medium leading-normal pb-2">From</p>
                                <div className="relative w-full">
                                    <select
                                        value={fromUnit}
                                        onChange={(e) => setFromUnit(e.target.value)}
                                        className="form-select appearance-none w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-conv-primary border border-conv-border bg-conv-input focus:border-conv-primary h-14 placeholder:text-text-muted p-[15px] pr-10 text-base font-normal leading-normal transition-colors"
                                    >
                                        {distanceUnits.map(u => <option key={u.code} value={u.code} className="bg-conv-card text-text-primary">{u.code} - {u.name}</option>)}
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
                                        value={toUnit}
                                        onChange={(e) => setToUnit(e.target.value)}
                                        className="form-select appearance-none w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-conv-primary border border-conv-border bg-conv-input focus:border-conv-primary h-14 placeholder:text-text-muted p-[15px] pr-10 text-base font-normal leading-normal transition-colors"
                                    >
                                        {distanceUnits.map(u => <option key={u.code} value={u.code} className="bg-conv-card text-text-primary">{u.code} - {u.name}</option>)}
                                    </select>
                                    <span className="material-symbols-outlined pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary">expand_more</span>
                                </div>
                            </label>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3 pt-2">
                            <button className="flex flex-1 min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-6 bg-conv-primary hover:bg-conv-primary/90 text-black text-base font-bold leading-normal tracking-[0.015em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 shadow-lg shadow-green-500/20">
                                <span className="truncate">Convert</span>
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
                            <span className="material-symbols-outlined text-sm text-green-400">straighten</span>
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
                                <p className="text-text-secondary mb-1">Metric System</p>
                                <p className="text-text-primary">1 km = 1,000 m</p>
                                <p className="text-text-primary">1 m = 100 cm</p>
                                <p className="text-text-primary">1 cm = 10 mm</p>
                            </div>
                            <div className="bg-input-bg rounded-lg p-3 border border-conv-border transition-colors">
                                <p className="text-text-secondary mb-1">Imperial System</p>
                                <p className="text-text-primary">1 mi = 1,760 yd</p>
                                <p className="text-text-primary">1 yd = 3 ft</p>
                                <p className="text-text-primary">1 ft = 12 in</p>
                            </div>
                            <div className="bg-input-bg rounded-lg p-3 border border-conv-border transition-colors">
                                <p className="text-text-secondary mb-1">Common Conversions</p>
                                <p className="text-text-primary">1 mi ≈ 1.609 km</p>
                                <p className="text-text-primary">1 m ≈ 3.281 ft</p>
                                <p className="text-text-primary">1 in = 2.54 cm</p>
                            </div>
                            <div className="bg-input-bg rounded-lg p-3 border border-conv-border transition-colors">
                                <p className="text-text-secondary mb-1">Nautical</p>
                                <p className="text-text-primary">1 nmi ≈ 1.852 km</p>
                                <p className="text-text-primary">1 nmi ≈ 1.151 mi</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default DistanceConverter;
