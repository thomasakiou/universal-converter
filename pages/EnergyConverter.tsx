import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import { useSettings } from '../context/SettingsContext';

interface EnergyUnit {
    code: string;
    name: string;
    toJoules: number;
}

const energyUnits: EnergyUnit[] = [
    { code: 'J', name: 'Joules', toJoules: 1 },
    { code: 'kJ', name: 'Kilojoules', toJoules: 1000 },
    { code: 'cal', name: 'Calories', toJoules: 4.184 },
    { code: 'kcal', name: 'Kilocalories', toJoules: 4184 },
    { code: 'Wh', name: 'Watt-hours', toJoules: 3600 },
    { code: 'kWh', name: 'Kilowatt-hours', toJoules: 3600000 },
    { code: 'BTU', name: 'British Thermal Units', toJoules: 1055.06 },
    { code: 'ft-lb', name: 'Foot-pounds', toJoules: 1.35582 },
];

const EnergyConverter: React.FC = () => {
    const { settings } = useSettings();
    const [amount, setAmount] = useState<number>(1);
    const [fromUnit, setFromUnit] = useState<string>('J');
    const [toUnit, setToUnit] = useState<string>('kcal');
    const [result, setResult] = useState<number>(0);

    useEffect(() => {
        if (settings.measurementSystem === 'imperial') {
            setFromUnit('BTU');
            setToUnit('ft-lb');
        } else {
            setFromUnit('J');
            setToUnit('kWh');
        }
    }, [settings.measurementSystem]);

    useEffect(() => {
        const fromUnitData = energyUnits.find(u => u.code === fromUnit);
        const toUnitData = energyUnits.find(u => u.code === toUnit);

        if (fromUnitData && toUnitData) {
            const joules = amount * fromUnitData.toJoules;
            const converted = joules / toUnitData.toJoules;
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
                    <h1 className="text-text-primary text-4xl sm:text-5xl font-black leading-tight tracking-[-0.033em]">Energy Converter</h1>
                    <p className="text-text-secondary text-base font-normal leading-normal">Joules, calories, kWh, and more</p>
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
                                        {energyUnits.map(u => <option key={u.code} value={u.code} className="bg-conv-card text-text-primary">{u.code} - {u.name}</option>)}
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
                                        {energyUnits.map(u => <option key={u.code} value={u.code} className="bg-conv-card text-text-primary">{u.code} - {u.name}</option>)}
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
                            <span className="material-symbols-outlined text-sm text-green-400">bolt</span>
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
                                <p className="text-text-secondary mb-1">Food Energy</p>
                                <p className="text-text-primary">1 kcal = 1,000 cal</p>
                                <p className="text-text-primary">1 kcal ≈ 4.184 kJ</p>
                            </div>
                            <div className="bg-input-bg rounded-lg p-3 border border-conv-border transition-colors">
                                <p className="text-text-secondary mb-1">Electrical Energy</p>
                                <p className="text-text-primary">1 kWh = 3.6 MJ</p>
                                <p className="text-text-primary">1 Wh = 3,600 J</p>
                            </div>
                            <div className="bg-input-bg rounded-lg p-3 border border-conv-border transition-colors">
                                <p className="text-text-secondary mb-1">Imperial Units</p>
                                <p className="text-text-primary">1 BTU ≈ 1,055 J</p>
                                <p className="text-text-primary">1 ft-lb ≈ 1.356 J</p>
                            </div>
                            <div className="bg-input-bg rounded-lg p-3 border border-conv-border transition-colors">
                                <p className="text-text-secondary mb-1">Fun Fact</p>
                                <p className="text-text-primary">A banana has about 105 kcal (439 kJ)</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default EnergyConverter;
