import React from 'react';
import { Megaphone } from 'lucide-react';

const AdvertisePage: React.FC = () => {
  return (
    <div className="min-h-screen pt-16" style={{backgroundColor: '#0A0A0F'}}>
      <section className="relative py-24 dark-gradient dark-pattern overflow-hidden">
        <div className="absolute inset-0" style={{backgroundColor: 'rgba(10, 10, 15, 0.5)'}}></div>
        
        <div className="relative container text-center">
          <div className="bg-accent/10 w-20 h-20 rounded-xl flex items-center justify-center mb-6 mx-auto">
            <Megaphone className="h-10 w-10 text-accent" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-100 mb-8">
            <span className="gradient-text">Advertise</span>
            <span className="block text-gray-100">With Us</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-12">
            Promote your properties and services to thousands of potential buyers and renters.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button className="btn-primary">Start Advertising</button>
            <button className="btn-secondary">View Packages</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdvertisePage; 