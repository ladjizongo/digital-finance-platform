
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, ArrowUp, ArrowDown } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface BusinessCreditScoreProps {
  score?: number;
}

export const BusinessCreditScore = ({ score: initialScore }: BusinessCreditScoreProps) => {
  const [score, setScore] = useState(initialScore || Math.floor(Math.random() * 80) + 15); // Random score between 15-95
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
        // Small random fluctuation (-2 to +3 points)
        const change = Math.floor(Math.random() * 6) - 2;
        const newScore = Math.max(10, Math.min(99, currentScore + change));
        localStorage.setItem("businessCreditScore", String(newScore));
        return newScore;
      });
    }, 24 * 60 * 60 * 1000); // Daily update (but will reset on refresh)
    
    return () => clearInterval(interval);
  }, []);
  
  // Determine score category
  const getScoreCategory = (value: number) => {
    if (value >= 80) return { label: "Excellent", color: "text-green-600" };
    if (value >= 65) return { label: "Good", color: "text-green-500" };
    if (value >= 50) return { label: "Fair", color: "text-yellow-500" };
    if (value >= 35) return { label: "Poor", color: "text-orange-500" };
    return { label: "Very Poor", color: "text-red-600" };
  };
  
  const { label, color } = getScoreCategory(score);
  
  // Calculate change from previous score
  const scoreDelta = previousScore ? score - previousScore : 0;

  // Determine progress bar color
  const getProgressColor = (value: number) => {
    if (value >= 80) return "bg-green-600";
    if (value >= 65) return "bg-green-500";
    if (value >= 50) return "bg-yellow-500";
    if (value >= 35) return "bg-orange-500";
    return "bg-red-600";
  };
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-bold">Business Credit Score</CardTitle>
        <Shield className="h-5 w-5 text-indigo-600" />
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center justify-center py-4">
          <div className="w-full mb-6">
            <div className="mb-2 flex items-center justify-between">
              <p className={`text-3xl font-bold ${color}`}>{score}%</p>
              <p className={`text-sm font-semibold ${color}`}>{label}</p>
            </div>
            <Progress 
              value={score} 
              className="h-3 w-full" 
              indicatorClassName={getProgressColor(score)}
            />
          </div>
          
          <div className="flex items-center mb-4">
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
          
          <div className="text-sm text-gray-600">
            <p>A business credit score is a numerical representation of your business's creditworthiness, 
            typically ranging from 0 to 99%. Higher scores indicate better creditworthiness and may 
            result in more favorable loan terms and interest rates.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
