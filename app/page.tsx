"use client"
import { useState} from 'react';
import { Button } from '@/app/components/ui/button';
//import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { ArrowRight, MailX, HandHeart, UserRoundCheck } from 'lucide-react';
import { AIGenerator } from '@/app/components/AIGenerator'
import { TemplateGallery } from '@/app/components/TemplateGallery';
//import { RateRejection } from '@/app/components/RateRejection';
import { Navigation } from '@/app/components/Navigator';
import { Footer } from '@/app/components/Footer';
import { EmailIllustration } from './components/ui/Herosection';
import {motion} from 'framer-motion';

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');

  const renderSection = () => {
    switch (activeSection) {
      case 'ai':
        return <AIGenerator />;
      case 'templates':
        return <TemplateGallery />;
      //case 'about':
       // return <RateRejection />;
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
      <section className="px-4 py-5">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Text Content */}
            <div className="text-left">
              <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}

               className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-8 py-4">
                Don't Ghost, Just Reject! 
              </motion.h1>
              <motion.p   initial ={{opacity:0,y:-30}} transition={{duration:0.5,delay:0.3 }} animate={{ opacity:1, y:1 }} className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl">
                Generate thoughtful rejection emails in one click. Because candidates deserve closure and ghosting is for loser.
              </motion.p>
              < Button 
                size="lg" 
                onClick={() => onNavigate('ai')}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-lg px-8 py-4 rounded-full"
              >
                Start Generating <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>

            {/* Right Side - Slider */}
            <motion.div    initial ={{opacity:0,y:-30}} transition={{duration:0.5,delay:0.4 }} animate={{ opacity:1, y:1 }}
         className="relative mt-1">
              <EmailIllustration/>
            </motion.div>
          </div>
        </div>
      </section>

      {/* AI Generation Section */}
      <section className="px-4 py-16 bg-gray-900/50">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}    
 className="text-3xl font-bold mb-12 text-white">
            REJECTION IS BETTER THAN GHOSTING
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-15">
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                < MailX className="w-8 h-8 text-purple-400" />
              </div>
              <h3
   className="text-xl font-semibold mb-2 text-white">Got a lot of work to do, and no time?</h3>
              <p className="text-gray-400">    Don’t worry — we know life gets hectic. Just fill in a few fields with AI, use a prompt, or upload a CSV. We've got every option covered to help you review and reject candidates with ease.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <HandHeart className="w-8 h-8 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">You really care about the candidate. </h3>
              <p className="text-gray-400">    Don’t fake it with bad AI. If you genuinely care about your candidates, use our top-voted templates to craft meaningful messages and build lasting relationships.
  </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <UserRoundCheck className="w-8 h-8 text-green-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">Rejection creates connection</h3>
              <p className="text-gray-400">  Ghosting leaves a bad impression. Candidates might think you don’t care.You never know if your next hire might be the one who applied today. Keep your reputation strong and your connections real.</p>
            </div>
          </div>
        </div>
      </section>
      <AIGenerator/>
<TemplateGallery/>

      {/* Rate Templates Section 
      <section className="px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-white">
            Rate Our Templates
          </h2>
          *<RateRejection />
        </div>
      </section>*/}
    </>
  );
};

export default Index;
