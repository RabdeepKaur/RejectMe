import { PromptCommand } from "./ui/useprompt";

interface PromptModeProps {
  emailForm: ReturnType<typeof import("@/app/hooks/useEmailForm").useEmailForm>;
}

export const PromptMode = ({ emailForm }: PromptModeProps) => {
  const { generateEmail, isGenerating, modelLoading, loadingProgress } = emailForm;
  return (
    <div className="space-y-4">
      <PromptCommand
        onExecutePrompt={(prompt) => generateEmail(prompt)}
        isGenerating={isGenerating || modelLoading}
      />
      {modelLoading && (
        <div className="text-sm text-gray-600 text-center">
          Loading AI Model... {Math.round(loadingProgress * 100)}%
        </div>
      )}
      <div className="mt-4 p-4 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-600 mb-2">
          <strong>Prompt Examples:</strong>
        </p>
        <ul className="text-sm text-gray-500 space-y-1">
          <li>• "Write a friendly rejection for John who applied for Software Engineer at TechCorp"</li>
          <li>• "Create a brief, empathetic rejection for Sarah's marketing role due to budget constraints"</li>
          <li>• "Generate a professional rejection for an overqualified data analyst candidate"</li>
        </ul>
      </div>
    </div>
  );
};