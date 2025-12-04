import React from 'react';
import NavBar from '../components/NavBar';
import { useNavigate, Link } from 'react-router-dom';

const TermsOfService: React.FC = () => {
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
                    <h1 className="text-text-primary text-3xl sm:text-4xl font-black mb-2">Terms of Service</h1>
                    <p className="text-text-secondary text-sm mb-8">Last updated: December 4, 2024</p>

                    <div className="space-y-6 text-text-primary">
                        <section>
                            <h2 className="text-xl font-bold mb-3">1. Acceptance of Terms</h2>
                            <p className="text-text-secondary leading-relaxed">
                                By accessing and using UniCon, you accept and agree to be bound by the terms and provisions of this agreement.
                                If you do not agree to these terms, please do not use our service.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold mb-3">2. Description of Service</h2>
                            <p className="text-text-secondary leading-relaxed mb-3">
                                UniCon provides a free online currency and unit conversion tool. Our service includes:
                            </p>
                            <ul className="list-disc list-inside text-text-secondary space-y-2 ml-4">
                                <li>Real-time currency exchange rates</li>
                                <li>Multiple unit converters (distance, weight, temperature, etc.)</li>
                                <li>Automatic currency detection based on location</li>
                                <li>Customizable settings and preferences</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold mb-3">3. Use of Service</h2>
                            <p className="text-text-secondary leading-relaxed mb-3">
                                You agree to use UniCon only for lawful purposes. You agree not to:
                            </p>
                            <ul className="list-disc list-inside text-text-secondary space-y-2 ml-4">
                                <li>Use the service for any illegal or unauthorized purpose</li>
                                <li>Attempt to gain unauthorized access to our systems</li>
                                <li>Interfere with or disrupt the service or servers</li>
                                <li>Use automated systems to access the service excessively</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold mb-3">4. Accuracy of Information</h2>
                            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4 mb-3">
                                <p className="text-yellow-700 dark:text-yellow-400 font-semibold mb-2">Important Disclaimer</p>
                                <p className="text-text-secondary leading-relaxed">
                                    While we strive to provide accurate and up-to-date exchange rates and conversion factors,
                                    UniCon does not guarantee the accuracy, completeness, or reliability of any information provided.
                                </p>
                            </div>
                            <p className="text-text-secondary leading-relaxed">
                                Exchange rates are provided by third-party APIs and may not reflect real-time market conditions.
                                Always verify rates with official sources before making financial decisions.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold mb-3">5. No Financial Advice</h2>
                            <p className="text-text-secondary leading-relaxed">
                                UniCon is a tool for informational purposes only. We do not provide financial, investment, or trading advice.
                                The buy/sell rates displayed are estimates and include a spread for illustration purposes only.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold mb-3">6. Limitation of Liability</h2>
                            <p className="text-text-secondary leading-relaxed">
                                UniCon and its operators shall not be liable for any direct, indirect, incidental, special, consequential,
                                or punitive damages resulting from your use or inability to use the service, including but not limited to
                                financial losses based on conversion rates provided.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold mb-3">7. Third-Party Services</h2>
                            <p className="text-text-secondary leading-relaxed">
                                Our service relies on third-party APIs for exchange rates and geolocation. We are not responsible for
                                the availability, accuracy, or reliability of these third-party services.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold mb-3">8. Intellectual Property</h2>
                            <p className="text-text-secondary leading-relaxed">
                                The UniCon service, including its design, code, and content, is protected by copyright and other
                                intellectual property laws. You may not copy, modify, or distribute any part of the service without permission.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold mb-3">9. Service Availability</h2>
                            <p className="text-text-secondary leading-relaxed">
                                We strive to maintain service availability but do not guarantee uninterrupted access. We reserve the right
                                to modify, suspend, or discontinue the service at any time without notice.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold mb-3">10. Changes to Terms</h2>
                            <p className="text-text-secondary leading-relaxed">
                                We reserve the right to modify these terms at any time. Continued use of the service after changes
                                constitutes acceptance of the modified terms.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold mb-3">11. Governing Law</h2>
                            <p className="text-text-secondary leading-relaxed">
                                These terms shall be governed by and construed in accordance with applicable laws, without regard to
                                conflict of law provisions.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold mb-3">12. Contact Information</h2>
                            <p className="text-text-secondary leading-relaxed">
                                For questions about these Terms of Service, please visit our{' '}
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

export default TermsOfService;
