
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, ArrowUp, ArrowDown } from "lucide-react";

interface BusinessCreditScoreProps {
  score?: number;
}

export const BusinessCreditScore = ({ score: initialScore }: BusinessCreditScoreProps) => {
  const [score, setScore] = useState(initialScore || Math.floor(Math.random() * 200) + 600); // Random score between 600-800 if none provided
  const [previousScore, setPreviousScore] = useState<number | null>(null);
  
  useEffect(() => {
    // Load previous score from localStorage
    const prevScore = localStorage.getItem("businessCreditScore");
    if (prevScore) {
      setPreviousScore(Number(prevScore));
    }
    
    // Store current score for future comparison
    localStorage.setItem("businessCreditScore", String(score));
    
    // Simulate periodic score updates
    const interval = setInterval(() => {
      setScore(currentScore => {
        // Small random fluctuation (-3 to +5 points)
        const change = Math.floor(Math.random() * 9) - 3;
        const newScore = Math.max(580, Math.min(850, currentScore + change));
        localStorage.setItem("businessCreditScore", String(newScore));
        return newScore;
      });
    }, 24 * 60 * 60 * 1000); // Daily update (but will reset on refresh)
    
    return () => clearInterval(interval);
  }, []);
  
  // Determine score category
  const getScoreCategory = (value: number) => {
    if (value >= 750) return { label: "Excellent", color: "text-green-600" };
    if (value >= 700) return { label: "Good", color: "text-green-500" };
    if (value >= 650) return { label: "Fair", color: "text-yellow-500" };
    if (value >= 600) return { label: "Poor", color: "text-orange-500" };
    return { label: "Very Poor", color: "text-red-600" };
  };
  
  const { label, color } = getScoreCategory(score);
  
  // Calculate change from previous score
  const scoreDelta = previousScore ? score - previousScore : 0;
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-bold">Business Credit Score</CardTitle>
        <Shield className="h-5 w-5 text-indigo-600" />
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center justify-center py-4">
          <div className="relative">
            <svg className="w-32 h-32">
              <circle
                className="text-gray-200"
                strokeWidth="12"
                stroke="currentColor"
                fill="transparent"
                r="58"
                cx="64"
                cy="64"
              />
              <circle
                className={`${score >= 700 ? 'text-green-500' : score >= 650 ? 'text-yellow-500' : 'text-orange-500'}`}
                strokeWidth="12"
                strokeDasharray={360}
                strokeDashoffset={360 - ((score - 300) / 550) * 360}
                strokeLinecap="round"
                stroke="currentColor"
                fill="transparent"
                r="58"
                cx="64"
                cy="64"
                transform="rotate(-90 64 64)"
              />
            </svg>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
              <p className="text-3xl font-bold">{score}</p>
              <p className={`text-sm font-medium ${color}`}>{label}</p>
            </div>
          </div>
          
          <div className="flex items-center mt-4">
            {scoreDelta > 0 ? (
              <>
                <ArrowUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-green-500 text-sm">+{scoreDelta} points since last check</span>
              </>
            ) : scoreDelta < 0 ? (
              <>
                <ArrowDown className="h-4 w-4 text-red-500 mr-1" />
                <span className="text-red-500 text-sm">{scoreDelta} points since last check</span>
              </>
            ) : (
              <span className="text-gray-500 text-sm">No change since last check</span>
            )}
          </div>
          
          <div className="mt-6 text-sm text-gray-600">
            <p>A business credit score is a numerical representation of your business's creditworthiness, 
            typically ranging from 300 to 850. Higher scores indicate better creditworthiness and may 
            result in more favorable loan terms and interest rates.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
