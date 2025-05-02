import * as React from "react"

import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  sanitize?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, sanitize = true, ...props }, ref) => {
    // Handle change with sanitization if needed
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (sanitize && props.onChange && type === 'text') {
        // Basic XSS sanitization for text inputs
        const sanitizedValue = e.target.value.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
        
        // Create a new synthetic event with sanitized value
        const syntheticEvent = {
          ...e,
          target: {
            ...e.target,
            value: sanitizedValue
          }
        } as React.ChangeEvent<HTMLInputElement>;
        
        props.onChange(syntheticEvent);
        return;
      }
      
      // Otherwise proceed with normal change handling
      if (props.onChange) {
        props.onChange(e);
      }
    };
    
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        )}
        ref={ref}
        onChange={handleChange}
        // Add security-related attributes
        autoComplete={props.autoComplete || "off"}
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck={props.spellCheck || "false"}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
