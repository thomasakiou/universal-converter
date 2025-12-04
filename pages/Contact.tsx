import React, { useState } from 'react';
import NavBar from '../components/NavBar';
import { useNavigate, Link } from 'react-router-dom';

const Contact: React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real app, this would send the form data to a backend
        console.log('Form submitted:', formData);
        setSubmitted(true);
        setTimeout(() => {
            setSubmitted(false);
            setFormData({ name: '', email: '', subject: '', message: '' });
        }, 3000);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

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

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Contact Form */}
                    <div className="bg-dash-card rounded-xl border border-dash-border p-6 sm:p-8 shadow-lg">
                        <h1 className="text-text-primary text-3xl sm:text-4xl font-black mb-2">Contact Us</h1>
                        <p className="text-text-secondary text-sm mb-6">
                            Have a question or feedback? We'd love to hear from you.
                        </p>

                        {submitted ? (
                            <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-6 text-center">
                                <span className="material-symbols-outlined text-green-500 text-5xl mb-3">check_circle</span>
                                <h3 className="text-green-600 dark:text-green-400 font-bold text-lg mb-2">Message Sent!</h3>
                                <p className="text-text-secondary">Thank you for contacting us. We'll get back to you soon.</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label htmlFor="name" className="block text-text-primary text-sm font-medium mb-2">
                                        Name *
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-lg border border-dash-border bg-input-bg text-text-primary focus:border-dash-primary focus:outline-none focus:ring-2 focus:ring-dash-primary/50 transition-colors"
                                        placeholder="Your name"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-text-primary text-sm font-medium mb-2">
                                        Email *
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-lg border border-dash-border bg-input-bg text-text-primary focus:border-dash-primary focus:outline-none focus:ring-2 focus:ring-dash-primary/50 transition-colors"
                                        placeholder="your.email@example.com"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="subject" className="block text-text-primary text-sm font-medium mb-2">
                                        Subject *
                                    </label>
                                    <select
                                        id="subject"
                                        name="subject"
                                        required
                                        value={formData.subject}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-lg border border-dash-border bg-input-bg text-text-primary focus:border-dash-primary focus:outline-none focus:ring-2 focus:ring-dash-primary/50 transition-colors"
                                    >
                                        <option value="">Select a subject</option>
                                        <option value="general">General Inquiry</option>
                                        <option value="bug">Report a Bug</option>
                                        <option value="feature">Feature Request</option>
                                        <option value="feedback">Feedback</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-text-primary text-sm font-medium mb-2">
                                        Message *
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        required
                                        value={formData.message}
                                        onChange={handleChange}
                                        rows={6}
                                        className="w-full px-4 py-3 rounded-lg border border-dash-border bg-input-bg text-text-primary focus:border-dash-primary focus:outline-none focus:ring-2 focus:ring-dash-primary/50 transition-colors resize-none"
                                        placeholder="Tell us more..."
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-dash-primary hover:bg-dash-primary/90 text-white font-bold py-3 px-6 rounded-lg transition-colors shadow-lg shadow-green-500/20"
                                >
                                    Send Message
                                </button>
                            </form>
                        )}
                    </div>

                    {/* Contact Information */}
                    <div className="space-y-6">
                        <div className="bg-dash-card rounded-xl border border-dash-border p-6 shadow-lg">
                            <h2 className="text-text-primary text-xl font-bold mb-4 flex items-center gap-2">
                                <span className="material-symbols-outlined text-dash-primary">info</span>
                                About UniCon
                            </h2>
                            <p className="text-text-secondary leading-relaxed">
                                UniCon is a free, open-source universal converter application designed to make currency and unit
                                conversions simple and accessible for everyone.
                            </p>
                        </div>

                        <div className="bg-dash-card rounded-xl border border-dash-border p-6 shadow-lg">
                            <h2 className="text-text-primary text-xl font-bold mb-4 flex items-center gap-2">
                                <span className="material-symbols-outlined text-dash-primary">help</span>
                                Frequently Asked Questions
                            </h2>
                            <div className="space-y-4">
                                <div>
                                    <h3 className="text-text-primary font-semibold mb-1">How accurate are the exchange rates?</h3>
                                    <p className="text-text-secondary text-sm">
                                        We use real-time data from ExchangeRate-API. Rates are updated regularly but may not reflect
                                        exact market conditions.
                                    </p>
                                </div>
                                <div>
                                    <h3 className="text-text-primary font-semibold mb-1">Is UniCon free to use?</h3>
                                    <p className="text-text-secondary text-sm">
                                        Yes! UniCon is completely free with no hidden fees or premium features.
                                    </p>
                                </div>
                                <div>
                                    <h3 className="text-text-primary font-semibold mb-1">Do you store my data?</h3>
                                    <p className="text-text-secondary text-sm">
                                        No. All preferences are stored locally in your browser. We don't collect or store personal data.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-dash-card rounded-xl border border-dash-border p-6 shadow-lg">
                            <h2 className="text-text-primary text-xl font-bold mb-4 flex items-center gap-2">
                                <span className="material-symbols-outlined text-dash-primary">link</span>
                                Quick Links
                            </h2>
                            <div className="space-y-2">
                                <Link to="/privacy-policy" className="block text-dash-primary hover:underline">
                                    Privacy Policy
                                </Link>
                                <Link to="/terms-of-service" className="block text-dash-primary hover:underline">
                                    Terms of Service
                                </Link>
                                <Link to="/dashboard" className="block text-dash-primary hover:underline">
                                    Dashboard
                                </Link>
                            </div>
                        </div>
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

export default Contact;
