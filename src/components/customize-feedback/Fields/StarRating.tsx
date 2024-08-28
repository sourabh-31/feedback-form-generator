import { useState } from "react";
import { Star } from "lucide-react";
import FieldSkeleton from "@components/shared/FieldSkeleton";
import { FieldPropType } from "@customTypes/formProp.type";

export default function StarRating({
  field,
  onEditClick,
  onDeleteClick,
  onInputChange,
}: FieldPropType) {
  const [rating, setRating] = useState(0);
  const totalStars = 5;

  const handleRating = (value: number) => {
    setRating(value);
    onInputChange(String(value));
  };

  return (
    <FieldSkeleton
      label={field.label}
      isRequired={field.isRequired}
      onEditClick={onEditClick}
      onDeleteClick={onDeleteClick}
    >
      <div className="flex items-center space-x-2">
        {[...Array(totalStars)].map((_, index) => {
          const starValue = index + 1;
          return (
            <Star
              key={starValue}
              className={`size-8 cursor-pointer ${
                starValue <= rating
                  ? "fill-yellow-400 stroke-yellow-400"
                  : "fill-none stroke-gray-300"
              } transition-colors duration-200 ease-in-out hover:stroke-yellow-400`}
              onClick={() => handleRating(starValue)}
            />
          );
        })}
      </div>
    </FieldSkeleton>
  );
}
