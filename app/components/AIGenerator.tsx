"use client"
import { useState, useEffect } from 'react';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
//import { Label } from '@/app/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { Badge } from '@/app/components/ui/badge';
import { Copy, Mail, Sparkles, RefreshCw, Pencil} from 'lucide-react';
import { toast } from "sonner"
import Filecsv from './ui/Filecsv';
import { UsePrompt } from './ui/useprompt';

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


const [candidates, setCandidates] = useState<{ name: string; email: string }[]>([]);
 const [selectedCandidateIndex, setSelectedCandidateIndex] = useState<number>(0);

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

  const generateEmail = () => {
    setIsGenerating(true);
    
    // Simulate AI generation
    setTimeout(() => {

    }, 2000);
  };

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
   const subject = `Re: ${formData.position} Application`;
  const emailBody = generatedEmail;


  return (
    <section className="px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            AI Rejection Generator ✨
          </h1>
          <p className="text-lg text-white">
            We known you got other work to do , so Let the AI handle your rejection emails.
          </p>
        </div>
<div className="flex p-4 gap-4 "> 
  <Filecsv onParsedData={handleCSVData} /> <UsePrompt/>
  </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Form */}
          <Card className="p-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-purple-600" />
                Email Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="company">Company Name</label>
                <Input
                  id="company"
                  placeholder="e.g., TechCorp Inc."
                  value={formData.companyName}
                  onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="candidate">Candidate Name
                    Candidate Name 
          {candidates.length > 0 && (
            <span className="text-sm text-gray-500">
              ({candidates.length} candidates)
            </span>
          )}
                </label>
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
                <label htmlFor="subject">Subject line</label>
                <Input
                  id="subject"
                  placeholder="Application update for "
                  value={formData.subject}
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                />
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
                     <Pencil  />
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
                      <strong>Subject:</strong> Re: {formData.subject|| 'Position'} Application
                    </div>
                  </div>
                  <div>
                  <pre className="whitespace-pre-wrap text-sm leading-relaxed text-gray-800 font-sans">
                   {generatedEmail} 
                  </pre>
                  
                </div>
                </div>
                
              ) : (
                <div className="bg-gray-50 rounded-lg p-8 text-center min-h-[400px] flex items-center justify-center">
                  Reject candatidate emails will appear here once generated.
                </div>
              
              )}

            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
