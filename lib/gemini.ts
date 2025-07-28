
// lib/gemini-api.ts
// lib/generateRejectionEmail.ts
import { GoogleGenerativeAI } from "@google/generative-ai";

type GenerateEmailOptions = {
   candidateEmail?: string;
  candidateName: string;
  position: string;
  companyName?: string;
  reason: string;
  tone?: string;
  length?: string;
};

export async function generateRejectionEmail({
  candidateEmail,
  candidateName,
  position,
  companyName = '',
  reason,
  tone = 'respectful and encouraging',
  length = 'medium',
}: GenerateEmailOptions): Promise<string> {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error('GEMINI_API_KEY not found in environment variables');
  }

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({
    model: 'gemini-2.0-flash-exp',
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 1500,
    },
  });

  const prompt = `Write a professional, polite rejection email ${ candidateEmail}to a candidate named ${candidateName} for the position of ${position} at ${companyName}. 

The reason for rejection is: ${reason}. 

Tone: ${tone}.
Length: ${length}.

Please include:
- A professional greeting
- Appreciation for their interest and time
- Clear but polite rejection
- The specific reason (if appropriate to share)
- Encouragement for future opportunities
- Professional closing

Format as a proper email with subject line.`;

  const result = await model.generateContent(prompt);
  const response = await result.response;

  const emailText = response.text();
  if (!emailText) {
    throw new Error('No response from Gemini API');
  }

  return emailText;
}
