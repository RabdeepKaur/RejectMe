export type ErrorContext = 'generateEmail' | 'generateEmailFromPrompt' | 'loadModel' | 'parseCSV';

export interface ErrorResult {
  message: string;
  type: 'error' | 'warning' | 'info';
  action?: string;
}

export const handleAIError = (error: unknown, context: ErrorContext): ErrorResult => {
  console.error(`Error in ${context}:`, error);
  
  // Default error
  let result: ErrorResult = {
    message: "Something went wrong. Please try again.",
    type: 'error'
  };
  
  if (error instanceof Error) {
    const errorMessage = error.message.toLowerCase();
    
    // Model loading errors
    if (errorMessage.includes('webllm engine not initialized') || errorMessage.includes('model')) {
      result = {
        message: "The AI model is still loading. Please wait a moment and try again.",
        type: 'warning',
        action: "Wait for model to load"
      };
    }
    // No response errors
    else if (errorMessage.includes('no response')) {
      result = {
        message: "The AI didn't generate a response. Please try again or refresh the page.",
        type: 'error',
        action: "Refresh page"
      };
    }
    // Network errors
    else if (errorMessage.includes('network') || errorMessage.includes('fetch')) {
      result = {
        message: "Network error. Please check your connection and try again.",
        type: 'error',
        action: "Check connection"
      };
    }
    // Timeout errors
    else if (errorMessage.includes('timeout')) {
      result = {
        message: "The request took too long. Please try again with a shorter prompt.",
        type: 'warning',
        action: "Simplify prompt"
      };
    }
    // Form validation errors
    else if (errorMessage.includes('missing') || errorMessage.includes('required')) {
      result = {
        message: "Please fill in all required fields before generating.",
        type: 'info',
        action: "Complete form"
      };
    }
  }
  
  return result;
};

export const getErrorToastOptions = (error: ErrorResult) => {
  return {
    description: error.action,
    duration: error.type === 'error' ? 5000 : 3000,
  };
};