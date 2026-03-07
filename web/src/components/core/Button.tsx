import React from "react";
import { Loader2 } from "lucide-react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger" | "outline";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  isLoading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  isLoading = false,
  className = "",
  disabled,
  ...rest
}) => {
  const baseStyles =
    "inline-flex items-center justify-center font-bold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-[0.98]";

  const variantStyles: Record<ButtonVariant, string> = {
    primary:
      "bg-primary text-primary-foreground hover:opacity-90 shadow-lg shadow-primary/20 btn-pill",
    secondary:
      "bg-foreground/10 text-foreground hover:bg-foreground/20 btn-pill",
    outline:
      "bg-transparent border border-border text-foreground hover:border-primary hover:text-primary btn-pill",
    ghost:
      "bg-transparent text-foreground/60 hover:text-foreground hover:bg-foreground/5 btn-pill",
    danger:
      "bg-rose-500 text-white hover:bg-rose-600 shadow-lg shadow-rose-500/20 btn-pill",
  };

  const sizeStyles: Record<ButtonSize, string> = {
    sm: "px-4 py-1.5 text-[10px] uppercase tracking-widest",
    md: "px-6 py-2.5 text-sm",
    lg: "px-8 py-3.5 text-base",
  };

  const classes = [
    baseStyles,
    variantStyles[variant],
    sizeStyles[size],
    fullWidth ? "w-full" : "",
    className,
  ].join(" ");

  return (
    <button className={classes} disabled={disabled || isLoading} {...rest}>
      {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
      {children}
    </button>
  );
};

export default Button;
