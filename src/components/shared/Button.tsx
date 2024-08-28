import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export default function Button({ children, className, onClick }: ButtonProps) {
  return (
    <button
      className={`rounded px-5 py-2 font-kanit ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
