"use client"
import { useState, useEffect } from 'react';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
//import { Label } from '@/app/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { Badge } from '@/app/components/ui/badge';
import { Copy, Mail, Sparkles, RefreshCw, Pencil, Terminal, FileText} from 'lucide-react';
import { toast } from "sonner"
import Filecsv from './ui/Filecsv';
import { PromptCommand } from './ui/useprompt';


export const AIGenerator = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    candidateName: '',
    candidateEmail: '',
    position: '',
    reason: '',
    subject: '',
    emailBody: '',
    tone: 'professional',
    length: 'standard'
  });

// upload csv logic 
const [candidates, setCandidates] = useState<{ name: string; email: string }[]>([]);
 const [selectedCandidateIndex, setSelectedCandidateIndex] = useState<number>(0);
 const [isPromptMode, setIsPromptMode] = useState(false);
 

const handleCSVData = (parsedCandidates: { name: string; email: string }[]) => {
  console.log("Received candidates:", parsedCandidates);
  setCandidates(parsedCandidates);
  
  if (parsedCandidates.length > 0) {
    // Join all names with comma or newline
    const allNames = parsedCandidates
      .map(candidate => candidate.name)
      .filter(name => name.trim() !== '') // Remove empty names
      .join(', '); // You can change to '\n' for new lines
    
    // Join all emails with comma or newline
    const allEmails = parsedCandidates
      .map(candidate => candidate.email)
      .filter(email => email.trim() !== '') // Remove empty emails
      .join(', '); // You can change to '\n' for new lines
    
    setFormData(prev => ({
      ...prev,
      candidateName: allNames,
      candidateEmail: allEmails,
    }));
  }
};


  const [generatedEmail, setGeneratedEmail] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const reasons = [
    'Position filled',
    'Not a fit for company culture',
    'Insufficient experience',
    'Skills mismatch',
    'Budget constraints',
    'Overqualified',
    'Location requirements',
    'Timeline mismatch'
  ];

  const tones = [
    { id: 'professional', label: 'Professional', color: 'bg-blue-100 text-blue-800' },
    { id: 'friendly', label: 'Friendly', color: 'bg-green-100 text-green-800' },
    { id: 'empathetic', label: 'Empathetic', color: 'bg-purple-100 text-purple-800' }
  ];

  const lengths = [
    { id: 'brief', label: 'Brief' },
    { id: 'standard', label: 'Standard' },
    { id: 'detailed', label: 'Detailed' }
  ];

// ai logic for form generation
const generateEmail = async () => {
  setIsGenerating(true);
   
  try {
    console.log('Calling API:', '/api/generate-email'); // Debug log
    
    const response = await fetch('/api/generate-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        companyName: formData.companyName,
        candidateName: formData.candidateName,
        position: formData.position,
        reason: formData.reason,
        tone: formData.tone,
        length: formData.length,
      }),
    });

    console.log('Response status:', response.status); // Debug log
    console.log('Response ok:', response.ok); // Debug log

    if (!response.ok) {
      let errorMessage = 'Failed to generate email';
      
      // Try to get error message from response
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const errorData = await response.json();
        errorMessage = errorData.error || errorMessage;
      } else {
        // If it's not JSON, it might be HTML error page
        const errorText = await response.text();
        console.log('Error response text:', errorText); // Debug log
        errorMessage = `Server error: ${response.status} ${response.statusText}`;
      }
      
      throw new Error(errorMessage);
    }

    const data = await response.json();
    console.log('Success! Generated email received'); // Debug log
    setGeneratedEmail(data.email);
       
  } catch (error) {
    console.error('Error generating email:', error);
    setGeneratedEmail(
      error instanceof Error 
        ? `Error: ${error.message}` 
        : 'Something went wrong while generating the email.'
    );
  } finally {
    setIsGenerating(false);
  }
};
    
////
const handlePromptExecution = (promptText: string) => {
    setIsGenerating(true);
    
    // Parse prompt and extract information to populate form data
    setTimeout(() => {
      // Simple prompt parsing logic (in real app, this would be more sophisticated)
      const prompt = promptText.toLowerCase();
      
      // Extract candidate name
      const nameMatch = prompt.match(/for\s+(\w+)/);
      const candidateName = nameMatch ? nameMatch[1] : 'Candidate';
      
      // Extract company name
      const companyMatch = prompt.match(/from\s+(\w+)/);
      const companyName = companyMatch ? companyMatch[1] : 'Company';
      
      // Extract position
      const positionMatch = prompt.match(/(software engineer|marketing manager|developer|engineer|manager|analyst|designer|position)/i);
      const position = positionMatch ? positionMatch[1] : 'Position';
      
      // Extract tone
      let tone = 'professional';
      if (prompt.includes('friendly')) tone = 'friendly';
      if (prompt.includes('empathetic')) tone = 'empathetic';
      
      // Extract length
      let length = 'standard';
      if (prompt.includes('brief')) length = 'brief';
      if (prompt.includes('detailed')) length = 'detailed';
      
      // Extract reason
      let reason = 'Position filled';
      if (prompt.includes('insufficient experience') || prompt.includes('experience')) reason = 'Insufficient experience';
      if (prompt.includes('skills mismatch') || prompt.includes('skills')) reason = 'Skills mismatch';
      if (prompt.includes('budget')) reason = 'Budget constraints';
      if (prompt.includes('overqualified')) reason = 'Overqualified';
      if (prompt.includes('culture')) reason = 'Not a fit for company culture';
      
      // Update form data
      const newFormData = {
        candidateName,
        companyName,
        position,
        tone,
        length,
        reason
      };
      
      setFormData(newFormData);
      
      // Generate email with new data
      const templates = {
        professional: {
          brief: `Dear ${candidateName},\n\nThank you for your interest in the ${position} position at ${companyName}. After careful consideration, we have decided to move forward with other candidates.\n\nWe appreciate the time you invested in our process.\n\nBest regards,\nHiring Team`,
          standard: `Dear ${candidateName},\n\nThank you for taking the time to apply for the ${position} position at ${companyName}. We were impressed by your background and experience.\n\nAfter thorough consideration, we have decided to proceed with candidates whose experience more closely aligns with our current needs. Specifically, ${reason.toLowerCase()}.\n\nWe encourage you to apply for future opportunities that match your qualifications.\n\nBest wishes,\nHiring Team`,
          detailed: `Dear ${candidateName},\n\nI hope this message finds you well. I wanted to personally reach out regarding your application for the ${position} position at ${companyName}.\n\nFirst, I want to express our sincere appreciation for the time and effort you put into your application and interview process. Your qualifications and enthusiasm were evident throughout our interactions.\n\nAfter careful deliberation with our team, we have decided to move forward with a candidate whose experience more closely matches our specific requirements. The primary factor in our decision was ${reason.toLowerCase()}.\n\nPlease know that this decision was not easy, and we were genuinely impressed by your professional accomplishments. We will keep your information on file and encourage you to apply for future positions that align with your expertise.\n\nThank you again for your interest in ${companyName}. We wish you the very best in your career journey.\n\nWarm regards,\nHiring Team`
        },
        friendly: {
          brief: `Hi ${candidateName}! 👋\n\nThanks so much for applying to our ${position} role at ${companyName}! While we enjoyed learning about your background, we've decided to go with another candidate.\n\nWe really appreciate your time and interest!\n\nCheers,\nThe Team`,
          standard: `Hi ${candidateName}! 👋\n\nI hope you're doing well! I wanted to reach out about your application for the ${position} position with us at ${companyName}.\n\nWe were really impressed with your experience and enjoyed our conversations. Unfortunately, we've decided to move forward with someone else, primarily due to ${reason.toLowerCase()}.\n\nPlease don't let this discourage you - you have great skills! We'd love to see you apply for other roles that might be a better fit.\n\nThanks again for your interest!\n\nBest,\nThe Hiring Team`,
          detailed: `Hi ${candidateName}! 👋\n\nI hope this message finds you well! I wanted to personally follow up on your application for the ${position} position at ${companyName}.\n\nFirst off, thank you for the time you invested in getting to know us and sharing your story. We genuinely enjoyed our conversations and were impressed by your passion and experience.\n\nAfter much consideration (and honestly, some tough discussions), we've decided to move forward with another candidate. The main factor was ${reason.toLowerCase()}, which doesn't reflect on your abilities at all!\n\nWe think you're talented and would be a great fit somewhere amazing. We'll definitely keep you in mind for future opportunities that align better with your strengths.\n\nThanks again for considering ${companyName} - it means a lot to us!\n\nWishing you all the best,\nThe Hiring Team ✨`
        },
        empathetic: {
          brief: `Dear ${candidateName},\n\nI understand how much effort goes into job searching, and I want to personally thank you for considering ${companyName} for the ${position} role.\n\nWhile we won't be moving forward together, I hope you find the perfect opportunity soon.\n\nWith appreciation,\nHiring Team`,
          standard: `Dear ${candidateName},\n\nI know how much time and energy you've invested in the application process, and I want to personally reach out about your candidacy for the ${position} position at ${companyName}.\n\nWhile we were impressed by your qualifications, we've decided to proceed with another candidate, largely due to ${reason.toLowerCase()}. I understand how disappointing this news can be.\n\nPlease know that this decision doesn't diminish your value as a professional. The right opportunity is out there for you.\n\nI wish you success in your continued search.\n\nWarmly,\nHiring Team`,
          detailed: `Dear ${candidateName},\n\nI hope you're doing well. I wanted to take a moment to personally address your application for the ${position} position at ${companyName}.\n\nI recognize that behind every application is someone who has hopes, dreams, and career aspirations. Your dedication to pursuing this role with us was evident, and I want you to know that we truly appreciate the time and effort you invested in getting to know our company.\n\nAfter careful consideration, we have decided to move forward with another candidate. This decision was primarily influenced by ${reason.toLowerCase()}. I want to emphasize that this choice reflects our specific needs at this moment, not your worth as a professional.\n\nJob searching can be challenging and emotionally taxing. Please don't let this setback discourage you. Your skills and experience have value, and I'm confident that the right opportunity will come your way.\n\nWe will keep your information on file and would be happy to consider you for future positions that better align with your background.\n\nThank you once again for your interest in joining our team. I genuinely wish you the very best in your career journey.\n\nWith sincere regards,\nHiring Team`
        }
      };

      const selectedTemplate = templates[tone as keyof typeof templates];
      const emailContent = selectedTemplate[length as keyof typeof selectedTemplate];
      setGeneratedEmail(emailContent);
      setIsGenerating(false);
    }, 2000);
  };


  //copy to clipboard logic
  const copyToClipboard = () => {

    navigator.clipboard.writeText(generatedEmail);
    toast( "The rejection email has been copied to your clipboard.",
    );
  };

  useEffect(() => {
    if (Object.values(formData).every(value => value !== '')) {
      generateEmail();
    }
  }, [formData]);

  // gmail auto fill logic logic send logic
   const subject = `Re: ${formData.position} Application`;
  const emailBody = generatedEmail;


  return (
    <section className="px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent py-4">
            AI Rejection Generator ✨
          </h1>
          <p className="text-lg text-white">
            We known you got other work to do , so Let the AI handle your rejection emails.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Form */}
          <Card className="p-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-purple-600" />
                Email Details
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsPromptMode(!isPromptMode)}
                >
                  {isPromptMode ? <FileText className="w-4 h-4 mr-1" /> : <Terminal className="w-4 h-4 mr-1" />}
                  {isPromptMode ? 'Form Mode' : 'Prompt Mode'}
                </Button>
                
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {isPromptMode ? (
                <PromptCommand
                onExecutePrompt={handlePromptExecution}
                  isGenerating={isGenerating}
                />
              ) : (
                <>
                  {/* Original Form Fields */}
                  <div className="space-y-2">
                <label htmlFor="company">Company Name
                </label>
                <Input
                  id="company"
                  placeholder="e.g., TechCorp Inc."
                  value={formData.companyName}
                  onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="candidate">Candidate Name</label>
                <Input
                  id="candidate"
                  placeholder="e.g., Sarah Johnson"
                  value={formData.candidateName}
                  onChange={(e) => setFormData({...formData, candidateName: e.target.value})}
                />
              </div>
               <div className="space-y-2">
                  <label htmlFor='email'>Candidate Email
                    {candidates.length > 0 && (
            <span className="text-sm text-gray-500">
              ({candidates.length} emails)
            </span>
          )}
                  </label>
                <Input
                  id="email"
                  placeholder="rad@gmail.com"
                  value={formData.candidateEmail }
onChange={(e)=>setFormData({...formData, candidateEmail: e.target.value})}></Input>
</div>

              <div className="space-y-2">
                <label htmlFor="position">Position</label>
                <Input
                  id="position"
                  placeholder="e.g., Senior Software Engineer"
                  value={formData.position}
                  onChange={(e) => setFormData({...formData, position: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="subject">Subject line</label>
                <Input
                  id="subject"
                  placeholder="Application update for "
                  value={formData.subject}
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="reason">Rejection Reason</label>
                <Select value={formData.reason} onValueChange={(value) => setFormData({...formData, reason: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a reason..." />
                  </SelectTrigger>
                  <SelectContent>
                    {reasons.map((reason) => (
                      <SelectItem key={reason} value={reason}>{reason}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <label>Tone</label>
                <div className="flex gap-2">
                  {tones.map((tone) => (
                    <Badge
                      key={tone.id}
                      variant={formData.tone === tone.id ? "default" : "outline"}
                      className={`cursor-pointer ${formData.tone === tone.id ? tone.color : ''}`}
                      onClick={() => setFormData({...formData, tone: tone.id})}
                    >
                      {tone.label}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <label>Email Length</label>
                <div className="flex gap-2">
                  {lengths.map((length) => (
                    <Badge
                      key={length.id}
                      variant={formData.length === length.id ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => setFormData({...formData, length: length.id})}
                    >
                      {length.label}
                    </Badge>
                  ))}
                </div>
              </div>
<Filecsv onParsedData={handleCSVData} />
              <Button 
                onClick={generateEmail} 
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                disabled={isGenerating}
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    Generate Email
                  </>
                )}
              </Button>
                </>
              )}
            </CardContent>
          </Card>

          {/* Preview */}
          <Card className="p-6">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Mail className="w-5 h-5 text-blue-600" />
                  Email Preview
                </span>
                {generatedEmail && (
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={copyToClipboard}>
                      <Copy className="w-4 h-4 mr-1" />
                      Copy
                    </Button>
                    <div>
                   <a
  href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(formData.candidateEmail)}&su=${encodeURIComponent(formData.position)}&body=${encodeURIComponent(generatedEmail)}`}
  rel="noopener noreferrer"
>
  <Button size="sm" className="bg-red-600 hover:bg-red-700">
    <Mail className="w-4 h-4 mr-1" />
    Send to Gmail
  </Button>
</a>
</div>
                  </div>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {generatedEmail ? (
                <div className="bg-gray-50 rounded-lg p-4 min-h-[400px]">
                  <div className="border-b border-gray-200 pb-3 mb-4">
                    <div className="text-sm text-gray-600 mb-1">
                      <strong>To:</strong> {formData.candidateName ? `${formData.candidateName.toLowerCase().replace(' ', '.')}@email.com` : 'candidate@email.com'}
                    </div>
                    <div className="text-sm text-gray-600">
                      <strong>Subject:</strong> Re: {formData.position || 'Position'} Application
                    </div>
                  </div>
                  <pre className="whitespace-pre-wrap text-sm leading-relaxed text-gray-800 font-sans">
                    {generatedEmail}
                  </pre>
                </div>
              ) : (
                <div className="bg-gray-50 rounded-lg p-8 text-center min-h-[400px] flex items-center justify-center">
                  <div>
                    <Mail className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">Fill out the form to generate your personalized rejection email</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
