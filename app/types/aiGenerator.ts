export interface FormData {
  companyName: string;
  candidateName: string;
  candidateEmail: string;
  position: string;
  reason: string;
  subject: string;
  emailBody: string;
  tone: 'professional' | 'friendly' | 'empathetic';
  length: 'brief' | 'standard' | 'detailed';
  model: 'webllm';
}

export interface Candidate {
  name: string;
  email: string;
}

export interface EmailGeneratorProps {
  onEmailGenerated?: (email: string) => void;
}

export type ToneOption = {
  id: string;
  label: string;
  color: string;
};

export type LengthOption = {
  id: string;
  label: string;
};

export type ModelOption = {
  id: string;
  label: string;
};