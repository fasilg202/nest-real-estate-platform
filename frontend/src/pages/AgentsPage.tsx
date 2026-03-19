import React from 'react';
import { Users, MapPin, Star, Award } from 'lucide-react';

const AgentsPage: React.FC = () => {
  return (
    <div className="min-h-screen pt-16" style={{backgroundColor: '#0A0A0F'}}>
      {/* Hero Section */}
      <section className="relative py-24 dark-gradient dark-pattern overflow-hidden">
        <div className="absolute inset-0" style={{backgroundColor: 'rgba(10, 10, 15, 0.5)'}}></div>
        
        <div className="relative container text-center">
          <div className="bg-accent/10 w-20 h-20 rounded-xl flex items-center justify-center mb-6 mx-auto">
            <Users className="h-10 w-10 text-accent" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-100 mb-8">
            Find an
            <span className="block gradient-text">Agent</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-12">
            Connect with experienced real estate professionals in your area who will guide you through every step.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button className="btn-primary">
              Find Local Agents
            </button>
            <button className="btn-secondary">
              Browse All Agents
            </button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-surface">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 gradient-text">
              Why Work With Our Agents?
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Our agents are vetted professionals with proven track records of success.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card p-8 text-center">
              <div className="bg-accent/10 w-16 h-16 rounded-xl flex items-center justify-center mb-6 mx-auto">
                <MapPin className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-2xl font-bold text-gray-100 mb-4">Local Expertise</h3>
              <p className="text-gray-400">Deep knowledge of local markets, neighborhoods, and property values.</p>
            </div>

            <div className="card p-8 text-center">
              <div className="bg-accent/10 w-16 h-16 rounded-xl flex items-center justify-center mb-6 mx-auto">
                <Star className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-2xl font-bold text-gray-100 mb-4">Top Rated</h3>
              <p className="text-gray-400">All agents are rated by previous clients and maintain high satisfaction scores.</p>
            </div>

            <div className="card p-8 text-center">
              <div className="bg-accent/10 w-16 h-16 rounded-xl flex items-center justify-center mb-6 mx-auto">
                <Award className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-2xl font-bold text-gray-100 mb-4">Proven Results</h3>
              <p className="text-gray-400">Track record of successful transactions and satisfied customers.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AgentsPage; 