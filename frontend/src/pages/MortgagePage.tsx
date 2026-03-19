import React from 'react';
import { DollarSign, Calculator, Shield, Clock } from 'lucide-react';

const MortgagePage: React.FC = () => {
  return (
    <div className="min-h-screen pt-16" style={{backgroundColor: '#0A0A0F'}}>
      {/* Hero Section */}
      <section className="relative py-24 dark-gradient dark-pattern overflow-hidden">
        <div className="absolute inset-0" style={{backgroundColor: 'rgba(10, 10, 15, 0.5)'}}></div>
        
        <div className="relative container text-center">
          <div className="bg-accent/10 w-20 h-20 rounded-xl flex items-center justify-center mb-6 mx-auto">
            <DollarSign className="h-10 w-10 text-accent" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-100 mb-8">
            Get a
            <span className="block gradient-text">Mortgage</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-12">
            Find the best mortgage rates and get pre-approved with our trusted lending partners.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button className="btn-primary">
              Get Pre-approved
            </button>
            <button className="btn-secondary">
              Calculate Payments
            </button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-surface">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 gradient-text">
              Mortgage Services
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Everything you need to secure the right mortgage for your dream home.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card p-8 text-center">
              <div className="bg-accent/10 w-16 h-16 rounded-xl flex items-center justify-center mb-6 mx-auto">
                <Calculator className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-2xl font-bold text-gray-100 mb-4">Rate Calculator</h3>
              <p className="text-gray-400">Use our tools to calculate monthly payments and compare different loan options.</p>
            </div>

            <div className="card p-8 text-center">
              <div className="bg-accent/10 w-16 h-16 rounded-xl flex items-center justify-center mb-6 mx-auto">
                <Shield className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-2xl font-bold text-gray-100 mb-4">Trusted Lenders</h3>
              <p className="text-gray-400">Work with our network of verified and trusted mortgage lenders nationwide.</p>
            </div>

            <div className="card p-8 text-center">
              <div className="bg-accent/10 w-16 h-16 rounded-xl flex items-center justify-center mb-6 mx-auto">
                <Clock className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-2xl font-bold text-gray-100 mb-4">Fast Approval</h3>
              <p className="text-gray-400">Get pre-approved quickly with our streamlined application process.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MortgagePage; 