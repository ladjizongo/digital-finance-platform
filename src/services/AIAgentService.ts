
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
  // Platform information for common queries
  static getPlatformInfo(query: string): string {
    const lowerQuery = query.toLowerCase();
    
    // Dashboard information
    if (lowerQuery.includes("dashboard") || lowerQuery.includes("home screen")) {
      return "The Dashboard is your main hub where you can view account summaries, recent transactions, approvals needed, and business health metrics. You can access different sections through the tabs on the left side.";
    }
    
    // Transaction information
    else if (lowerQuery.includes("transaction types") || lowerQuery.includes("what transactions")) {
      return "We support various transaction types including: transfers between accounts, wire transfers, EFT (Electronic Fund Transfers), email transfers, bill payments, tax payments, and foreign exchange (forex) transactions.";
    }
    
    // Approval process
    else if (lowerQuery.includes("approval") && lowerQuery.includes("process")) {
      return "Transactions above certain thresholds require approvals. The number of approvers depends on the transaction amount. You can check pending approvals in the Approvals tab on the dashboard.";
    }
    
    // Admin features
    else if (lowerQuery.includes("admin") || lowerQuery.includes("administration")) {
      return "The Admin Portal allows administrators to manage users, set approval limits, configure system settings, and review audit logs. You can access it through the navigation menu.";
    }
    
    // Help with platform
    else if (lowerQuery.includes("help") || lowerQuery.includes("tutorial")) {
      return "I can help you navigate the platform, explain features, assist with transactions, and answer questions about your accounts or the system. What specific area would you like help with?";
    }
    
    return null;
  }

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
    else if (lowerCommand.includes("tax") || lowerCommand.includes("taxes")) type = "tax";
    else if (lowerCommand.includes("forex") || lowerCommand.includes("exchange") || lowerCommand.includes("currency")) type = "forex";
    else if (lowerCommand.includes("payment") || lowerCommand.includes("pay") || lowerCommand.includes("send money")) {
      // Default to transfer if generic payment terms are used
      type = "transfer";
    }
    else return null;
    
    // Extract amount using regex
    const amountRegex = /\$?(\d+(?:,\d{3})*(?:\.\d{1,2})?)|(\d+(?:,\d{3})*(?:\.\d{1,2})?) dollars?/;
    const amountMatch = lowerCommand.match(amountRegex);
    let amount = undefined;
    
    if (amountMatch) {
      // Remove commas and then parse the float
      const cleanAmount = amountMatch[1] || amountMatch[2];
      amount = parseFloat(cleanAmount.replace(/,/g, ''));
    }
    
    // Extract account information
    let fromAccount: string | undefined;
    let toAccount: string | undefined;
    
    // Look for source account
    for (const account of accounts) {
      const lowerAccountName = account.name.toLowerCase();
      const lowerAccountNumber = account.number.toLowerCase();
      
      if (lowerCommand.includes(`from ${lowerAccountName}`) || 
          lowerCommand.includes(`from my ${lowerAccountName}`) ||
          lowerCommand.includes(`using ${lowerAccountName}`) ||
          lowerCommand.includes(`using my ${lowerAccountName}`) ||
          lowerCommand.includes(lowerAccountNumber)) {
        fromAccount = account.id;
        break;
      }
    }
    
    // If no specific source account was mentioned, use the first account as default
    if (!fromAccount && accounts.length > 0) {
      fromAccount = accounts[0].id;
    }
    
    // Look for destination account for internal transfers
    if (type === "transfer") {
      for (const account of accounts) {
        const lowerAccountName = account.name.toLowerCase();
        
        if (lowerCommand.includes(`to ${lowerAccountName}`) || 
            lowerCommand.includes(`to my ${lowerAccountName}`)) {
          toAccount = account.id;
          break;
        }
      }
    }
    
    // Extract recipient information for external transfers
    let recipient: string | undefined;
    if (type !== "transfer" && !toAccount) {
      const recipientRegex = /to\s+([A-Za-z\s&]+)(?:\s|$)/i;
      const recipientMatch = lowerCommand.match(recipientRegex);
      
      if (recipientMatch && recipientMatch[1]) {
        recipient = recipientMatch[1].trim();
      }
    }
    
    // Extract purpose or note
    let purpose: string | undefined;
    const purposeRegex = /for\s+([A-Za-z\s&]+)(?:\s|$)/i;
    const purposeMatch = lowerCommand.match(purposeRegex);
    
    if (purposeMatch && purposeMatch[1]) {
      purpose = purposeMatch[1].trim();
    }
    
    // Only return a transaction if we have at least a type
    if (type) {
      return {
        type,
        amount,
        fromAccount,
        toAccount,
        recipient,
        purpose
      };
    }
    
    return null;
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
