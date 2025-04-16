
import { ReactNode } from "react";

interface GradientBackgroundProps {
  children: ReactNode;
}

const GradientBackground = ({ children }: GradientBackgroundProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-100 flex flex-col items-center justify-center p-4">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-100 opacity-80 z-0"></div>
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 left-20 w-64 h-64 bg-purple-200 rounded-full opacity-20 mix-blend-multiply blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-blue-200 rounded-full opacity-20 mix-blend-multiply blur-3xl animate-float" style={{ animationDelay: "2s" }}></div>
        <div className="absolute top-1/2 left-1/3 w-80 h-80 bg-indigo-200 rounded-full opacity-20 mix-blend-multiply blur-3xl animate-float" style={{ animationDelay: "3s" }}></div>
      </div>
      <div className="relative z-10 w-full">
        {children}
      </div>
    </div>
  );
};

export default GradientBackground;
