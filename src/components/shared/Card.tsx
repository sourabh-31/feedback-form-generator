import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

// Card Overview
export default function Card({ children, className }: CardProps) {
  return (
    <div className={`rounded-lg border border-gray-200 shadow ${className}`}>
      {children}
    </div>
  );
}

// Card Header
function Header({ children, className }: CardProps) {
  return (
    <div className={`font-kanit rounded-t-md text-xl ${className}`}>
      {children}
    </div>
  );
}

// Card Body
function Body({ children, className }: CardProps) {
  return <div className={`rounded-b-lg ${className}`}>{children}</div>;
}

Card.Header = Header;
Card.Body = Body;
