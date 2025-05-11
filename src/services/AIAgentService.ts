
import { 
  approvedTransactions, 
  loginAudits, 
  declinedTransactions, 
  pendingTransactions 
} from "@/components/dashboard/reports/data";

export interface TransactionDetails {
  type: string;
  amount?: number;
  fromAccount?: string;
  toAccount?: string;
  recipient?: string;
  purpose?: string;
}

export class AIAgentService {
  static getInformationAbout(topic: string, query: string): string {
    const lowerQuery = query.toLowerCase();
    
    switch(topic) {
      case "transactions":
        if (lowerQuery.includes("approved") || lowerQuery.includes("completed")) {
          let response = `I found ${approvedTransactions.length} approved transactions. `;
          if (approvedTransactions.length > 0) {
            const recent = approvedTransactions[0];
            response += `The most recent one was a ${recent.type} transaction for $${recent.amount} on ${recent.date}.`;
          }
          return response;
        } else if (lowerQuery.includes("declined") || lowerQuery.includes("rejected")) {
          let response = `There are ${declinedTransactions.length} declined transactions. `;
          if (declinedTransactions.length > 0) {
            const reasons = [...new Set(declinedTransactions.map(tx => tx.reason))];
            response += `Common rejection reasons include: ${reasons.join(", ")}.`;
          }
          return response;
        } else if (lowerQuery.includes("pending")) {
          return `There are ${pendingTransactions.length} pending transactions awaiting approval.`;
        } else {
          const totalTx = approvedTransactions.length + declinedTransactions.length + pendingTransactions.length;
          return `There are ${totalTx} transactions in the system: ${approvedTransactions.length} approved, ${declinedTransactions.length} declined, and ${pendingTransactions.length} pending.`;
        }
        
      case "audit":
      case "login":
        const successfulLogins = loginAudits.filter(log => log.status === "success").length;
        const failedLogins = loginAudits.filter(log => log.status === "failed").length;
        return `There are ${loginAudits.length} login audit records. ${successfulLogins} successful logins and ${failedLogins} failed attempts.`;
        
      case "approvals":
        const pendingApprovalCount = pendingTransactions.reduce((acc, tx) => {
          return acc + (tx.requiredApprovers - tx.currentApprovers);
        }, 0);
        return `There are ${pendingTransactions.length} transactions requiring approval, with a total of ${pendingApprovalCount} pending approvals needed.`;
        
      case "reports":
        return "You can generate reports for approved transactions, declined transactions, pending approvals, and login audits from the Reports tab in the Dashboard.";
        
      case "business health":
        return "The Business Health tab provides financial metrics, cash flow analysis, and overall health score for your business. You can upload financial statements to get detailed insights.";
        
      case "admin":
      case "admin portal":
        return "The Admin Portal allows you to manage users, set approval limits, and configure system settings. You can access it from the navigation menu.";
        
      default:
        return "I can provide information about transactions, audit logs, approvals, reports, business health, and the admin portal. What would you like to know about?";
    }
  }

  static extractTransactionDetails(command: string, accounts: Array<{id: string; name: string; number: string; balance: number;}>): TransactionDetails | null {
    const lowerCommand = command.toLowerCase();
    
    // Try to extract transaction type
    let type = "";
    if (lowerCommand.includes("transfer")) type = "transfer";
    else if (lowerCommand.includes("wire")) type = "wire";
    else if (lowerCommand.includes("eft")) type = "eft";
    else if (lowerCommand.includes("bill") || lowerCommand.includes("pay bill")) type = "bill";
    else if (lowerCommand.includes("email") || lowerCommand.includes("e-transfer")) type = "email";
    else if (lowerCommand.includes("forex") || lowerCommand.includes("exchange")) type = "forex";
    else return null;
    
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
    
    return {
      type,
      amount,
      fromAccount,
    };
  }

  static isInformationRequest(command: string): boolean {
    const lowerCommand = command.toLowerCase();
    
    return lowerCommand.includes("?") || 
      lowerCommand.includes("tell me") || 
      lowerCommand.includes("show me") || 
      lowerCommand.includes("what") || 
      lowerCommand.includes("how") ||
      lowerCommand.includes("where") ||
      lowerCommand.includes("when") ||
      lowerCommand.includes("why") ||
      lowerCommand.includes("who");
  }

  static getTopicFromQuery(query: string): string | null {
    const lowerQuery = query.toLowerCase();
    const infoTopics = [
      { keywords: ["transaction", "transfer", "payment"], topic: "transactions" },
      { keywords: ["audit", "login history", "security"], topic: "audit" },
      { keywords: ["approval", "pending", "authorize"], topic: "approvals" },
      { keywords: ["report", "analytics", "summary"], topic: "reports" },
      { keywords: ["business health", "financial", "metrics"], topic: "business health" },
      { keywords: ["admin", "portal", "settings"], topic: "admin portal" }
    ];
    
    for (const {keywords, topic} of infoTopics) {
      if (keywords.some(keyword => lowerQuery.includes(keyword))) {
        return topic;
      }
    }
    
    return null;
  }
}
