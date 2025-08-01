"use client";
import { useState } from "react";
import { Button } from "@/app/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { FileText, Sparkles, Terminal } from "lucide-react";
import { EmailPreview } from "./EmailPreview";
import { FormMode } from "./FormMode";
import { PromptMode } from "./PromptMode";
import { useEmailForm } from "@/app/hooks/useEmailForm";

export const AIGenerator = () => {
  const [isPromptMode, setIsPromptMode] = useState(false);
  const emailForm = useEmailForm();

  return (
    <section className="px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent py-4">
            AI Rejection Generator ✨
          </h1>
          <p className="text-lg text-white">
            We know you got other work to do, so let the AI handle your rejection emails.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Form/Prompt Input */}
          <Card className="p-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-purple-600" />
                Email Details
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsPromptMode(!isPromptMode)}
                >
                  {isPromptMode ? (
                    <FileText className="w-4 h-4 mr-1" />
                  ) : (
                    <Terminal className="w-4 h-4 mr-1" />
                  )}
                  {isPromptMode ? "Form Mode" : "Prompt Mode"}
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {isPromptMode ? (
                <PromptMode emailForm={emailForm} />
              ) : (
                <FormMode emailForm={emailForm} />
              )}
            </CardContent>
          </Card>

          {/* Email Preview */}
          <EmailPreview generatedEmail={emailForm.generatedEmail} formData={emailForm.formData} />
        </div>
      </div>
    </section>
  );
};