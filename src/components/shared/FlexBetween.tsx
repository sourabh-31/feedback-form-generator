import { ReactNode } from "react";

interface FlexBetweenProps {
  children: ReactNode;
  className?: string;
}

export default function FlexBetween({ children, className }: FlexBetweenProps) {
  return (
    <div className={`flex justify-between items-center ${className}`}>
      {children}
    </div>
  );
}
