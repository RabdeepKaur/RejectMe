import { FormData } from '@/app/types/aiGenerator';

export const buildRejectionEmailPrompt = (formData: FormData): string => {
  const { candidateEmail, candidateName, position, companyName, reason, tone, length } = formData;
  
  return `Write a professional, polite rejection email ${
    candidateEmail ? `to ${candidateEmail}` : ''
  } to a candidate named ${candidateName} for the position of ${
    position
  } at ${companyName}. 

The reason for rejection is: ${reason}. 

Tone: ${tone}.
Length: ${length}.

Please include:
- A professional greeting
- Appreciation for their interest and time
- Clear but polite rejection
- The specific reason (if appropriate to share)
- Encouragement for future opportunities
- A professional closing

Format as a proper email with subject line.`;
};

export const buildPromptFromText = (promptText: string): string => {
  return `Generate a professional rejection email based on this request: "${promptText}"
      
Please create a complete rejection email including:
- A professional subject line
- A greeting
- Appreciation for the candidate's interest and time
- A clear but polite rejection
- The reason for rejection (if mentioned in the prompt)
- Encouragement for future opportunities
- A professional closing

Make sure the tone and length match what's requested in the prompt.`;
};

export const validateFormForPrompt = (formData: FormData): { isValid: boolean; missingFields: string[] } => {
  const requiredFields = ['candidateName', 'position', 'companyName', 'reason'] as const;
  const missingFields: string[] = [];
  
  requiredFields.forEach(field => {
    if (!formData[field]) {
      missingFields.push(field);
    }
  });
  
  return {
    isValid: missingFields.length === 0,
    missingFields
  };
};