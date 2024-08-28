import FieldSkeleton from "@components/shared/FieldSkeleton";
import { FieldPropType } from "@customTypes/formProp.type";
import { useState } from "react";

export default function NumericRating({
  field,
  onEditClick,
  onDeleteClick,
  onInputChange,
}: FieldPropType) {
  const [rating, setRating] = useState(0);
  const maxRating = 10;

  const handleRating = (value: number) => {
    setRating(value);
    onInputChange(String(value));
  };

  return (
    <FieldSkeleton
      label={field.label}
      isRequired={field.isRequired}
      iconClassName="mt-6"
      onEditClick={onEditClick}
      onDeleteClick={onDeleteClick}
    >
      <div className="flex space-x-1">
        {[...Array(maxRating)].map((_, index) => {
          const value = index + 1;
          return (
            <button
              key={value}
              className={`flex h-10 w-10 items-center justify-center rounded border border-gray-300 ${
                value <= rating
                  ? "bg-blue-500 text-white"
                  : "bg-white text-gray-700"
              } transition-colors duration-200 ease-in-out hover:bg-blue-100`}
              onClick={() => handleRating(value)}
            >
              {value}
            </button>
          );
        })}
      </div>
    </FieldSkeleton>
  );
}
