"use client"
import { useState } from 'react';
import { Button } from '@/app/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/app/components/ui/dialog';
import { Star, Trophy, Award, Medal, Crown, Eye } from 'lucide-react';
import { toast } from "sonner"

export const RateRejection = () => {
  const [hallOfFame, setHallOfFame] = useState([
    {
      id: 1,
      title: "The Empathy Master",
      company: "Google",
      rating: 4.9,
      votes: 1247,
      category: "Most Empathetic",
      icon: <Crown className="w-6 h-6 text-yellow-500" />,
      preview: "Thank you for sharing your story with us. While we're moving in a different direction...",
      fullText: `Dear Candidate,

Thank you for sharing your story with us and for the time you invested in exploring opportunities at Google. We were genuinely impressed by your passion and the thoughtful questions you asked about our mission.

While we're moving in a different direction for this role, I want you to know that this decision reflects our specific needs right now, not your capabilities or potential. Your background in AI ethics and your perspective on responsible technology development really resonated with our team.

I encourage you to stay connected with us and continue applying for roles that align with your interests. The tech industry needs more voices like yours.

Wishing you the very best in your journey.

Warm regards,
Sarah Chen
Senior Engineering Manager`
    },
    {
      id: 2,
      title: "The Growth Catalyst",
      company: "Stripe",
      rating: 4.8,
      votes: 1098,
      category: "Most Constructive",
      icon: <Trophy className="w-6 h-6 text-blue-500" />,
      preview: "Your technical skills impressed us, and we'd like to share some specific feedback...",
      fullText: `Hi [Name],

Your technical skills impressed us, and we'd like to share some specific feedback that might help in your continued job search.

Your approach to system design showed great foundational thinking, and your solution to the API rate limiting challenge was creative. To strengthen future applications for similar roles, consider:

• Deepening your experience with distributed systems at scale
• Building projects that demonstrate real-world performance optimization
• Exploring the financial technology space more broadly

We believe these areas of growth will serve you well. Your curiosity and problem-solving approach are exactly what the industry needs.

Keep building amazing things!

Best,
The Stripe Engineering Team`
    },
    {
      id: 3,
      title: "The Future Connector",
      company: "Airbnb",
      rating: 4.8,
      votes: 956,
      category: "Most Supportive",
      icon: <Award className="w-6 h-6 text-green-500" />,
      preview: "While this role isn't the right fit, I'd love to connect you with opportunities...",
      fullText: `Dear [Name],

While this role isn't the right fit, I'd love to connect you with opportunities that better match your background in user experience design.

Your portfolio showcased a strong understanding of design thinking and user empathy. The accessibility features you built into your projects particularly stood out to our team.

I have contacts at several companies looking for UX talent with your specific skills. Would you be open to me making some introductions?

Sometimes the best opportunities come through unexpected connections.

Looking forward to helping you find your next adventure,

Maria Rodriguez
Head of Design`
    },
    {
      id: 4,
      title: "The Honest Communicator",
      company: "Netflix",
      rating: 4.7,
      votes: 834,
      category: "Most Transparent",
      icon: <Medal className="w-6 h-6 text-red-500" />,
      preview: "I want to be transparent about our decision process and share specific reasons...",
      fullText: `Hello [Name],

I want to be transparent about our decision process and share specific reasons why we chose to move forward with another candidate.

We were looking for someone with more experience in content recommendation algorithms, specifically in the streaming media space. Your background in e-commerce recommendations is strong, but we needed someone who could hit the ground running with our specific tech stack.

This doesn't diminish your skills – it's simply about finding the right match for our immediate needs. Your technical foundation is solid, and with some streaming industry experience, you'd be a great fit for similar roles.

I respect your time and wanted to provide the clarity you deserve.

Best of luck,
David Kim
Engineering Director`
    },
    {
      id: 5,
      title: "The Encouragement Champion",
      company: "Slack",
      rating: 4.7,
      votes: 792,
      category: "Most Encouraging",
      icon: <Star className="w-6 h-6 text-purple-500" />,
      preview: "Your enthusiasm for building tools that help teams communicate better was infectious...",
      fullText: `Hi [Name]! 

Your enthusiasm for building tools that help teams communicate better was infectious, and it reminded all of us why we love what we do at Slack.

While we decided to go with someone else for this particular role, I want you to know that your passion for the mission really stood out. Your ideas about improving remote collaboration tools were thought-provoking and showed real insight into the challenges teams face today.

Keep that energy and keep building solutions that help people work better together. The world needs more people who think like you do.

I'm genuinely excited to see what you build next!

Cheers,
Alex Thompson
Product Manager`
    },
    {
      id: 6,
      title: "The Personal Touch",
      company: "Zoom",
      rating: 4.6,
      votes: 723,
      category: "Most Personal",
      icon: <Crown className="w-6 h-6 text-indigo-500" />,
      preview: "I really enjoyed our conversation about the future of remote work...",
      fullText: `Dear [Name],

I really enjoyed our conversation about the future of remote work and how technology can help bridge the human connection gap in distributed teams.

Your insights about the psychological aspects of video communication were fascinating, and I can tell you've thought deeply about these challenges. While we're moving forward with another candidate for this specific role, I wanted to personally reach out because our conversation left such an impression on me.

Have you considered roles that combine technology with behavioral psychology? I think that intersection might be a perfect fit for your unique perspective.

Thank you for a genuinely engaging conversation. I hope our paths cross again in this industry.

Warmly,
Jennifer Liu
VP of Product`
    }
  ]);

  const [userRatings, setUserRatings] = useState<Record<number, number>>({});

  const handleRating = (templateId: number, rating: number) => {
    setUserRatings(prev => ({
      ...prev,
      [templateId]: rating
    }));
    
    toast(
       `You rated this rejection ${rating} star${rating !== 1 ? 's' : ''}.`
    );
  };

  const StarRating = ({ rating, onRate, readonly = false }: { rating: number, onRate?: (rating: number) => void, readonly?: boolean }) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 cursor-pointer transition-colors ${
              star <= rating 
                ? 'text-yellow-500 fill-current' 
                : 'text-gray-300 hover:text-yellow-400'
            } ${readonly ? 'cursor-default' : ''}`}
            onClick={() => !readonly && onRate && onRate(star)}
          />
        ))}
      </div>
    );
  };

  return (
    <section className="px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Rejection Hall of Fame 🏆
          </h1>
          <p className="text-lg text-gray-600">
            Got the most unique rejection email ? Share with us ! celebrate the rejections that stood out for their empathy, support, and constructive feedback.
          </p>
        </div>

        {/* Top 3 Podium */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {hallOfFame.slice(0, 3).map((template, index) => (
            <Card key={template.id} className={`relative overflow-hidden ${
              index === 0 ? 'md:order-2 border-yellow-200 bg-gradient-to-br from-yellow-50 to-orange-50' :
              index === 1 ? 'md:order-1 border-gray-200 bg-gradient-to-br from-gray-50 to-slate-50' :
              'md:order-3 border-orange-200 bg-gradient-to-br from-orange-50 to-red-50'
            }`}>
              {/* Podium Position */}
              <div className={`absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                index === 0 ? 'bg-yellow-500' :
                index === 1 ? 'bg-gray-400' :
                'bg-orange-500'
              }`}>
                {index + 1}
              </div>

              <CardHeader className="pb-3">
                <div className="flex items-center gap-2 mb-2">
                  {template.icon}
                  <Badge variant="outline" className="text-xs">
                    {template.category}
                  </Badge>
                </div>
                <CardTitle className="text-lg">{template.title}</CardTitle>
                <p className="text-sm text-gray-600 font-medium">{template.company}</p>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <StarRating rating={template.rating} readonly />
                  <span className="text-sm text-gray-600">{template.votes} votes</span>
                </div>
                
                <p className="text-sm text-gray-600 line-clamp-2">
                  {template.preview}
                </p>
                
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full">
                      <Eye className="w-4 h-4 mr-2" />
                      Read Full Message
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {template.icon}
                          <span>{template.title}</span>
                        </div>
                        <Badge variant="outline">{template.category}</Badge>
                      </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{template.company}</span>
                          <StarRating rating={template.rating} readonly />
                        </div>
                        <span className="text-sm text-gray-600">{template.votes} votes</span>
                      </div>
                      
                      <div className="bg-white border rounded-lg p-4">
                        <pre className="whitespace-pre-wrap text-sm leading-relaxed text-gray-800 font-sans">
                          {template.fullText}
                        </pre>
                      </div>
                      
                      <div className="space-y-2">
                        <p className="text-sm font-medium">Rate this rejection:</p>
                        <StarRating 
                          rating={userRatings[template.id] || 0} 
                          onRate={(rating) => handleRating(template.id, rating)}
                        />
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Rest of the Hall of Fame */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hallOfFame.slice(3).map((template) => (
            <Card key={template.id} className="hover:shadow-lg transition-all duration-300">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2 mb-2">
                  {template.icon}
                  <Badge variant="outline" className="text-xs">
                    {template.category}
                  </Badge>
                </div>
                <CardTitle className="text-lg">{template.title}</CardTitle>
                <p className="text-sm text-gray-600 font-medium">{template.company}</p>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <StarRating rating={template.rating} readonly />
                  <span className="text-sm text-gray-600">{template.votes} votes</span>
                </div>
                
                <p className="text-sm text-gray-600 line-clamp-2">
                  {template.preview}
                </p>
                
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full">
                      <Eye className="w-4 h-4 mr-2" />
                      Read & Rate
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {template.icon}
                          <span>{template.title}</span>
                        </div>
                        <Badge variant="outline">{template.category}</Badge>
                      </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{template.company}</span>
                          <StarRating rating={template.rating} readonly />
                        </div>
                        <span className="text-sm text-gray-600">{template.votes} votes</span>
                      </div>
                      
                      <div className="bg-white border rounded-lg p-4">
                        <pre className="whitespace-pre-wrap text-sm leading-relaxed text-gray-800 font-sans">
                          {template.fullText}
                        </pre>
                      </div>
                      
                      <div className="space-y-2">
                        <p className="text-sm font-medium">Rate this rejection:</p>
                        <StarRating 
                          rating={userRatings[template.id] || 0} 
                          onRate={(rating) => handleRating(template.id, rating)}
                        />
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
