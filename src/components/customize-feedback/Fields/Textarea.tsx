import FieldSkeleton from "@components/shared/FieldSkeleton";
import { FieldPropType } from "@customTypes/formProp.type";

export default function Textarea({
  field,
  onEditClick,
  onDeleteClick,
  onInputChange,
}: FieldPropType) {
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onInputChange(e.target.value);
  };

  return (
    <FieldSkeleton
      label={field.label}
      isRequired={field.isRequired}
      onEditClick={onEditClick}
      onDeleteClick={onDeleteClick}
    >
      <textarea
        className="h-24 w-full rounded border border-gray-300 px-2 py-1 text-sm outline-none"
        value={field.inputValue}
        onChange={handleInputChange}
      />
    </FieldSkeleton>
  );
}
