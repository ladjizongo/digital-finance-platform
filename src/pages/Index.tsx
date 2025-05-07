
import GradientBackground from "@/components/GradientBackground";
import LoginForm from "@/components/LoginForm";

const Index = () => {
  return (
    <GradientBackground>
      <div className="container mx-auto py-10">
        <div className="flex flex-col items-center justify-center mb-8 fade-in">
          <h1 className="text-4xl font-bold text-center mb-2">
            <span className="text-indigo-600">Business Banking Platform</span>
          </h1>
          <p className="text-gray-600 text-center max-w-md">
            Sign in to access your dashboard and manage your account
          </p>
        </div>
        
        <LoginForm />
        
        <footer className="mt-16 text-center text-sm text-gray-500 fade-in">
          <p>© 2025 Business Banking Platform. All rights reserved.</p>
        </footer>
      </div>
    </GradientBackground>
  );
};

export default Index;
