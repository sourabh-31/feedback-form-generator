import { ReactNode } from "react";
import AppNav from "@components/shared/AppNav";

interface AppLayoutProps {
  children: ReactNode;
  className?: string;
}

export default function AppLayout({ children, className }: AppLayoutProps) {
  return (
    <section className="flex h-screen flex-col">
      {/* App Navbar */}
      <AppNav />

      {/* Main Content */}
      <main className={`flex-grow overflow-y-auto bg-[#f3f3f3] ${className}`}>
        {children}
      </main>
    </section>
  );
}
