import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-landing-bg font-body text-text-muted">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-landing-bg/80 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-4 cursor-pointer" onClick={() => navigate('/')}>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-landing-primary">
                <span className="material-symbols-outlined text-xl text-black">all_inclusive</span>
              </div>
              <h2 className="font-display text-xl font-bold text-text-primary">UniCon</h2>
            </div>
            <nav className="hidden items-center gap-8 md:flex">
              <a href="#" className="text-sm font-medium text-text-muted hover:text-landing-primary transition-colors">Converters</a>
              <a href="#" className="text-sm font-medium text-text-muted hover:text-landing-primary transition-colors">Features</a>
              <a href="#" className="text-sm font-medium text-text-muted hover:text-landing-primary transition-colors">About</a>
            </nav>
            <button
              onClick={() => navigate('/dashboard')}
              className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-5 bg-landing-primary text-black text-sm font-bold leading-normal tracking-wide transition-all hover:bg-opacity-90 hover:shadow-glow-primary"
            >
              <span className="truncate">Launch App</span>
            </button>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-20 pb-24 md:pt-32 md:pb-36">
          <div className="absolute inset-0 z-0 opacity-20 dark:opacity-30 pointer-events-none">
            <div className="absolute -left-48 top-0 h-96 w-96 rounded-full bg-landing-primary/50 blur-3xl"></div>
            <div className="absolute -right-48 -top-24 h-96 w-96 rounded-full bg-landing-secondary/50 blur-3xl"></div>
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
              <div className="flex flex-col gap-8 text-center md:text-left">
                <div className="flex flex-col gap-4">
                  <h1 className="font-display text-4xl font-extrabold leading-tight tracking-tight text-text-primary md:text-5xl lg:text-6xl">
                    Convert Anything, <br /> Instantly.
                  </h1>
                  <p className="text-lg text-text-muted max-w-lg mx-auto md:mx-0">
                    Seamlessly switch between currencies, distances, temperatures, and more with our intelligent, user-friendly converter.
                  </p>
                </div>
                <div className="flex flex-wrap justify-center gap-4 md:justify-start">
                  <button
                    onClick={() => navigate('/dashboard')}
                    className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-12 px-6 bg-landing-primary text-black text-base font-bold leading-normal tracking-wide transition-all duration-300 hover:scale-105 hover:shadow-glow-primary"
                  >
                    <span className="truncate">Launch Converter</span>
                  </button>
                  <button className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-12 px-6 bg-landing-card text-text-primary font-bold leading-normal tracking-wide transition-all duration-300 hover:scale-105 border border-white/10 hover:bg-white/5">
                    <span className="truncate">Learn More</span>
                  </button>
                </div>
              </div>
              <div className="w-full relative">
                <div className="absolute -inset-2 rounded-2xl bg-gradient-to-br from-landing-primary to-landing-secondary opacity-30 blur-xl"></div>
                <img
                  className="relative aspect-video w-full rounded-2xl object-cover shadow-2xl shadow-landing-secondary/20"
                  alt="UniCon Hero"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAGXWET_kbgoDLGyaFYESzEIHbiTwQkeypdpBoNojOaavsu3WKEru1erZYXu0dOmBEBFv2SzgCsfuYX336r5qEpzCAmk59oQDkoBAXbjTAvjebrVjcXdgVH_EH3WvdcRrkC3q4dfdQCp6cbcX_uaQZOmLFdo-3OtCMsK9wbxziroOb4dtu5wci1yzHW4LnwUpmUv4kqAIGYb1Pt-kvRZR3s2XlcBl0X-6NZXslxjibt8vKhuuwf0FrgyFONnpQJ6qIe0croNyC5okE"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 md:py-24 bg-black">
          <div className="container mx-auto px-4">
            <div className="flex flex-col gap-12">
              <div className="max-w-3xl text-center mx-auto">
                <h2 className="font-display text-3xl font-bold text-text-primary md:text-4xl">One Tool for Every Unit.</h2>
                <p className="mt-4 text-lg text-text-muted">
                  UniCon is designed to be your go-to converter for any situation, packed with features that make conversions effortless.
                </p>
              </div>
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">

                {/* Feature 1 */}
                <div className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-landing-card p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-glow-primary">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-landing-primary/20">
                    <span className="material-symbols-outlined text-landing-primary text-3xl">currency_exchange</span>
                  </div>
                  <div className="flex flex-col gap-2 text-left">
                    <h3 className="font-display text-xl font-semibold text-text-primary">Real-time Currency</h3>
                    <p className="text-text-muted">
                      Get up-to-the-minute exchange rates for hundreds of global currencies, ensuring accuracy for your financial needs.
                    </p>
                  </div>
                </div>

                {/* Feature 2 */}
                <div className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-landing-card p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-glow-secondary">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-landing-secondary/20">
                    <span className="material-symbols-outlined text-landing-secondary text-3xl">straighten</span>
                  </div>
                  <div className="flex flex-col gap-2 text-left">
                    <h3 className="font-display text-xl font-semibold text-text-primary">Comprehensive Categories</h3>
                    <p className="text-text-muted">
                      Convert everything from length and weight to data and temperature with our extensive library of units.
                    </p>
                  </div>
                </div>

                {/* Feature 3 */}
                <div className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-landing-card p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_25px_rgba(244,171,52,0.3)]">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-landing-accent/20">
                    <span className="material-symbols-outlined text-landing-accent text-3xl">history</span>
                  </div>
                  <div className="flex flex-col gap-2 text-left">
                    <h3 className="font-display text-xl font-semibold text-text-primary">Conversion History</h3>
                    <p className="text-text-muted">
                      Easily access your recent conversions, saving you time and effort when you need to recall past results.
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-landing-bg border-t border-white/10">
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5">
            <div className="col-span-2 lg:col-span-1">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-landing-primary">
                  <span className="material-symbols-outlined text-xl text-black">all_inclusive</span>
                </div>
                <h2 className="font-display text-xl font-bold text-text-primary">UniCon</h2>
              </div>
              <p className="mt-4 text-sm text-text-muted">The last converter you'll ever need.</p>
            </div>
            {/* Links columns */}
            <div>
              <h3 className="font-display font-semibold text-text-primary">Product</h3>
              <ul className="mt-4 space-y-3">
                <li><Link to="/dashboard" className="text-sm text-text-muted hover:text-landing-primary transition-colors">Converters</Link></li>
                <li><a href="#" className="text-sm text-text-muted hover:text-landing-primary transition-colors">Features</a></li>
                <li><a href="#" className="text-sm text-text-muted hover:text-landing-primary transition-colors">Pricing</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-display font-semibold text-text-primary">Company</h3>
              <ul className="mt-4 space-y-3">
                <li><a href="#" className="text-sm text-text-muted hover:text-landing-primary transition-colors">About Us</a></li>
                <li><Link to="/contact" className="text-sm text-text-muted hover:text-landing-primary transition-colors">Contact</Link></li>
                <li><a href="#" className="text-sm text-text-muted hover:text-landing-primary transition-colors">Careers</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-display font-semibold text-text-primary">Legal</h3>
              <ul className="mt-4 space-y-3">
                <li><Link to="/privacy-policy" className="text-sm text-text-muted hover:text-landing-primary transition-colors">Privacy Policy</Link></li>
                <li><Link to="/terms-of-service" className="text-sm text-text-muted hover:text-landing-primary transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-16 flex flex-col items-center justify-between border-t border-white/10 pt-8 sm:flex-row">
            <p className="text-sm text-text-muted">© 2024 UniCon. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
