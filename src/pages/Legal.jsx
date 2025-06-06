import React, { useEffect } from 'react';
import Navbar from '../sections/Navbar';
import Footer from '../sections/Footer';
import { useLocation } from 'react-router-dom';

const Legal = () => {
    const location = useLocation();

    useEffect(() => {
        // Check if there's a hash in the URL
        if (location.hash) {
            // Get the element with the ID matching the hash
            const element = document.querySelector(location.hash);
            if (element) {
                // Wait a bit for the page to render
                setTimeout(() => {
                    element.scrollIntoView({ behavior: 'smooth' });
                }, 100);
            }
        }
    }, [location]);

    return (
        <main className="max-w-8xl mx-auto">
            <Navbar />
            <div className="pt-24 px-8 max-w-4xl mx-auto">
                <section className="mb-16" id="terms">
                    <h2 className="text-2xl font-bold text-white pt-16 mb-4">Terms & Conditions</h2>
                    <p className="text-gray-300">
                        Last updated: {new Date().toLocaleDateString()}
                        <br /><br />
                        Welcome to Alex Dowsett's Portfolio Website! By accessing this website, you agree to the following terms:
                        <br /><br />
                        • The content on this website is for informational purposes only.
                        <br /><br />
                        • You may not copy, distribute, or use any content (including code samples, images, and text) without permission.
                        <br /><br />
                        • I am not responsible for any issues resulting from the use of information or code provided on this site.
                        <br /><br />
                        • I reserve the right to update these terms at any time. Continued use of the site constitutes acceptance of the new terms.
                        <br /><br />
                        If you have any questions, contact legal@dowsett.dev
                    </p>
                </section>

                <section className="mb-16" id="privacy">
                    <h2 className="text-2xl font-bold text-white pt-16 mb-4">Privacy Policy</h2>
                    <p className="text-gray-300">
                        Last updated: {new Date().toLocaleDateString()}
                        <br /><br />
                        Your privacy is important to me. This policy outlines how I handle any data collected:
                        <br /><br />
                        • Information Collected: I may collect your name, email, or message if you contact me through the website.
                        <br /><br />
                        • How It's Used: This information is solely for communication purposes and will not be sold or shared.
                        <br /><br />
                        • Cookies & Analytics: This website may use cookies or analytics tools to understand visitor behavior.
                        <br /><br />
                        • Your Rights: You can request to see or delete any personal data I may have about you.
                        <br /><br />
                        For privacy concerns, contact legal@dowsett.dev
                    </p>
                </section>

                <section className="mb-16" id="copyright">
                    <h2 className="text-2xl font-bold text-white pt-16 mb-4">Copyright Notice</h2>
                    <p className="text-gray-300">
                        © 2025 Alex Dowsett. All Rights Reserved.
                        <br /><br />
                        All content on this website, including text, images, and code, is the intellectual property of Alex Dowsett. 
                        Unauthorized use, reproduction, or distribution of this content is prohibited.
                    </p>
                </section>
            </div>
            <Footer />
            <div className="pb-5"></div>
        </main>
    );
};

export default Legal; 