
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Drawer, DrawerContent, DrawerTrigger, DrawerClose } from "@/components/ui/drawer";
import { Mic, Send, Loader2, MessageSquare } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { approvedTransactions, loginAudits, declinedTransactions, pendingTransactions } from "@/components/dashboard/reports/data";

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
  
  const getInformationAbout = (topic: string, query: string) => {
    // Helper to extract information about different parts of the application
    let response = "";
    const lowerQuery = query.toLowerCase();
    
    switch(topic) {
      case "transactions":
        if (lowerQuery.includes("approved") || lowerQuery.includes("completed")) {
          response = `I found ${approvedTransactions.length} approved transactions. `;
          if (approvedTransactions.length > 0) {
            const recent = approvedTransactions[0];
            response += `The most recent one was a ${recent.type} transaction for $${recent.amount} on ${recent.date}.`;
          }
        } else if (lowerQuery.includes("declined") || lowerQuery.includes("rejected")) {
          response = `There are ${declinedTransactions.length} declined transactions. `;
          if (declinedTransactions.length > 0) {
            const reasons = [...new Set(declinedTransactions.map(tx => tx.reason))];
            response += `Common rejection reasons include: ${reasons.join(", ")}.`;
          }
        } else if (lowerQuery.includes("pending")) {
          response = `There are ${pendingTransactions.length} pending transactions awaiting approval.`;
        } else {
          const totalTx = approvedTransactions.length + declinedTransactions.length + pendingTransactions.length;
          response = `There are ${totalTx} transactions in the system: ${approvedTransactions.length} approved, ${declinedTransactions.length} declined, and ${pendingTransactions.length} pending.`;
        }
        break;
        
      case "audit":
      case "login":
        response = `There are ${loginAudits.length} login audit records. `;
        const successfulLogins = loginAudits.filter(log => log.status === "success").length;
        const failedLogins = loginAudits.filter(log => log.status === "failed").length;
        response += `${successfulLogins} successful logins and ${failedLogins} failed attempts.`;
        break;
        
      case "approvals":
        const pendingApprovalCount = pendingTransactions.reduce((acc, tx) => {
          return acc + (tx.requiredApprovers - tx.currentApprovers);
        }, 0);
        response = `There are ${pendingTransactions.length} transactions requiring approval, with a total of ${pendingApprovalCount} pending approvals needed.`;
        break;
        
      case "reports":
        response = "You can generate reports for approved transactions, declined transactions, pending approvals, and login audits from the Reports tab in the Dashboard.";
        break;
        
      case "business health":
        response = "The Business Health tab provides financial metrics, cash flow analysis, and overall health score for your business. You can upload financial statements to get detailed insights.";
        break;
        
      case "admin":
      case "admin portal":
        response = "The Admin Portal allows you to manage users, set approval limits, and configure system settings. You can access it from the navigation menu.";
        break;
        
      default:
        response = "I can provide information about transactions, audit logs, approvals, reports, business health, and the admin portal. What would you like to know about?";
    }
    
    return response;
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
      
      // Check if this is an information request
      const infoTopics = [
        { keywords: ["transaction", "transfer", "payment"], topic: "transactions" },
        { keywords: ["audit", "login history", "security"], topic: "audit" },
        { keywords: ["approval", "pending", "authorize"], topic: "approvals" },
        { keywords: ["report", "analytics", "summary"], topic: "reports" },
        { keywords: ["business health", "financial", "metrics"], topic: "business health" },
        { keywords: ["admin", "portal", "settings"], topic: "admin portal" }
      ];
      
      // Check if it's an information request
      const isQuestion = lowerCommand.includes("?") || 
        lowerCommand.includes("tell me") || 
        lowerCommand.includes("show me") || 
        lowerCommand.includes("what") || 
        lowerCommand.includes("how") ||
        lowerCommand.includes("where") ||
        lowerCommand.includes("when") ||
        lowerCommand.includes("why") ||
        lowerCommand.includes("who");
        
      if (isQuestion) {
        // Find which topic the question is about
        for (const {keywords, topic} of infoTopics) {
          if (keywords.some(keyword => lowerCommand.includes(keyword))) {
            const response = getInformationAbout(topic, lowerCommand);
            addMessage(response, false);
            setIsProcessing(false);
            setInput("");
            return;
          }
        }
        
        // Generic response if no specific topic was identified
        addMessage("I can help you with information about transactions, audit logs, approvals, reports, business health, and the admin portal. Please specify what you'd like to know.", false);
        setIsProcessing(false);
        setInput("");
        return;
      }
      
      // Try to extract transaction type if this is an action request
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
        addMessage("I can help you navigate, make transactions, or provide information about your financial data. Try saying something like 'transfer money', 'tell me about recent transactions', or 'go to dashboard'.", false);
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
                  Try saying or typing things like "Tell me about recent transactions", 
                  "What's my business health score?", or "Show me pending approvals"
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
