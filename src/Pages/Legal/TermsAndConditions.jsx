import React from 'react';
import { Link } from 'react-router';
import { FiArrowLeft, FiShield, FiTruck, FiRefreshCw, FiUser, FiMail, FiLock } from 'react-icons/fi';

const TermsAndConditions = () => {
  const lastUpdated = "February 1, 2026";

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center text-green-600 hover:text-green-700 font-medium mb-4 transition-colors"
          >
            <FiArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Terms & Conditions</h1>
          <p className="text-gray-600">
            Last updated: {lastUpdated}
          </p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 space-y-8">
          {/* Introduction */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
              <FiShield className="mr-3 h-6 w-6 text-green-600" />
              Introduction
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Welcome to ShopHub. These Terms & Conditions govern your use of our e-commerce platform and services. 
              By accessing or using ShopHub, you agree to be bound by these terms. If you disagree with any part 
              of these terms, please do not use our services.
            </p>
          </section>

          {/* User Account */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
              <FiUser className="mr-3 h-6 w-6 text-green-600" />
              User Accounts
            </h2>
            <div className="space-y-3 text-gray-700">
              <p>
                <strong>1. Account Creation:</strong> You must provide accurate and complete information when creating an account.
              </p>
              <p>
                <strong>2. Account Security:</strong> You are responsible for maintaining the confidentiality of your account credentials.
              </p>
              <p>
                <strong>3. Account Responsibility:</strong> You are responsible for all activities under your account.
              </p>
              <p>
                <strong>4. Account Termination:</strong> We reserve the right to suspend or terminate accounts for violations of these terms.
              </p>
            </div>
          </section>

          {/* Products & Services */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
              <FiTruck className="mr-3 h-6 w-6 text-green-600" />
              Products & Services
            </h2>
            <div className="space-y-3 text-gray-700">
              <p>
                <strong>1. Product Information:</strong> We strive to provide accurate product descriptions, pricing, and availability.
              </p>
              <p>
                <strong>2. Pricing:</strong> Prices are subject to change without notice. We reserve the right to correct pricing errors.
              </p>
              <p>
                <strong>3. Product Availability:</strong> Products are subject to availability. We may limit quantities purchased.
              </p>
              <p>
                <strong>4. Order Acceptance:</strong> We reserve the right to refuse or cancel any order for any reason.
              </p>
            </div>
          </section>

          {/* Payment & Billing */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
              <FiLock className="mr-3 h-6 w-6 text-green-600" />
              Payment & Billing
            </h2>
            <div className="space-y-3 text-gray-700">
              <p>
                <strong>1. Payment Methods:</strong> We accept various payment methods as listed on our checkout page.
              </p>
              <p>
                <strong>2. Payment Security:</strong> All payment transactions are encrypted and secure.
              </p>
              <p>
                <strong>3. Billing:</strong> You will be charged at the time of order placement.
              </p>
              <p>
                <strong>4. Fraud Prevention:</strong> We may implement additional verification for suspicious transactions.
              </p>
            </div>
          </section>

          {/* Shipping & Delivery */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
              <FiTruck className="mr-3 h-6 w-6 text-green-600" />
              Shipping & Delivery
            </h2>
            <div className="space-y-3 text-gray-700">
              <p>
                <strong>1. Shipping Times:</strong> Estimated delivery times are provided but not guaranteed.
              </p>
              <p>
                <strong>2. Shipping Costs:</strong> Shipping fees are calculated based on location and order value.
              </p>
              <p>
                <strong>3. Delivery Risk:</strong> Risk of loss passes to you upon delivery of the products.
              </p>
              <p>
                <strong>4. International Shipping:</strong> International orders may be subject to customs duties and taxes.
              </p>
            </div>
          </section>

          {/* Returns & Refunds */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
              <FiRefreshCw className="mr-3 h-6 w-6 text-green-600" />
              Returns & Refunds
            </h2>
            <div className="space-y-3 text-gray-700">
              <p>
                <strong>1. Return Policy:</strong> Products can be returned within 7 days of delivery in original condition.
              </p>
              <p>
                <strong>2. Return Process:</strong> Contact customer service to initiate a return.
              </p>
              <p>
                <strong>3. Refund Process:</strong> Refunds are processed within 5-7 business days after return approval.
              </p>
              <p>
                <strong>4. Non-returnable Items:</strong> Certain items such as perishables and customized products cannot be returned.
              </p>
            </div>
          </section>

          {/* Intellectual Property */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Intellectual Property</h2>
            <div className="space-y-3 text-gray-700">
              <p>
                <strong>1. Content Ownership:</strong> All content on ShopHub, including logos, images, and text, is owned by ShopHub or its licensors.
              </p>
              <p>
                <strong>2. Usage Restrictions:</strong> You may not use our content without prior written permission.
              </p>
              <p>
                <strong>3. Trademarks:</strong> ShopHub and related marks are trademarks of ShopHub.
              </p>
            </div>
          </section>

          {/* Privacy */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
              <FiShield className="mr-3 h-6 w-6 text-green-600" />
              Privacy Policy
            </h2>
            <div className="space-y-3 text-gray-700">
              <p>
                Your privacy is important to us. Our use of your personal information is governed by our 
                <Link to="/privacy" className="text-green-600 hover:text-green-700 font-medium"> Privacy Policy</Link>.
              </p>
              <p>
                By using ShopHub, you consent to the collection and use of information as described in our Privacy Policy.
              </p>
            </div>
          </section>

          {/* Limitation of Liability */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Limitation of Liability</h2>
            <div className="space-y-3 text-gray-700">
              <p>
                ShopHub shall not be liable for any indirect, incidental, special, or consequential damages 
                arising from your use of our services.
              </p>
              <p>
                Our total liability to you for any claims arising from these terms shall not exceed the amount 
                you paid for the products in question.
              </p>
            </div>
          </section>

          {/* Changes to Terms */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Changes to Terms</h2>
            <div className="space-y-3 text-gray-700">
              <p>
                We reserve the right to modify these terms at any time. Changes will be effective immediately 
                upon posting on our website.
              </p>
              <p>
                Your continued use of ShopHub after changes constitutes acceptance of the modified terms.
              </p>
            </div>
          </section>

          {/* Contact Information */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
              <FiMail className="mr-3 h-6 w-6 text-green-600" />
              Contact Information
            </h2>
            <div className="space-y-3 text-gray-700">
              <p>
                If you have any questions about these Terms & Conditions, please contact us:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p><strong>Email:</strong> smsahazbuy@gmail.com</p>
                <p><strong>Phone:</strong> +8801834189086</p>
                <p><strong>Address:</strong> 123 Shopping Street, Commerce City, CC 12345</p>
              </div>
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-gray-600">
          <p>
            By using ShopHub, you acknowledge that you have read, understood, and agree to be bound by these Terms & Conditions.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
