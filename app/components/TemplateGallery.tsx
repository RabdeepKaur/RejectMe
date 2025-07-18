"use client"
import { useState } from 'react';
import { Button } from '@/app/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/app/components/ui/dialog';
import { ThumbsUp, ThumbsDown, Eye, Copy, Star } from 'lucide-react';
import { toast } from "sonner"

export const TemplateGallery = () => {
  const [templates, setTemplates] = useState([
    {
      id: 1,
      title: "The Encouraging Professional",
      category: "Professional",
      upvotes: 234,
      downvotes: 12,
      rating: 4.8,
      preview: "Dear [Name], Thank you for your interest in the [Position] role at [Company]. While we've decided to move forward with another candidate...",
      fullText: `Dear [Candidate Name],

Thank you for your interest in the [Position] role at [Company Name]. We were impressed by your qualifications and the enthusiasm you demonstrated throughout our interview process.

After careful consideration, we have decided to move forward with another candidate whose experience more closely aligns with our current needs. This was not an easy decision, as we were genuinely impressed by your professional accomplishments.

We encourage you to apply for future opportunities with us that match your skill set. We will keep your information on file for six months and would be happy to reach out if a suitable position becomes available.

Thank you again for your time and interest in [Company Name]. We wish you the best of luck in your job search.

Best regards,
[Your Name]
Hiring Manager`
    },
    {
      id: 2,
      title: "The Warm & Personal",
      category: "Warm",
      upvotes: 189,
      downvotes: 8,
      rating: 4.7,
      preview: "Hi [Name]! I hope you're doing well. I wanted to personally reach out about your application for our [Position] role...",
      fullText: `Hi [Candidate Name]!

I hope you're doing well. I wanted to personally reach out about your application for our [Position] role at [Company Name].

First, I want to say thank you for taking the time to learn about our company and sharing your story with us. It was genuinely enjoyable getting to know you during our conversations.

While we've decided to move in a different direction for this particular role, I want you to know that this decision doesn't reflect on your abilities or potential. Sometimes it's simply a matter of finding the right fit at the right time.

Your background in [relevant field] is impressive, and I'm confident you'll find a great opportunity soon. Please don't hesitate to reach out if you'd like any feedback on your interview or if you see other roles at [Company Name] that interest you.

Wishing you all the best in your job search!

Warm regards,
[Your Name]`
    },
    {
      id: 3,
      title: "The Creative & Unique",
      category: "Creative",
      upvotes: 156,
      downvotes: 23,
      rating: 4.2,
      preview: "Every great story has plot twists, and your career story is no different. While our paths aren't aligning for the [Position] role...",
      fullText: `Dear [Candidate Name],

Every great story has plot twists, and your career story is no different. While our paths aren't aligning for the [Position] role at [Company Name], I believe this is just one chapter in what will be an amazing professional journey.

Your creativity and fresh perspective really stood out to us during the interview process. The way you approached [specific example] showed real innovation and problem-solving skills that will serve you well.

Sometimes the best opportunities come from unexpected directions. While we're heading down different paths for now, I have a feeling your unique talents will find their perfect match soon.

Keep being boldly yourself in your job search – the right company will recognize and value what you bring to the table.

Here's to your next adventure!

Creatively yours,
[Your Name]
[Company Name] Team`
    },
    {
      id: 4,
      title: "The Constructive Growth",
      category: "Encouraging",
      upvotes: 201,
      downvotes: 15,
      rating: 4.6,
      preview: "Thank you for your application to [Company]. Your passion for [field] was evident, and we appreciated learning about your experience...",
      fullText: `Dear [Candidate Name],

Thank you for your application to [Company Name] for the [Position] role. Your passion for [relevant field] was evident, and we appreciated learning about your experience in [specific area].

After careful evaluation, we've decided to proceed with a candidate who has more extensive experience in [specific requirement]. However, I wanted to share some thoughts that might be helpful for your continued job search:

• Your enthusiasm for [specific area] really came through
• Consider gaining more experience in [skill area] to strengthen future applications
• Your approach to [specific example] showed great potential

We believe you have strong foundations to build upon, and with continued growth in [area], you'll be an excellent candidate for similar roles in the future.

Thank you for considering [Company Name] as a potential next step in your career. We wish you success in your professional development.

Best of luck,
[Your Name]
Hiring Team`
    },
    {
      id: 5,
      title: "The Brief & Respectful",
      category: "Professional",
      upvotes: 178,
      downvotes: 9,
      rating: 4.5,
      preview: "Thank you for your application for the [Position] role. After careful consideration, we have decided to proceed with other candidates...",
      fullText: `Dear [Candidate Name],

Thank you for your application for the [Position] role at [Company Name].

After careful consideration, we have decided to proceed with other candidates whose experience more closely matches our current requirements.

We appreciate the time you invested in our application process and wish you success in your job search.

Best regards,
[Your Name]
Hiring Manager
[Company Name]`
    },
    {
      id: 6,
      title: "The Future-Focused",
      category: "Encouraging",
      upvotes: 167,
      downvotes: 11,
      rating: 4.4,
      preview: "While we won't be working together on the [Position] role at [Company], I'm excited about the possibilities ahead for you...",
      fullText: `Dear [Candidate Name],

While we won't be working together on the [Position] role at [Company Name], I'm excited about the possibilities ahead for you.

Your background in [relevant area] and your vision for [specific topic discussed] left a lasting impression on our team. Though our current needs led us in a different direction, I believe your skills and perspective will be valuable assets to the right organization.

The job market is constantly evolving, and professionals with your combination of [skill 1] and [skill 2] are increasingly in demand. I encourage you to continue exploring opportunities in [relevant industry/field].

If you're open to it, I'd be happy to connect you with colleagues in my network who might have relevant opportunities. Feel free to reach out if that would be helpful.

Thank you for considering [Company Name], and I look forward to hearing about your next exciting opportunity.

Best wishes for your future,
[Your Name]`
    },
    {
      id: 7,
      title: "The Empathetic Touch",
      category: "Warm",
      upvotes: 192,
      downvotes: 7,
      rating: 4.9,
      preview: "I know how much effort goes into each job application, and I want to personally acknowledge the time and energy you invested...",
      fullText: `Dear [Candidate Name],

I know how much effort goes into each job application, and I want to personally acknowledge the time and energy you invested in pursuing the [Position] role with [Company Name].

Job searching can be an emotional journey, filled with hope and anticipation. I recognize that behind every application is a person with goals, dreams, and responsibilities, and I don't take lightly the trust you placed in us by sharing your story.

While we've decided to move forward with another candidate for this specific role, I want you to know that this decision reflects our particular needs at this moment, not your value as a professional.

Your experience in [relevant area] and your thoughtful approach to [specific topic] resonated with our team. I'm confident that your dedication and skills will lead you to the right opportunity.

Please take care of yourself during this process, and remember that each "no" brings you closer to the right "yes."

With genuine appreciation,
[Your Name]`
    },
    {
      id: 8,
      title: "The Startup Casual",
      category: "Creative",
      upvotes: 134,
      downvotes: 18,
      rating: 4.1,
      preview: "Hey [Name]! Thanks for being awesome and applying to join our team. While we're not moving forward together this time...",
      fullText: `Hey [Candidate Name]! 👋

Thanks for being awesome and applying to join our team at [Company Name] for the [Position] role!

We really enjoyed getting to know you and hearing about your journey. Your experience with [relevant skill] was super impressive, and we loved your ideas about [specific topic].

While we're not moving forward together this time (we went with someone who had a bit more experience in [specific area]), we think you're going to do amazing things!

The startup world is small, and who knows? Maybe our paths will cross again in the future. Keep crushing it out there! 🚀

If you ever want to grab coffee and chat about [industry/field], don't hesitate to reach out.

Cheers,
[Your Name] & The [Company Name] Team

P.S. We'll definitely keep you in mind for future roles that might be a better fit!`
    }
  ]);

  const [userVotes, setUserVotes] = useState<Record<number, 'up' | 'down' | null>>({});

  const handleVote = (templateId: number, voteType: 'up' | 'down') => {
    const currentVote = userVotes[templateId];
    
    setTemplates(prev => prev.map(template => {
      if (template.id === templateId) {
        let newUpvotes = template.upvotes;
        let newDownvotes = template.downvotes;
        
        // Remove previous vote if exists
        if (currentVote === 'up') newUpvotes--;
        if (currentVote === 'down') newDownvotes--;
        
        // Add new vote if different from current
        if (currentVote !== voteType) {
          if (voteType === 'up') newUpvotes++;
          if (voteType === 'down') newDownvotes++;
        }
        
        return {
          ...template,
          upvotes: newUpvotes,
          downvotes: newDownvotes,
          rating: Number(((newUpvotes / (newUpvotes + newDownvotes)) * 5).toFixed(1))
        };
      }
      return template;
    }));
    
    setUserVotes(prev => ({
      ...prev,
      [templateId]: currentVote === voteType ? null : voteType
    }));
    
    /*toast(
      title: `Vote ${currentVote === voteType ? 'removed' : 'recorded'}!`,
      description: currentVote === voteType ? 'Your vote has been removed.' : `You ${voteType === 'up' ? 'liked' : 'disliked'} this template.`,
});*/
  };

  const copyTemplate = (template: any) => {
    navigator.clipboard.writeText(template.fullText);
    toast("The template has been copied to your clipboard.",
    );
  };

  const categoryColors = {
    Professional: 'bg-blue-100 text-blue-800',
    Warm: 'bg-green-100 text-green-800',
    Creative: 'bg-purple-100 text-purple-800',
    Encouraging: 'bg-orange-100 text-orange-800'
  };

  return (
    <section className="px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Template Gallery
          </h1>
          <p className="text-lg text-gray-600">
            Dont like the AI generated email? No problem ! here are the Rejction template let the candidate know you care about there opinion.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {templates.map((template) => (
            <Card key={template.id} className="hover:shadow-lg transition-all duration-300 hover:scale-105">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between mb-2">
                  <Badge className={categoryColors[template.category as keyof typeof categoryColors]}>
                    {template.category}
                  </Badge>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-medium">{template.rating}</span>
                  </div>
                </div>
                <CardTitle className="text-lg leading-tight">{template.title}</CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-sm text-gray-600 line-clamp-3">
                  {template.preview}
                </p>
                
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Button
                        size="sm"
                        variant={userVotes[template.id] === 'up' ? 'default' : 'outline'}
                        onClick={() => handleVote(template.id, 'up')}
                        className="h-8 px-2"
                      >
                        <ThumbsUp className="w-3 h-3 mr-1" />
                        {template.upvotes}
                      </Button>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button
                        size="sm"
                        variant={userVotes[template.id] === 'down' ? 'destructive' : 'outline'}
                        onClick={() => handleVote(template.id, 'down')}
                        className="h-8 px-2"
                      >
                        <ThumbsDown className="w-3 h-3 mr-1" />
                        {template.downvotes}
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button size="sm" variant="outline" className="flex-1">
                        <Eye className="w-3 h-3 mr-1" />
                        Preview
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle className="flex items-center justify-between">
                          <span>{template.title}</span>
                          <Badge className={categoryColors[template.category as keyof typeof categoryColors]}>
                            {template.category}
                          </Badge>
                        </DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="bg-gray-50 rounded-lg p-4">
                          <pre className="whitespace-pre-wrap text-sm leading-relaxed text-gray-800 font-sans">
                            {template.fullText}
                          </pre>
                        </div>
                        <div className="flex gap-2">
                          <Button onClick={() => copyTemplate(template)} className="flex-1">
                            <Copy className="w-4 h-4 mr-2" />
                            Copy Template
                          </Button>
                          <div className="flex gap-1">
                            <Button
                              size="sm"
                              variant={userVotes[template.id] === 'up' ? 'default' : 'outline'}
                              onClick={() => handleVote(template.id, 'up')}
                            >
                              <ThumbsUp className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant={userVotes[template.id] === 'down' ? 'destructive' : 'outline'}
                              onClick={() => handleVote(template.id, 'down')}
                            >
                              <ThumbsDown className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                  
                  <Button 
                    size="sm" 
                    onClick={() => copyTemplate(template)}
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                  >
                    <Copy className="w-3 h-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
