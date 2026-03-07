"use client";
import { useFormStatus } from "react-dom";
import Button from "./Button";

interface SubmitButtonProps {
  title: string;
  className?: string;
  variant?: "primary" | "secondary" | "danger" | "outline";
}

export default function SubmitButton({
  title,
  className,
  variant = "primary",
}: SubmitButtonProps) {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      variant={variant}
      isLoading={pending}
      className={className}
    >
      {title}
    </Button>
  );
}
