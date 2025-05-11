
import React, { useRef, useEffect } from "react";
import { MessageSquare } from "lucide-react";

interface Message {
  text: string;
  fromUser: boolean;
}

interface MessageListProps {
  messages: Message[];
}

const MessageList = ({ messages }: MessageListProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (messages.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
        <MessageSquare className="h-12 w-12 mb-4 opacity-50" />
        <p className="mb-2">How can I help you today?</p>
        <p className="text-sm max-w-md">
          Try saying or typing things like "Tell me about recent transactions", 
          "What's my business health score?", or "Show me pending approvals"
        </p>
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
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;
