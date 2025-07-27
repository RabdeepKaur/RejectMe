import { useState } from 'react';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Card, CardContent } from '@/app/components/ui/card';
import { Terminal, Send } from 'lucide-react';

interface PromptCommandProps {
  onExecutePrompt: (prompt: string) => void;
  isGenerating: boolean;
}

export const PromptCommand = ({ onExecutePrompt, isGenerating }: PromptCommandProps) => {
  const [promptText, setPromptText] = useState('');

  const promptSuggestions = [
    "Generate a professional rejection email for Sarah from TechCorp for a Software Engineer position due to insufficient experience",
    "Create a friendly rejection email for a Marketing Manager role because the position was filled",
    "Write an empathetic rejection email for a Senior Developer position due to skills mismatch",
    "Generate a brief professional rejection email for budget constraints",
    "Create a detailed empathetic rejection for overqualified candidate"
  ];

  const handleSubmit = () => {
    if (promptText.trim()) {
      onExecutePrompt(promptText);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      handleSubmit();
    }
  };

  return (
    <div className="space-y-6">
      {/* Prompt Suggestions */}
      <div className="space-y-3">
        <label>Quick Prompts</label>
        <div className="grid gap-2">
          {promptSuggestions.map((suggestion, index) => (
            <div
              key={index}
              className="p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors text-sm border-l-4 border-purple-500"
              onClick={() => setPromptText(suggestion)}
            >
              {suggestion}
            </div>
          ))}
        </div>
      </div>

      {/* Command Line Interface */}
      <Card className="bg-white text-black font-mono">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 text-sm text-black mb-2">
            <Terminal className="w-4 h-4" />
            <span>AI Rejection Generator v1.0</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-green-400">$</span>
            <Input
              value={promptText}
              onChange={(e) => setPromptText(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Enter your prompt here... (Ctrl/Cmd + Enter to execute)"
              className="bg-transparent border-none text-black placeholder-black focus:ring-0 focus:border-none font-mono"
            />
            <Button
              onClick={handleSubmit}
              disabled={!promptText.trim() || isGenerating}
              size="sm"
              variant="outline"
              className="bg-white border-green-600 text-black hover:bg-green-800"
            >
              {isGenerating ? (
                <div className="w-4 h-4 border-2 border-green-400 border-t-transparent rounded-full animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
            </Button>
          </div>
          <div className="text-xs text-black mt-2">
            Tip: Use natural language to describe the rejection email you want to generate
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

