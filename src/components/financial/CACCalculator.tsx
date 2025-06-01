
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calculator, TrendingUp, DollarSign, Users } from "lucide-react";
import { toast } from "sonner";

interface CACResult {
  cac: number;
  quality: string;
  recommendations: string[];
}

export const CACCalculator = () => {
  const [adSpend, setAdSpend] = useState<string>("");
  const [salesSalaries, setSalesSalaries] = useState<string>("");
  const [marketingSalaries, setMarketingSalaries] = useState<string>("");
  const [softwareTools, setSoftwareTools] = useState<string>("");
  const [contentProduction, setContentProduction] = useState<string>("");
  const [eventsWebinars, setEventsWebinars] = useState<string>("");
  const [otherCosts, setOtherCosts] = useState<string>("");
  const [newCustomers, setNewCustomers] = useState<string>("");
  const [result, setResult] = useState<CACResult | null>(null);

  const calculateCAC = () => {
    const totalCosts = 
      (parseFloat(adSpend) || 0) +
      (parseFloat(salesSalaries) || 0) +
      (parseFloat(marketingSalaries) || 0) +
      (parseFloat(softwareTools) || 0) +
      (parseFloat(contentProduction) || 0) +
      (parseFloat(eventsWebinars) || 0) +
      (parseFloat(otherCosts) || 0);

    const customers = parseFloat(newCustomers) || 0;

    if (customers === 0) {
      toast.error("Please enter the number of new customers acquired");
      return;
    }

    const cac = totalCosts / customers;
    
    let quality = "Good";
    let recommendations: string[] = [];

    // CAC quality assessment (industry averages)
    if (cac > 500) {
      quality = "High - Needs Attention";
      recommendations.push("Consider optimizing ad targeting to reduce acquisition costs");
      recommendations.push("Review and optimize your sales funnel conversion rates");
      recommendations.push("Focus on referral programs to leverage word-of-mouth marketing");
    } else if (cac > 200) {
      quality = "Moderate - Room for Improvement";
      recommendations.push("Test different marketing channels to find more cost-effective options");
      recommendations.push("Improve your content marketing to attract organic leads");
    } else {
      quality = "Excellent - Well Optimized";
      recommendations.push("Maintain current acquisition strategies");
      recommendations.push("Consider scaling successful campaigns");
    }

    setResult({ cac, quality, recommendations });
    toast.success("CAC calculated successfully!");
  };

  const resetForm = () => {
    setAdSpend("");
    setSalesSalaries("");
    setMarketingSalaries("");
    setSoftwareTools("");
    setContentProduction("");
    setEventsWebinars("");
    setOtherCosts("");
    setNewCustomers("");
    setResult(null);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5 text-blue-600" />
          Customer Acquisition Cost (CAC) Calculator
        </CardTitle>
        <CardDescription>
          Calculate your CAC by dividing total sales & marketing costs by new customers acquired
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Sales & Marketing Costs</h3>
              
              <div>
                <Label htmlFor="adSpend">Ad Spend (Google, Social, Print, etc.)</Label>
                <Input
                  id="adSpend"
                  type="number"
                  placeholder="0"
                  value={adSpend}
                  onChange={(e) => setAdSpend(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="salesSalaries">Sales Staff Salaries</Label>
                <Input
                  id="salesSalaries"
                  type="number"
                  placeholder="0"
                  value={salesSalaries}
                  onChange={(e) => setSalesSalaries(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="marketingSalaries">Marketing Staff Salaries</Label>
                <Input
                  id="marketingSalaries"
                  type="number"
                  placeholder="0"
                  value={marketingSalaries}
                  onChange={(e) => setMarketingSalaries(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="softwareTools">Software/Tools (HubSpot, Mailchimp, etc.)</Label>
                <Input
                  id="softwareTools"
                  type="number"
                  placeholder="0"
                  value={softwareTools}
                  onChange={(e) => setSoftwareTools(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="contentProduction">Content Production (Video, Design, etc.)</Label>
                <Input
                  id="contentProduction"
                  type="number"
                  placeholder="0"
                  value={contentProduction}
                  onChange={(e) => setContentProduction(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="eventsWebinars">Events, Webinars, etc.</Label>
                <Input
                  id="eventsWebinars"
                  type="number"
                  placeholder="0"
                  value={eventsWebinars}
                  onChange={(e) => setEventsWebinars(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="otherCosts">Other Marketing Costs</Label>
                <Input
                  id="otherCosts"
                  type="number"
                  placeholder="0"
                  value={otherCosts}
                  onChange={(e) => setOtherCosts(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Customer Data</h3>
              
              <div>
                <Label htmlFor="newCustomers">Number of New Customers Acquired</Label>
                <Input
                  id="newCustomers"
                  type="number"
                  placeholder="0"
                  value={newCustomers}
                  onChange={(e) => setNewCustomers(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Button onClick={calculateCAC} className="w-full">
                  Calculate CAC
                </Button>
                <Button onClick={resetForm} variant="outline" className="w-full">
                  Reset Form
                </Button>
              </div>

              {result && (
                <Card className="bg-blue-50 border-blue-200">
                  <CardContent className="pt-4">
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-5 w-5 text-blue-600" />
                        <span className="text-2xl font-bold text-blue-800">
                          ${result.cac.toFixed(2)}
                        </span>
                        <span className="text-sm text-gray-600">per customer</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-green-600" />
                        <span className="font-medium">Quality: {result.quality}</span>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2">Recommendations:</h4>
                        <ul className="text-sm space-y-1">
                          {result.recommendations.map((rec, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <span className="text-blue-600">•</span>
                              <span>{rec}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
