
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Lock, AlertCircle, CheckCircle2, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const validatePassword = (password: string) => {
    const minLength = password.length >= 8;
    return minLength;
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if account is locked due to too many failed attempts
    if (isLocked) {
      toast({
        title: "Account temporarily locked",
        description: "Too many failed login attempts. Please try again later.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    // Basic validation
    if (!userId || !password) {
      setIsLoading(false);
      toast({
        title: "Error",
        description: "Please enter both user ID and password.",
        variant: "destructive",
      });
      return;
    }

    // Simulate login process
    setTimeout(() => {
      setIsLoading(false);
      
      // For demo purposes - implement proper authentication in production
      if (userId === "demo" && password === "password123") {
        // Success message
        toast({
          title: "Login successful",
          description: "Welcome back!",
        });
        
        // Reset login attempts on success
        setLoginAttempts(0);
        
        // In a real app, you would handle authentication here
        console.log("Login successful for:", { userId });
        
        // Redirect to dashboard
        navigate("/dashboard");
      } else {
        // Increment failed login attempts
        const newAttempts = loginAttempts + 1;
        setLoginAttempts(newAttempts);
        
        // Lock account after 5 failed attempts
        if (newAttempts >= 5) {
          setIsLocked(true);
          
          // Automatically unlock after 15 minutes (in real app this would be longer)
          setTimeout(() => {
            setIsLocked(false);
            setLoginAttempts(0);
          }, 15 * 60 * 1000);
          
          toast({
            title: "Account temporarily locked",
            description: "Too many failed login attempts. Please try again in 15 minutes.",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Login failed",
            description: "Invalid user ID or password. Please try again.",
            variant: "destructive",
          });
        }
      }
    }, 1500);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Card className="w-full max-w-md mx-auto shadow-xl fade-in">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">Secure Login</CardTitle>
        <CardDescription className="text-center">
          Enter your credentials to sign in to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2 fade-in delay-100">
            <Label htmlFor="userId">User ID</Label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                <User size={18} />
              </div>
              <Input
                id="userId"
                placeholder="Enter your user ID"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                className="pl-10"
                autoComplete="username"
                disabled={isLocked}
              />
            </div>
          </div>
          
          <div className="space-y-2 fade-in delay-200">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                <Lock size={18} />
              </div>
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 pr-10"
                autoComplete="current-password"
                disabled={isLocked}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                onClick={toggleShowPassword}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
          
          <Button 
            type="submit" 
            className="w-full fade-in delay-300" 
            disabled={isLoading || isLocked}
          >
            {isLoading ? "Signing in..." : isLocked ? "Account Locked" : "Sign In"}
          </Button>
          
          {isLocked && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-md flex items-center text-sm text-red-700 mt-2">
              <AlertCircle size={16} className="mr-2 flex-shrink-0" />
              <span>Account temporarily locked due to too many failed attempts. Please try again later.</span>
            </div>
          )}
          
          <div className="text-sm text-gray-500 mt-4">
            <p className="flex items-center">
              <CheckCircle2 size={14} className="mr-1 text-green-600" />
              <span>Password must be at least 8 characters</span>
            </p>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
