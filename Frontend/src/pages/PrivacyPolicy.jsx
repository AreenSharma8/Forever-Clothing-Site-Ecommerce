import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="bg-primary/10 min-h-screen py-12 px-4 sm:px-8 lg:px-32">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-secondary mb-6 text-center">Privacy Policy</h1>
        <p className="text-gray-700 mb-4">
          At Kana by Kavya, your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your personal information when you use our website and services.
        </p>
        <h2 className="text-xl font-semibold mb-2 mt-6" style={{ color: '#B22222' }}>Information We Collect</h2>
        <ul className="list-disc list-inside text-gray-700 mb-4">
          <li>Personal details such as name, email address, and contact information.</li>
          <li>Order and payment information.</li>
          <li>Browsing and usage data.</li>
        </ul>
        <h2 className="text-xl font-semibold mb-2 mt-6" style={{ color: '#B22222' }}>How We Use Your Information</h2>
        <ul className="list-disc list-inside text-gray-700 mb-4">
          <li>To process orders and provide customer support.</li>
          <li>To improve our products and services.</li>
          <li>To send updates, offers, and newsletters (you may opt out at any time).</li>
        </ul>
        <h2 className="text-xl font-semibold mb-2 mt-6" style={{ color: '#B22222' }}>Data Protection</h2>
        <p className="text-gray-700 mb-4">
          We implement security measures to protect your data and do not share your information with third parties except as required for order fulfillment or by law.
        </p>
        <h2 className="text-xl font-semibold mb-2 mt-6" style={{ color: '#B22222' }}>Your Rights</h2>
        <p className="text-gray-700 mb-4">
          You have the right to access, update, or delete your personal information. For any requests, please contact us at <span className="text-secondary">contact@kanabykavya.com</span>.
        </p>
        <p className="text-gray-500 text-sm mt-8 text-center">
          Last updated: July 15, 2025
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
