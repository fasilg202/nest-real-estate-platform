import React from 'react';
import { Building2, DollarSign, TrendingUp, Users } from 'lucide-react';

const SellPage: React.FC = () => {
  return (
    <div className="min-h-screen pt-16" style={{backgroundColor: '#0A0A0F'}}>
      {/* Hero Section */}
      <section className="relative py-24 dark-gradient dark-pattern overflow-hidden">
        <div className="absolute inset-0" style={{backgroundColor: 'rgba(10, 10, 15, 0.5)'}}></div>
        
        <div className="relative container text-center">
          <div className="bg-accent/10 w-20 h-20 rounded-xl flex items-center justify-center mb-6 mx-auto">
            <Building2 className="h-10 w-10 text-accent" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-100 mb-8">
            Sell Your
            <span className="block gradient-text">Property</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-12">
            Get the best value for your property with our expert guidance and comprehensive marketing strategies.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button className="btn-primary">
              Get a Free Valuation
            </button>
            <button className="btn-secondary">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-surface">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 gradient-text">
              Why Sell With Nest?
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              We make selling your property simple, profitable, and stress-free.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card p-8 text-center">
              <div className="bg-accent/10 w-16 h-16 rounded-xl flex items-center justify-center mb-6 mx-auto">
                <DollarSign className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-2xl font-bold text-gray-100 mb-4">Maximum Value</h3>
              <p className="text-gray-400">Expert pricing strategies to get you the best possible price for your property.</p>
            </div>

            <div className="card p-8 text-center">
              <div className="bg-accent/10 w-16 h-16 rounded-xl flex items-center justify-center mb-6 mx-auto">
                <TrendingUp className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-2xl font-bold text-gray-100 mb-4">Fast Sales</h3>
              <p className="text-gray-400">Our proven marketing methods help sell properties faster than the market average.</p>
            </div>

            <div className="card p-8 text-center">
              <div className="bg-accent/10 w-16 h-16 rounded-xl flex items-center justify-center mb-6 mx-auto">
                <Users className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-2xl font-bold text-gray-100 mb-4">Expert Support</h3>
              <p className="text-gray-400">Dedicated agents and support team to guide you through every step of the process.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SellPage; 