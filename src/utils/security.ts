// Security utilities for the application

interface SessionData {
  userId: string;
  loginTime: string;
  sessionId: string;
}

// Simple encryption for demo purposes - use proper encryption in production
const ENCRYPTION_KEY = "demo-app-key-2024";

export const encryptData = (data: string): string => {
  try {
    // Simple XOR encryption for demo - use AES in production
    let encrypted = "";
    for (let i = 0; i < data.length; i++) {
      encrypted += String.fromCharCode(
        data.charCodeAt(i) ^ ENCRYPTION_KEY.charCodeAt(i % ENCRYPTION_KEY.length)
      );
    }
    return btoa(encrypted);
  } catch {
    return data; // Fallback to unencrypted
  }
};

export const decryptData = (encryptedData: string): string => {
  try {
    const encrypted = atob(encryptedData);
    let decrypted = "";
    for (let i = 0; i < encrypted.length; i++) {
      decrypted += String.fromCharCode(
        encrypted.charCodeAt(i) ^ ENCRYPTION_KEY.charCodeAt(i % ENCRYPTION_KEY.length)
      );
    }
    return decrypted;
  } catch {
    return encryptedData; // Fallback if decryption fails
  }
};

export const getAuthSession = (): SessionData | null => {
  try {
    const sessionData = sessionStorage.getItem("auth_session");
    if (!sessionData) return null;
    
    const decrypted = decryptData(sessionData);
    return JSON.parse(decrypted);
  } catch {
    return null;
  }
};

export const setAuthSession = (data: SessionData): void => {
  try {
    const encrypted = encryptData(JSON.stringify(data));
    sessionStorage.setItem("auth_session", encrypted);
  } catch {
    // Fallback to unencrypted storage
    sessionStorage.setItem("auth_session", JSON.stringify(data));
  }
};

export const clearAuthSession = (): void => {
  sessionStorage.removeItem("auth_session");
  localStorage.removeItem("financialMetrics");
  localStorage.removeItem("businessCreditScore");
  localStorage.removeItem("businessHealthScore_lastWeek");
  localStorage.removeItem("creditApplicationType");
  localStorage.removeItem("wireTemplates");
  localStorage.removeItem("eftTemplates");
};

export const isSessionValid = (): boolean => {
  const session = getAuthSession();
  if (!session) return false;
  
  // Check if session is not older than 24 hours
  const loginTime = new Date(session.loginTime);
  const now = new Date();
  const diffHours = (now.getTime() - loginTime.getTime()) / (1000 * 60 * 60);
  
  return diffHours < 24;
};

export const sanitizeInput = (input: string): string => {
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<[^>]*>?/gm, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=/gi, '')
    .trim();
};

export const validateFinancialAmount = (amount: string): { isValid: boolean; error?: string } => {
  const sanitized = sanitizeInput(amount);
  const numAmount = parseFloat(sanitized);
  
  if (isNaN(numAmount)) {
    return { isValid: false, error: "Amount must be a valid number" };
  }
  
  if (numAmount < 0) {
    return { isValid: false, error: "Amount cannot be negative" };
  }
  
  if (numAmount > 1000000) {
    return { isValid: false, error: "Amount exceeds maximum limit" };
  }
  
  return { isValid: true };
};

export const validateAccountNumber = (accountNumber: string): { isValid: boolean; error?: string } => {
  const sanitized = sanitizeInput(accountNumber);
  
  if (sanitized.length < 5 || sanitized.length > 20) {
    return { isValid: false, error: "Account number must be between 5 and 20 characters" };
  }
  
  if (!/^[a-zA-Z0-9-]+$/.test(sanitized)) {
    return { isValid: false, error: "Account number contains invalid characters" };
  }
  
  return { isValid: true };
};