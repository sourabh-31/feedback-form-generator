import { ReactNode } from "react";

interface SidebarProps {
  children: ReactNode;
}

export default function Sidebar({ children }: SidebarProps) {
  return (
    <aside className="min-h-[94vh] w-[24rem] border-l border-t border-gray-200 bg-white p-4">
      {children}
    </aside>
  );
}
