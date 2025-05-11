
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

import { useSpeechRecognition } from "@/hooks/useSpeechRecognition";
import { AIAgentService } from "@/services/AIAgentService";
import MessageList from "./MessageList";
import AgentInputForm from "./AgentInputForm";
import { useNavigate } from "react-router-dom";

interface AIAgentProps {
  onExecuteTransaction?: (transactionDetails: {
    type: string;
    amount?: number;
    fromAccount?: string;
    toAccount?: string;
    recipient?: string;
    purpose?: string;
  }) => void;
  accounts?: Array<{
    id: string;
    name: string;
    number: string;
    balance: number;
  }>;
}

const AIAgentInterface = ({ onExecuteTransaction, accounts = [] }: AIAgentProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{text: string, fromUser: boolean}[]>([]);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const addMessage = (text: string, fromUser: boolean) => {
    setMessages(prev => [...prev, {text, fromUser}]);
  };
  
  const handleTranscript = (transcript: string) => {
    setInput(transcript);
    processCommand(transcript);
  };
  
  const { isListening, toggleListening } = useSpeechRecognition(handleTranscript);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isProcessing) return;
    
    processCommand(input);
  };
  
  const executeTransaction = (transactionDetails: { 
    type: string; 
    amount?: number; 
    fromAccount?: string; 
    toAccount?: string; 
    recipient?: string;
    purpose?: string;
  }) => {
    if (onExecuteTransaction) {
      onExecuteTransaction(transactionDetails);
    } else {
      // If no callback is provided, navigate to transactions page with appropriate parameters
      const params = new URLSearchParams();
      if (transactionDetails.type) params.set('tab', transactionDetails.type);
      navigate(`/transactions?${params.toString()}`);
      
      // Show toast notification
      toast({
        title: "Transaction initiated",
        description: `Preparing ${transactionDetails.type} transaction interface for you.`,
      });
    }
  };
  
  const processCommand = async (command: string) => {
    const userMessage = command.trim();
    addMessage(userMessage, true);
    setIsProcessing(true);
    setIsTyping(true);
    
    try {
      // Start showing typing indicator before processing
      
      // Simulate AI processing delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const lowerCommand = userMessage.toLowerCase();
      
      // Check if this is an information request
      if (AIAgentService.isInformationRequest(lowerCommand)) {
        const topic = AIAgentService.getTopicFromQuery(lowerCommand);
        
        if (topic) {
          const response = AIAgentService.getInformationAbout(topic, lowerCommand);
          // Stop typing indicator before adding the response
          setIsTyping(false);
          addMessage(response, false);
        } else {
          // Generic response if no specific topic was identified
          setIsTyping(false);
          addMessage("I can help you with information about transactions, audit logs, approvals, reports, business health, and the admin portal. Please specify what you'd like to know.", false);
        }
        
        setIsProcessing(false);
        setInput("");
        return;
      }
      
      // Handle navigation commands
      if (lowerCommand.includes("dashboard") || lowerCommand.includes("home")) {
        setIsTyping(false);
        addMessage("Taking you to the dashboard...", false);
        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);
        setIsProcessing(false);
        setInput("");
        return;
      } else if (lowerCommand.includes("admin") || lowerCommand.includes("portal")) {
        setIsTyping(false);
        addMessage("Taking you to the admin portal...", false);
        setTimeout(() => {
          navigate("/admin");
        }, 1000);
        setIsProcessing(false);
        setInput("");
        return;
      } else if (lowerCommand.includes("transaction") || lowerCommand.includes("payment")) {
        setIsTyping(false);
        addMessage("Taking you to the transactions page...", false);
        setTimeout(() => {
          navigate("/transactions");
        }, 1000);
        setIsProcessing(false);
        setInput("");
        return;
      }
      
      // Try to extract transaction details
      const transactionDetails = AIAgentService.extractTransactionDetails(lowerCommand, accounts);
      
      if (transactionDetails) {
        // Respond to the user
        let response = `I'll help you with your ${transactionDetails.type} transaction`;
        if (transactionDetails.amount) response += ` for $${transactionDetails.amount}`;
        response += `. Preparing your transaction now...`;
        
        setIsTyping(false);
        addMessage(response, false);
        
        // Execute the transaction
        executeTransaction(transactionDetails);
      } else {
        setIsTyping(false);
        addMessage("I can help you navigate, make transactions, or provide information about your financial data. Try saying something like 'transfer money', 'tell me about recent transactions', or 'go to dashboard'.", false);
      }
      
    } catch (error) {
      console.error("Error processing command:", error);
      setIsTyping(false);
      addMessage("Sorry, I encountered an error processing your request. Please try again.", false);
    } finally {
      setIsProcessing(false);
      setInput("");
    }
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
            <MessageList messages={messages} isTyping={isTyping} />
          </CardContent>
          <CardFooter className="border-t p-4 absolute bottom-0 left-0 right-0 bg-background">
            <AgentInputForm
              input={input}
              isListening={isListening}
              isProcessing={isProcessing}
              onInputChange={(e) => setInput(e.target.value)}
              onSubmit={handleSubmit}
              onToggleListening={toggleListening}
            />
          </CardFooter>
        </Card>
      </DrawerContent>
    </Drawer>
  );
};

export default AIAgentInterface;
