import FieldSkeleton from "@components/shared/FieldSkeleton";
import { FieldPropType } from "@customTypes/formProp.type";

export default function SingleLineInput({
  field,
  onEditClick,
  onDeleteClick,
  onInputChange,
}: FieldPropType) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onInputChange(e.target.value);
  };

  return (
    <FieldSkeleton
      label={field.label}
      isRequired={field.isRequired}
      iconClassName="mt-6"
      onEditClick={onEditClick}
      onDeleteClick={onDeleteClick}
    >
      <input
        className="w-full rounded border border-gray-300 px-2 py-2 text-sm outline-none"
        value={field.inputValue}
        onChange={handleInputChange}
      />
    </FieldSkeleton>
  );
}
