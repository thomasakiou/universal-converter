import React from 'react';
import NavBar from '../components/NavBar';
import { useNavigate, Link } from 'react-router-dom';

const PrivacyPolicy: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col min-h-screen bg-dash-bg font-display text-text-primary transition-colors duration-300">
            <NavBar />

            <main className="flex-1 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors mb-6"
                >
                    <span className="material-symbols-outlined">arrow_back</span>
                    <span className="text-sm font-medium">Back</span>
                </button>

                <div className="bg-dash-card rounded-xl border border-dash-border p-6 sm:p-8 shadow-lg">
                    <h1 className="text-text-primary text-3xl sm:text-4xl font-black mb-2">Privacy Policy</h1>
                    <p className="text-text-secondary text-sm mb-8">Last updated: December 4, 2024</p>

                    <div className="space-y-6 text-text-primary">
                        <section>
                            <h2 className="text-xl font-bold mb-3">1. Information We Collect</h2>
                            <p className="text-text-secondary leading-relaxed mb-3">
                                UniCon is committed to protecting your privacy. We collect minimal information to provide our currency conversion services:
                            </p>
                            <ul className="list-disc list-inside text-text-secondary space-y-2 ml-4">
                                <li>IP address for automatic currency detection (not stored)</li>
                                <li>Browser preferences stored locally (theme, settings)</li>
                                <li>No personal information is collected or stored on our servers</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold mb-3">2. How We Use Your Information</h2>
                            <p className="text-text-secondary leading-relaxed">
                                The information we collect is used solely to:
                            </p>
                            <ul className="list-disc list-inside text-text-secondary space-y-2 ml-4">
                                <li>Automatically detect your local currency for convenience</li>
                                <li>Remember your theme and settings preferences</li>
                                <li>Provide accurate currency conversion rates</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold mb-3">3. Third-Party Services</h2>
                            <p className="text-text-secondary leading-relaxed mb-3">
                                We use the following third-party services:
                            </p>
                            <ul className="list-disc list-inside text-text-secondary space-y-2 ml-4">
                                <li><strong>ExchangeRate-API:</strong> For real-time currency exchange rates</li>
                                <li><strong>IP Geolocation Services:</strong> For automatic currency detection</li>
                                <li><strong>Flagcdn.com:</strong> For displaying country flags</li>
                            </ul>
                            <p className="text-text-secondary leading-relaxed mt-3">
                                These services may have their own privacy policies. We do not control their data practices.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold mb-3">4. Data Storage</h2>
                            <p className="text-text-secondary leading-relaxed">
                                All user preferences (theme, currency settings, measurement system) are stored locally in your browser using localStorage.
                                This data never leaves your device and is not transmitted to our servers.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold mb-3">5. Cookies</h2>
                            <p className="text-text-secondary leading-relaxed">
                                UniCon does not use cookies. We use localStorage for storing your preferences locally on your device.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold mb-3">6. Your Rights</h2>
                            <p className="text-text-secondary leading-relaxed">
                                You have the right to:
                            </p>
                            <ul className="list-disc list-inside text-text-secondary space-y-2 ml-4">
                                <li>Clear your browser's localStorage to remove all stored preferences</li>
                                <li>Disable JavaScript to prevent automatic currency detection</li>
                                <li>Use the app without providing any personal information</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold mb-3">7. Children's Privacy</h2>
                            <p className="text-text-secondary leading-relaxed">
                                UniCon does not knowingly collect information from children under 13. Our service is available to all ages
                                and does not require any personal information.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold mb-3">8. Changes to This Policy</h2>
                            <p className="text-text-secondary leading-relaxed">
                                We may update this Privacy Policy from time to time. We will notify users of any material changes by
                                updating the "Last updated" date at the top of this policy.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold mb-3">9. Contact Us</h2>
                            <p className="text-text-secondary leading-relaxed">
                                If you have any questions about this Privacy Policy, please contact us through our{' '}
                                <Link to="/contact" className="text-dash-primary hover:underline font-semibold">
                                    Contact page
                                </Link>.
                            </p>
                        </section>
                    </div>
                </div>
            </main>

            <footer className="border-t border-dash-border py-6 mt-12">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <p className="text-text-muted text-sm text-center">
                        © 2024 UniCon. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default PrivacyPolicy;
