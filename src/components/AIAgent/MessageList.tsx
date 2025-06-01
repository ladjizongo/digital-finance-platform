
import React, { useRef, useEffect } from "react";
import { MessageSquare } from "lucide-react";
import ChatbotSuggestions from "@/components/financial/ChatbotSuggestions";

interface Message {
  text: string;
  fromUser: boolean;
  isTyping?: boolean;
}

interface MessageListProps {
  messages: Message[];
  isTyping: boolean;
  onSuggestionClick?: (suggestion: string) => void;
}

const MessageList = ({ messages, isTyping, onSuggestionClick }: MessageListProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  if (messages.length === 0 && !isTyping) {
    return (
      <div className="space-y-6">
        {onSuggestionClick && (
          <ChatbotSuggestions onSuggestionClick={onSuggestionClick} />
        )}
        <div className="flex flex-col items-center justify-center text-center text-muted-foreground">
          <MessageSquare className="h-12 w-12 mb-4 opacity-50" />
          <p className="mb-2">How can I help you today?</p>
          <p className="text-sm max-w-md">
            Try saying or typing things like "Tell me about recent transactions", 
            "What's my business health score?", or "Show me pending approvals"
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {messages.map((message, i) => (
        <div 
          key={i} 
          className={`flex ${message.fromUser ? 'justify-end' : 'justify-start'}`}
        >
          <div 
            className={`rounded-lg px-4 py-2 max-w-[80%] ${
              message.fromUser 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-secondary text-secondary-foreground'
            }`}
          >
            {message.text}
          </div>
        </div>
      ))}

      {isTyping && (
        <div className="flex justify-start">
          <div className="rounded-lg px-4 py-2 bg-secondary text-secondary-foreground">
            <div className="flex space-x-2">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" style={{ animationDelay: "0.2s" }}></div>
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" style={{ animationDelay: "0.4s" }}></div>
            </div>
          </div>
        </div>
      )}
      
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;
