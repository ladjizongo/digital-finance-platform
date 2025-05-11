
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mic, Send, Loader2 } from "lucide-react";

interface AgentInputFormProps {
  input: string;
  isListening: boolean;
  isProcessing: boolean;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  onToggleListening: () => void;
}

const AgentInputForm = ({ 
  input, 
  isListening, 
  isProcessing, 
  onInputChange, 
  onSubmit, 
  onToggleListening 
}: AgentInputFormProps) => {
  return (
    <form onSubmit={onSubmit} className="flex w-full gap-2">
      <Input
        placeholder={isListening ? "Listening..." : "Ask me anything..."}
        value={input}
        onChange={onInputChange}
        disabled={isListening || isProcessing}
        className="flex-grow"
      />
      <Button 
        type="button"
        size="icon"
        variant="outline"
        onClick={onToggleListening}
        disabled={isProcessing}
        className={isListening ? "bg-red-100" : ""}
      >
        <Mic className={`h-4 w-4 ${isListening ? "text-red-500 animate-pulse" : ""}`} />
      </Button>
      <Button type="submit" size="icon" disabled={!input.trim() || isProcessing}>
        {isProcessing ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Send className="h-4 w-4" />
        )}
      </Button>
    </form>
  );
};

export default AgentInputForm;
