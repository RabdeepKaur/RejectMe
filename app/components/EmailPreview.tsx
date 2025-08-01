import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Copy, Mail } from 'lucide-react';
import { toast } from 'sonner';
import { FormData } from '@/app/types/aiGenerator';

interface EmailPreviewProps {
  generatedEmail: string;
  formData: FormData;
}

export const EmailPreview = ({ generatedEmail, formData }: EmailPreviewProps) => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedEmail);
    toast("The rejection email has been copied to your clipboard.");
  };

  const subject = `Re: ${formData.position} Application`;

  return (
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
                  href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
                    formData.candidateEmail
                  )}&su=${encodeURIComponent(
                    subject
                  )}&body=${encodeURIComponent(generatedEmail)}`}
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
                <strong>To:</strong> {formData.candidateEmail}
              </div>
              <div className="text-sm text-gray-600">
                <strong>Subject:</strong> {subject}
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
              <p className="text-gray-500">
                Fill out the form to generate your personalized rejection email
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};