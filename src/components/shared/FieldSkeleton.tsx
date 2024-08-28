import { Pencil, Trash2 } from "lucide-react";
import { ReactNode } from "react";
import { useLocation } from "react-router-dom";

interface FieldSkeletonProps {
  label: string;
  isRequired?: boolean;
  children: ReactNode;
  iconClassName?: string;
  onEditClick: () => void;
  onDeleteClick: () => void;
}

export default function FieldSkeleton({
  label,
  isRequired,
  children,
  iconClassName = "mt-3",
  onEditClick,
  onDeleteClick,
}: FieldSkeletonProps) {
  const location = useLocation();
  const pathname = location.pathname;
  const isCustomize = pathname === "/customize";

  return (
    <div
      className={`flex flex-col justify-center rounded-md font-workSans ${isCustomize ? "cursor-grab border border-gray-300 p-4 shadow-md" : "mb-12"}`}
      draggable
    >
      <span className="font-medium text-gray-800">
        {label} {isRequired && "*"}
      </span>

      <div className="mt-3">{children}</div>

      {isCustomize && (
        <div className={`flex items-center justify-end gap-4 ${iconClassName}`}>
          <button onClick={onEditClick} className="p-2">
            <Pencil size={20} />
          </button>

          <button onClick={onDeleteClick} className="p-2">
            <Trash2 size={20} />
          </button>
        </div>
      )}
    </div>
  );
}
