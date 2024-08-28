import FieldSkeleton from "@components/shared/FieldSkeleton";
import { FieldPropType } from "@customTypes/formProp.type";

export default function RadioButton({
  field,
  onEditClick,
  onDeleteClick,
  onInputChange,
}: FieldPropType) {
  return (
    <FieldSkeleton
      label={field.label}
      isRequired={field.isRequired}
      onEditClick={onEditClick}
      onDeleteClick={onDeleteClick}
    >
      <div className="space-y-2">
        {field?.options?.map((option, index) => (
          <label
            key={index}
            className="flex cursor-pointer items-center space-x-2"
          >
            <input
              type="radio"
              name="suggestion"
              value={option}
              onChange={(e) => onInputChange(e.target.value)}
              className="size-4 cursor-pointer text-blue-600"
            />
            <span>{option}</span>
          </label>
        ))}
      </div>
    </FieldSkeleton>
  );
}
