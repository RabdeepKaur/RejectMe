import { Input } from "@/app/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import { RefreshCw, Sparkles } from "lucide-react";
import Filecsv from "./ui/Filecsv";
import {
  REJECTION_REASONS,
  TONE_OPTIONS,
  LENGTH_OPTIONS,
} from "@/app/constants/aiGenerator";

interface FormModeProps {
  emailForm: ReturnType<typeof import("@/app/hooks/useEmailForm").useEmailForm>;
}

export const FormMode = ({ emailForm }: FormModeProps) => {
  const {
    formData,
    candidates,
    isGenerating,
    modelLoading,
    loadingProgress,
    updateForm,
    setCandidates,
    selectCandidate,
    clearCandidates,
    generateEmail,
  } = emailForm;
  return (
    <>
      {/* Form Fields */}
      <div className="space-y-2">
        <label htmlFor="company">Company Name</label>
        <Input
          id="company"
          placeholder="e.g., TechCorp Inc."
          value={formData.companyName}
          onChange={(e) => updateForm({ companyName: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="candidate">Candidate Name</label>
        <Input
          id="candidate"
          placeholder="e.g., Sarah Johnson"
          value={formData.candidateName}
          onChange={(e) => updateForm({ candidateName: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="email">
          Candidate Email
          {candidates.length > 0 && (
            <span className="text-sm text-gray-500">
              ({candidates.length} emails)
            </span>
          )}
        </label>
        <Input
          id="email"
          placeholder="rad@gmail.com"
          value={formData.candidateEmail}
          onChange={(e) => updateForm({ candidateEmail: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="position">Position</label>
        <Input
          id="position"
          placeholder="e.g., Senior Software Engineer"
          value={formData.position}
          onChange={(e) => updateForm({ position: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="subject">Subject line</label>
        <Input
          id="subject"
          placeholder="Application update for "
          value={formData.subject}
          onChange={(e) => updateForm({ subject: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="reason">Rejection Reason</label>
        <Select 
          value={formData.reason} 
          onValueChange={(value) => updateForm({ reason: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a reason..." />
          </SelectTrigger>
          <SelectContent>
            {REJECTION_REASONS.map((reason) => (
              <SelectItem key={reason} value={reason}>
                {reason}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-3">
        <label>Tone</label>
        <div className="flex gap-2">
          {TONE_OPTIONS.map((tone) => (
            <Badge
              key={tone.id}
              variant={formData.tone === tone.id ? "default" : "outline"}
              className={`cursor-pointer ${
                formData.tone === tone.id ? tone.color : ""
              }`}
              onClick={() => updateForm({ tone: tone.id as any })}
            >
              {tone.label}
            </Badge>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <label>Email Length</label>
        <div className="flex gap-2">
          {LENGTH_OPTIONS.map((length) => (
            <Badge
              key={length.id}
              variant={formData.length === length.id ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => updateForm({ length: length.id as any })}
            >
              {length.label}
            </Badge>
          ))}
        </div>
      </div>

      <Filecsv onParsedData={setCandidates} />
      
      <Button
        onClick={() => generateEmail()}
        className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
        disabled={isGenerating || modelLoading}
      >
        {modelLoading ? (
          <>
            <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
            Loading Model... {Math.round(loadingProgress * 100)}%
          </>
        ) : isGenerating ? (
          <>
            <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
            Generating...
          </>
        ) : (
          <>
            <Sparkles className="w-4 h-4 mr-2" />
            Generate Email
          </>
        )}
      </Button>
    </>
  );
};