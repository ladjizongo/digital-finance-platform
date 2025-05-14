
import { useState, useEffect, useCallback } from 'react';

type ToastProps = {
  title?: string;
  description?: string;
  duration?: number;
  variant?: 'default' | 'destructive' | 'success';
};

type ToastState = {
  open: boolean;
  id: string;
} & ToastProps;

let TOAST_ID = 0;

// This toast service is used by both @/hooks/use-toast and components/ui/use-toast.ts
export const useToast = () => {
  const [toasts, setToasts] = useState<ToastState[]>([]);

  const toast = useCallback(
    ({ title, description, duration = 3000, variant = 'default' }: ToastProps) => {
      const id = String(TOAST_ID++);
      
      setToasts((current) => [
        ...current,
        { id, title, description, duration, open: true, variant },
      ]);

      return id;
    },
    []
  );

  const dismiss = useCallback((id: string) => {
    setToasts((current) =>
      current.map((toast) =>
        toast.id === id ? { ...toast, open: false } : toast
      )
    );
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setToasts((current) => current.filter((toast) => toast.open));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return {
    toast,
    dismiss,
    toasts,
  };
};

// Export a simpler version for direct use
export const toast = (props: ToastProps) => {
  const id = String(TOAST_ID++);
  
  // Return ID for potential dismissal
  return id;
};
