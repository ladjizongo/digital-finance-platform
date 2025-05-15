
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
    
    // Credit application information
    else if (lowerQuery.includes("credit application") || lowerQuery.includes("loan application")) {
      return "The Credit Application section allows you to apply for business financing. You can select from different application types such as overdraft, line of credit, term loan, equipment purchase, or CSBFL. You'll need to upload supporting documents for your application.";
    }
    
    // Forex information
    else if (lowerQuery.includes("forex") || lowerQuery.includes("foreign exchange") || lowerQuery.includes("currency exchange")) {
      return "Our Foreign Exchange section allows you to convert between currencies, view current exchange rates, and see your transaction history. You can access it from the main navigation menu.";
    }
    
    // User management information
    else if (lowerQuery.includes("user management") || lowerQuery.includes("manage users")) {
      return "In the Admin Portal, you can manage users, set their permissions, and configure approval limits for different transaction types. You can add new users, delete existing ones, and modify their access rights.";
    }
    
    // Business health information
    else if (lowerQuery.includes("business health") || lowerQuery.includes("financial health")) {
      return "The Business Health section provides metrics on your company's financial performance, cash flow forecasts, and overall health score. You can upload financial statements for detailed analysis.";
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

      case "credit application":
        return "The Credit Application section supports various application types including overdraft, line of credit, term loans, equipment financing, and CSBFL. You'll need to provide business documents such as financial statements and a business plan.";
        
      case "forex":
      case "foreign exchange":
        return "Our Foreign Exchange service allows you to convert between currencies at competitive rates. You can view current exchange rates, past transactions, and execute new conversions.";
        
      case "user management":
        return "The User Management section enables administrators to add, edit, and remove users from the system. You can assign roles (Admin, Manager, User) and set specific permissions for transaction types and approval limits.";
        
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
      lowerCommand.includes("who") ||
      lowerCommand.includes("explain") ||
      lowerCommand.includes("describe") ||
      lowerCommand.includes("information about") ||
      lowerCommand.includes("details on") ||
      lowerCommand.includes("help me with");
  }

  static getTopicFromQuery(query: string): string | null {
    const lowerQuery = query.toLowerCase();
    const infoTopics = [
      { keywords: ["transaction", "transfer", "payment", "wire", "eft"], topic: "transactions" },
      { keywords: ["audit", "login history", "security", "log"], topic: "audit" },
      { keywords: ["approval", "pending", "authorize", "approve"], topic: "approvals" },
      { keywords: ["report", "analytics", "summary", "stats"], topic: "reports" },
      { keywords: ["business health", "financial", "metrics", "score"], topic: "business health" },
      { keywords: ["admin", "portal", "settings", "configuration"], topic: "admin portal" },
      { keywords: ["credit", "loan", "financing", "application"], topic: "credit application" },
      { keywords: ["forex", "foreign exchange", "currency", "exchange rate"], topic: "forex" },
      { keywords: ["user", "permission", "role", "account access"], topic: "user management" }
    ];
    
    for (const {keywords, topic} of infoTopics) {
      if (keywords.some(keyword => lowerQuery.includes(keyword))) {
        return topic;
      }
    }
    
    return null;
  }

  static isNavigationRequest(command: string): boolean {
    const lowerCommand = command.toLowerCase();
    
    return lowerCommand.includes("go to") ||
      lowerCommand.includes("navigate to") ||
      lowerCommand.includes("take me to") ||
      lowerCommand.includes("show me the") ||
      lowerCommand.includes("open the") ||
      lowerCommand.includes("access the") ||
      (lowerCommand.includes("switch to") && !lowerCommand.includes("currency"));
  }

  static getNavigationDestination(command: string): {route: string, description: string} | null {
    const lowerCommand = command.toLowerCase();
    
    const navigationMap = [
      { 
        keywords: ["dashboard", "home", "main page", "overview"], 
        route: "/dashboard",
        description: "Taking you to the Dashboard..."
      },
      { 
        keywords: ["transaction", "payment", "transfer", "wire", "eft"], 
        route: "/transactions",
        description: "Taking you to the Transactions page..."
      },
      { 
        keywords: ["admin", "portal", "user management", "settings"], 
        route: "/admin",
        description: "Taking you to the Admin Portal..."
      },
      { 
        keywords: ["forex", "foreign exchange", "currency", "exchange rate"], 
        route: "/forex",
        description: "Taking you to the Foreign Exchange page..."
      },
      { 
        keywords: ["confirmation", "receipt", "payment confirmation"], 
        route: "/payment-confirmation",
        description: "Taking you to the Payment Confirmation page..."
      }
    ];
    
    for (const {keywords, route, description} of navigationMap) {
      if (keywords.some(keyword => lowerCommand.includes(keyword))) {
        return { route, description };
      }
    }
    
    return null;
  }
}
