import { useState } from "react";
import FieldSkeleton from "@components/shared/FieldSkeleton";
import { FieldPropType } from "@customTypes/formProp.type";

export default function Categories({
  field,
  onEditClick,
  onDeleteClick,
  onInputChange,
}: FieldPropType) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleSelect = (category: string) => {
    setSelectedCategory(category);
    onInputChange(category);
  };

  return (
    <FieldSkeleton
      label={field.label}
      isRequired={field.isRequired}
      iconClassName="mt-8"
      onEditClick={onEditClick}
      onDeleteClick={onDeleteClick}
    >
      <div className="grid grid-cols-3 gap-4">
        {field?.options?.map((category, index) => (
          <div
            key={index}
            className={`flex-1 cursor-pointer rounded-lg border p-2 text-center transition-colors duration-200 ease-in-out ${selectedCategory === category ? "border-blue-500 bg-blue-100" : "border-gray-300 bg-white"} ${selectedCategory !== category ? "hover:border-blue-400 hover:bg-blue-50" : ""}`}
            onClick={() => handleSelect(category)}
          >
            <div>{category}</div>
          </div>
        ))}
      </div>
    </FieldSkeleton>
  );
}
