
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Drawer, DrawerContent, DrawerTrigger, DrawerClose } from "@/components/ui/drawer";
import { Mic, Send, Loader2, MessageSquare } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AIAgentProps {
  onExecuteTransaction: (transactionDetails: {
    type: string;
    amount?: number;
    fromAccount?: string;
    toAccount?: string;
    recipient?: string;
    purpose?: string;
  }) => void;
  accounts: Array<{
    id: string;
    name: string;
    number: string;
    balance: number;
  }>;
}

const AIAgentInterface = ({ onExecuteTransaction, accounts }: AIAgentProps) => {
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{text: string, fromUser: boolean}[]>([]);
  const { toast } = useToast();
  const recognitionRef = useRef<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Initialize speech recognition
  useEffect(() => {
    if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
      const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';
      
      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        processCommand(transcript);
        setIsListening(false);
      };
      
      recognitionRef.current.onerror = (event: any) => {
        console.error("Speech recognition error", event);
        setIsListening(false);
        toast({
          title: "Voice recognition failed",
          description: "Please try again or use text input instead.",
        });
      };
      
      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
    
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, [toast]);
  
  // Auto-scroll to the latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  
  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.abort();
      setIsListening(false);
    } else {
      if (!recognitionRef.current) {
        toast({
          title: "Speech recognition not supported",
          description: "Your browser doesn't support speech recognition. Please use text input instead.",
        });
        return;
      }
      
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch (error) {
        console.error("Failed to start speech recognition:", error);
        toast({
          title: "Failed to start voice input",
          description: "Please try again or use text input instead.",
        });
      }
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isProcessing) return;
    
    processCommand(input);
  };
  
  const processCommand = async (command: string) => {
    const userMessage = command.trim();
    addMessage(userMessage, true);
    setIsProcessing(true);
    
    // Simple command parsing implementation
    try {
      // Simulate AI processing delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const lowerCommand = userMessage.toLowerCase();
      
      // Try to extract transaction type
      let type = "";
      if (lowerCommand.includes("transfer")) type = "transfer";
      else if (lowerCommand.includes("wire")) type = "wire";
      else if (lowerCommand.includes("eft")) type = "eft";
      else if (lowerCommand.includes("bill") || lowerCommand.includes("pay bill")) type = "bill";
      else if (lowerCommand.includes("email") || lowerCommand.includes("e-transfer")) type = "email";
      else if (lowerCommand.includes("forex") || lowerCommand.includes("exchange")) type = "forex";
      else if (lowerCommand.includes("dashboard") || lowerCommand.includes("home")) {
        addMessage("Taking you to the dashboard...", false);
        setTimeout(() => {
          window.location.href = "/dashboard";
        }, 1000);
        setIsProcessing(false);
        setInput("");
        return;
      }
      else if (lowerCommand.includes("admin") || lowerCommand.includes("portal")) {
        addMessage("Taking you to the admin portal...", false);
        setTimeout(() => {
          window.location.href = "/admin";
        }, 1000);
        setIsProcessing(false);
        setInput("");
        return;
      }
      else {
        addMessage("I can help you navigate or make transactions. Try saying something like 'transfer money', 'go to dashboard', or ask for help.", false);
        setIsProcessing(false);
        setInput("");
        return;
      }
      
      // Extract amount using regex
      const amountRegex = /\$?(\d+(?:\.\d{1,2})?)/;
      const amountMatch = lowerCommand.match(amountRegex);
      const amount = amountMatch ? parseFloat(amountMatch[1]) : undefined;
      
      // Extract account information (simplified)
      const fromAccountMatch = accounts.find(account => 
        lowerCommand.includes(account.name.toLowerCase()) || 
        lowerCommand.includes(account.number)
      );
      
      let fromAccount = fromAccountMatch ? fromAccountMatch.id : accounts[0]?.id;
      
      // Create a transaction object
      const transactionDetails = {
        type,
        amount,
        fromAccount,
        // Additional fields could be extracted here in a more sophisticated implementation
      };
      
      // Respond to the user
      let response = `I'll help you with your ${type} transaction`;
      if (amount) response += ` for $${amount}`;
      response += `. Preparing your transaction now...`;
      
      addMessage(response, false);
      
      // Execute the transaction
      onExecuteTransaction(transactionDetails);
      
    } catch (error) {
      console.error("Error processing command:", error);
      addMessage("Sorry, I encountered an error processing your request. Please try again.", false);
    } finally {
      setIsProcessing(false);
      setInput("");
    }
  };
  
  const addMessage = (text: string, fromUser: boolean) => {
    setMessages(prev => [...prev, {text, fromUser}]);
  };
  
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button 
          variant="outline" 
          className="fixed bottom-4 right-4 h-12 w-12 rounded-full shadow-lg p-0 bg-primary hover:bg-primary/90 z-50"
        >
          <MessageSquare className="h-6 w-6 text-white" />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="h-[80vh]">
        <Card className="border-0 rounded-none h-full flex flex-col">
          <CardHeader className="border-b">
            <CardTitle className="text-center">Digital Finance Assistant</CardTitle>
          </CardHeader>
          <CardContent className="flex-grow overflow-y-auto pt-4 pb-20">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
                <MessageSquare className="h-12 w-12 mb-4 opacity-50" />
                <p className="mb-2">How can I help you today?</p>
                <p className="text-sm max-w-md">
                  Try saying or typing something like "Transfer $500 from my checking account to savings", 
                  "Take me to the dashboard", or "Open the admin portal"
                </p>
              </div>
            ) : (
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
            )}
          </CardContent>
          <CardFooter className="border-t p-4 absolute bottom-0 left-0 right-0 bg-background">
            <form onSubmit={handleSubmit} className="flex w-full gap-2">
              <Input
                placeholder={isListening ? "Listening..." : "Ask me anything..."}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isListening || isProcessing}
                className="flex-grow"
              />
              <Button 
                type="button"
                size="icon"
                variant="outline"
                onClick={toggleListening}
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
          </CardFooter>
        </Card>
      </DrawerContent>
    </Drawer>
  );
};

export default AIAgentInterface;
