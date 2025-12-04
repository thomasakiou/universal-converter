import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import NavBar from '../components/NavBar';
import { ConverterCategory } from '../types';

const categories: ConverterCategory[] = [
  { id: 'currency', name: 'Currency', description: 'Convert between different currencies', icon: 'currency_exchange', path: '/converter/currency', color: 'text-dash-accent' },
  { id: 'distance', name: 'Distance', description: 'Metric, imperial, and other units', icon: 'straighten', path: '/converter/distance', color: 'text-dash-accent' },
  { id: 'weight', name: 'Weight', description: 'Convert between various units of mass', icon: 'weight', path: '/converter/weight', color: 'text-dash-accent' },
  { id: 'temperature', name: 'Temperature', description: 'Celsius, Fahrenheit, and Kelvin', icon: 'device_thermostat', path: '/converter/temperature', color: 'text-dash-accent' },
  { id: 'volume', name: 'Volume', description: 'Convert liters, gallons, and more', icon: 'science', path: '/converter/volume', color: 'text-dash-accent' },
  { id: 'area', name: 'Area', description: 'Square meters, feet, acres, etc.', icon: 'aspect_ratio', path: '/converter/area', color: 'text-dash-accent' },
  { id: 'speed', name: 'Speed', description: 'Km/h, mph, knots, and more', icon: 'speed', path: '/converter/speed', color: 'text-dash-accent' },
  { id: 'time', name: 'Time', description: 'Seconds, minutes, hours, days', icon: 'schedule', path: '/converter/time', color: 'text-dash-accent' },
  { id: 'storage', name: 'Data Storage', description: 'Bytes, kilobytes, megabytes, etc.', icon: 'database', path: '/converter/storage', color: 'text-dash-accent' },
  { id: 'energy', name: 'Energy', description: 'Joules, calories, kilowatt-hours', icon: 'bolt', path: '/converter/energy', color: 'text-dash-accent' },
  { id: 'power', name: 'Power', description: 'Watts, horsepower, and more', icon: 'power', path: '/converter/power', color: 'text-dash-accent' },
  { id: 'pressure', name: 'Pressure', description: 'Pascals, bars, psi, and atmospheres', icon: 'compress', path: '/converter/pressure', color: 'text-dash-accent' },
];

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-dash-bg font-display text-text-primary">
      <div className="flex h-full grow flex-col items-center">
        <div className="flex w-full max-w-7xl flex-col flex-1">
          {/* Custom Header separate from NavBar to match design exactly if needed, but reusing NavBar is better for consistency. 
              However, the design shows a slightly different header for Dashboard (simple icons on right).
              I will assume NavBar covers it, or make a slightly variant header.
          */}
          <header className="flex items-center justify-between whitespace-nowrap border-b border-dash-border px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center gap-4 text-text-primary">
              <div className="text-dash-accent size-8">
                <span className="material-symbols-outlined !text-4xl">multiple_stop</span>
              </div>
              <h2 className="text-text-primary text-xl font-bold leading-tight tracking-tight">Converter Hub</h2>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => navigate('/')}
                className="flex h-10 w-10 cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-input-bg text-text-primary transition-colors hover:bg-border-subtle"
                title="Home"
              >
                <span className="material-symbols-outlined">home</span>
              </button>
              <button
                onClick={() => navigate('/settings')}
                className="flex h-10 w-10 cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-input-bg text-text-primary transition-colors hover:bg-border-subtle"
                title="Settings"
              >
                <span className="material-symbols-outlined">settings</span>
              </button>
              <button
                onClick={() => navigate('/contact')}
                className="flex h-10 w-10 cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-input-bg text-text-primary transition-colors hover:bg-border-subtle"
                title="Contact"
              >
                <span className="material-symbols-outlined">info</span>
              </button>
            </div>
          </header>

          <main className="flex flex-col gap-8 py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap justify-between gap-4">
              <div className="flex flex-col gap-2">
                <p className="text-text-primary text-4xl sm:text-5xl font-black leading-tight tracking-tighter">Universal Converter</p>
                <p className="text-text-secondary text-lg font-normal leading-normal">Choose a converter to get started</p>
              </div>
            </div>

            <div className="">
              <label className="flex flex-col min-w-40 h-14 w-full">
                <div className="flex w-full flex-1 items-stretch rounded-xl h-full border border-dash-border bg-input-bg focus-within:border-dash-accent focus-within:ring-2 focus-within:ring-dash-accent/50 transition-all">
                  <div className="text-text-secondary flex items-center justify-center pl-4">
                    <span className="material-symbols-outlined">search</span>
                  </div>
                  <input
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-text-primary focus:outline-0 focus:ring-0 border-none bg-transparent h-full placeholder:text-text-secondary px-4 text-base font-normal leading-normal"
                    placeholder="Search for a converter..."
                  />
                </div>
              </label>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {categories.map((cat) => (
                <div
                  key={cat.id}
                  onClick={() => navigate(cat.path)}
                  className="group flex cursor-pointer flex-col gap-4 rounded-xl border border-dash-border bg-dash-card p-5 transition-all hover:border-dash-accent hover:bg-dash-primary/20"
                >
                  <span className={`material-symbols-outlined !text-4xl ${cat.color}`}>{cat.icon}</span>
                  <div>
                    <p className="text-text-primary text-lg font-bold leading-normal">{cat.name}</p>
                    <p className="text-text-secondary text-sm font-normal leading-normal">{cat.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </main>

          <footer className="flex flex-col gap-8 px-5 py-10 text-center border-t border-dash-border mt-12">
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
              <Link to="/contact" className="text-text-secondary hover:text-text-primary text-base font-normal leading-normal transition-colors">Contact</Link>
              <Link to="/privacy-policy" className="text-text-secondary hover:text-text-primary text-base font-normal leading-normal transition-colors">Privacy Policy</Link>
              <Link to="/terms-of-service" className="text-text-secondary hover:text-text-primary text-base font-normal leading-normal transition-colors">Terms of Service</Link>
            </div>
            <p className="text-text-muted text-sm font-normal leading-normal">© 2024 Converter Hub. All rights reserved.</p>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
