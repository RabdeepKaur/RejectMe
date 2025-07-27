// lib/generateEmailFromPrompt.ts
import { GoogleGenerativeAI } from "@google/generative-ai";

type GenerateEmailprompt = {
 promptText: string;
};

export async function generateRejectionEmailprompt({
  promptText
}: GenerateEmailprompt): Promise<string> {
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

  const prompt = `Write a professional, polite rejection email to a candidate based on the following prompt:
${promptText} 

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

