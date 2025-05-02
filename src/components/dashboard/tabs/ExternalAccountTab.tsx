
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import BankLogos from "@/components/dashboard/BankLogos";

const ExternalAccountTab = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Link External Account</CardTitle>
        <CardDescription>Connect your account from another bank</CardDescription>
      </CardHeader>
      <CardContent>
        <BankLogos />
      </CardContent>
    </Card>
  );
};

export default ExternalAccountTab;
