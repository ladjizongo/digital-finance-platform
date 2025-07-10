
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Lock, CheckCircle2, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsLoading(true);
    
    // Input validation
    if (!userId || !password) {
      setIsLoading(false);
      toast({
        title: "Error",
        description: "Please enter both user ID and password.",
        variant: "destructive",
      });
      return;
    }

    // Enhanced validation
    if (userId.length < 3) {
      setIsLoading(false);
      toast({
        title: "Invalid User ID",
        description: "User ID must be at least 3 characters long.",
        variant: "destructive",
      });
      return;
    }

    if (password.length < 6) {
      setIsLoading(false);
      toast({
        title: "Invalid Password",
        description: "Password must be at least 6 characters long.",
        variant: "destructive",
      });
      return;
    }

    // Simulate login process with a short delay
    setTimeout(() => {
      setIsLoading(false);
      
      // For demo purposes - in production, this would validate against a secure backend
      const validCredentials = userId === "demo" && password === "demo123";
      
      if (validCredentials) {
        toast({
          title: "Login successful",
          description: "Welcome back!",
        });
        
        // Store session securely
        import("@/utils/security").then(({ setAuthSession }) => {
          setAuthSession({
            userId: userId,
            loginTime: new Date().toISOString(),
            sessionId: Math.random().toString(36).substring(7)
          });
        });
        
        // Redirect to dashboard
        navigate("/dashboard");
      } else {
        toast({
          title: "Login failed",
          description: "Invalid credentials. Use demo/demo123 for testing.",
          variant: "destructive",
        });
      }
      
    }, 1000);
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
            disabled={isLoading}
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </Button>
          
          <div className="text-sm text-gray-500 mt-4">
            <p className="flex items-center">
              <CheckCircle2 size={14} className="mr-1 text-green-600" />
              <span>Demo credentials: demo / demo123</span>
            </p>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
