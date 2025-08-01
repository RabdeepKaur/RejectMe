import { useState } from 'react';
import { toast } from 'sonner';
import { FormData, Candidate } from '@/app/types/aiGenerator';
import { useWebLLM } from './useWebLLM';
import { buildRejectionEmailPrompt, buildPromptFromText } from '@/app/utils/promptBuilder';
import { handleAIError, getErrorToastOptions } from '@/app/utils/errorHandler';

const initialFormData: FormData = {
  companyName: "",
  candidateName: "",
  candidateEmail: "",
  position: "",
  reason: "",
  subject: "",
  emailBody: "",
  tone: "professional",
  length: "standard",
  model: "webllm",
};

export const useEmailForm = () => {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [generatedEmail, setGeneratedEmail] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const { generateWithWebLLM, isLoading: modelLoading, loadingProgress } = useWebLLM();

  // Universal form update function
  const updateForm = (updates: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  // Candidate selection
  const selectCandidate = (candidate: Candidate) => {
    updateForm({
      candidateName: candidate.name,
      candidateEmail: candidate.email
    });
  };

  // Clear candidates and related form fields
  const clearCandidates = () => {
    setCandidates([]);
    updateForm({ candidateName: "", candidateEmail: "" });
  };

  // Universal email generation function
  const generateEmail = async (promptText?: string) => {
    setIsGenerating(true);
    try {
      // Build prompt based on whether we have form data or free text
      const prompt = promptText
        ? buildPromptFromText(promptText)
        : buildRejectionEmailPrompt(formData);

      const emailText = await generateWithWebLLM(prompt);

      if (!emailText) {
        throw new Error('No response from AI model');
      }

      setGeneratedEmail(emailText);
      toast.success("Email generated successfully!");
    } catch (error) {
      const context = promptText ? 'generateEmailFromPrompt' : 'generateEmail';
      const errorResult = handleAIError(error, context);
      setGeneratedEmail("");
      toast.error(errorResult.message, getErrorToastOptions(errorResult));
    } finally {
      setIsGenerating(false);
    }
  };

  return {
    // State
    formData,
    candidates,
    generatedEmail,
    isGenerating,
    modelLoading,
    loadingProgress,

    // Actions
    updateForm,
    setCandidates,
    selectCandidate,
    clearCandidates,
    generateEmail,
    resetForm: () => {
      setFormData(initialFormData);
      setGeneratedEmail("");
    },
  };
};