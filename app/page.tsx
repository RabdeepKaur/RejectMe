"use client"
import { useState } from 'react';
import { Button } from '@/app/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { ArrowRight, MessageSquare, Mail, Twitter, Linkedin } from 'lucide-react';
import { AIGenerator } from '@/app/components/AIGenerator'
import { TemplateGallery } from '@/app/components/TemplateGallery';
import { RateRejection } from '@/app/components/RateRejection';
import { Navigation } from '@/app/components/Navigator';
import { Footer } from '@/app/components/Footer';
import { HeroSlider } from '@/app/components/HeroSilder';

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');

  const renderSection = () => {
    switch (activeSection) {
      case 'ai':
        return <AIGenerator />;
      case 'templates':
        return <TemplateGallery />;
      case 'about':
        return <RateRejection />;
      default:
        return <HomeSection onNavigate={setActiveSection} />;
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <Navigation activeSection={activeSection} onNavigate={setActiveSection} />
      {renderSection()}
      <Footer />
    </div>
  );
};

const HomeSection = ({ onNavigate }: { onNavigate: (section: string) => void }) => {
  return (
    <>
      {/* Hero Section - Split Layout */}
      <section className="px-4 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Text Content */}
            <div className="text-left">
              <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-6">
                Dont Ghost, Just Reject! 
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl">
                Generate thoughtful rejection emails in one click. Because candidates deserve closure and ghosting is for loser.
              </p>
              <Button 
                size="lg" 
                onClick={() => onNavigate('ai')}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-lg px-8 py-4 rounded-full"
              >
                Start Generating <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>

            {/* Right Side - Slider */}
            <div className="relative">
              <HeroSlider />
            </div>
          </div>
        </div>
      </section>
<AIGenerator/>
      {/* AI Generation Section */}
      <section className="px-4 py-16 bg-gray-900/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-12 text-white">
            AI-Powered Rejection Messages
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="w-8 h-8 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">Smart Generation</h3>
              <p className="text-gray-400">AI creates personalized rejection messages that maintain professionalism while showing empathy.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">Multiple Formats</h3>
              <p className="text-gray-400">Generate messages for email, LinkedIn, or any platform with customizable tone and length.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Twitter className="w-8 h-8 text-green-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">Instant Results</h3>
              <p className="text-gray-400">Get professional rejection messages in seconds with one-click generation.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Rate Templates Section */}
      <section className="px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-white">
            Rate Our Templates
          </h2>
          <RateRejection />
        </div>
      </section>
    </>
  );
};

export default Index;
