"use client"
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader } from '@/app/components/ui/card';
import { Mail, Linkedin, Twitter, ChevronLeft, ChevronRight } from 'lucide-react';

const messageTypes = [
  {
    id: 'linkedin',
    icon: Linkedin,
    platform: 'LinkedIn',
    color: 'bg-blue-600',
    content: {
      title: 'Hi Sarah,',
      message: 'Thank you for your interest in the Marketing Manager position at TechCorp. While your background is impressive, we\'ve decided to move forward with another candidate who more closely matches our current needs...',
      actions: ['Reply', 'Forward']
    }
  },
  {
    id: 'email',
    icon: Mail,
    platform: 'Email',
    color: 'bg-red-500',
    content: {
      title: 'Re: Software Engineer Role',
      message: 'Dear John, We appreciate your application for the Software Engineer position. After careful consideration, we have chosen to proceed with a candidate whose experience more closely aligns with our technical requirements...',
      actions: ['Reply', 'Delete']
    }
  },
  {
    id: 'twitter',
    icon: Twitter,
    platform: 'Direct Message',
    color: 'bg-gray-800',
    content: {
      title: '@candidate_mike',
      message: 'Thanks for reaching out about the Design role. While we can\'t move forward this time, we were impressed by your portfolio and would love to keep you in mind for future opportunities...',
      actions: ['Reply', 'Like']
    }
  }
];

export const HeroSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % messageTypes.length);
    }, 4000);

    return () => clearInterval(timer);
  }, []);
/*
  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % messageTypes.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + messageTypes.length) % messageTypes.length);
  };
*/
  const currentMessage = messageTypes[currentIndex];
  const IconComponent = currentMessage.icon;

  return (
    <div className="relative max-w-md mx-auto">
      <Card className="bg-gray-800 border-gray-700 shadow-2xl transform transition-all duration-500">
        <CardHeader className={`${currentMessage.color} text-white`}>
          <div className="flex items-center gap-2">
            <IconComponent className="w-5 h-5" />
            <span className="font-semibold">{currentMessage.platform}</span>
          </div>
        </CardHeader>
        <CardContent className="p-4 bg-gray-800">
          <div className="text-left text-sm">
            <p className="font-medium mb-2 text-white">{currentMessage.content.title}</p>
            <p className="text-gray-300 mb-4 leading-relaxed">{currentMessage.content.message}</p>
            <div className="flex gap-2">
              {currentMessage.content.actions.map((action, idx) => (
                <button 
                  key={idx}
                  className="px-3 py-1 bg-purple-600 hover:bg-purple-700 text-white text-xs rounded transition-colors"
                >
                  {action}
                </button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Navigation Arrows 
      <button
       // onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-gray-700/80 hover:bg-gray-600 rounded-full flex items-center justify-center text-white transition-colors"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
       // onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-gray-700/80 hover:bg-gray-600 rounded-full flex items-center justify-center text-white transition-colors"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
*/}
      {/* Dots Indicator */}
      <div className="flex justify-center gap-2 mt-6">
        {messageTypes.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`w-3 h-3 rounded-full transition-colors ${
              idx === currentIndex ? 'bg-purple-500' : 'bg-gray-600'
            }`}
          />
        ))}
      </div>
    </div>
  );
};
