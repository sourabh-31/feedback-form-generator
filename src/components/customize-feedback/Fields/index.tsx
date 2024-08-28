import Textarea from "./Textarea";
import NumericRating from "./NumericRating";
import StarRating from "./StarRating";
import SmileyRating from "./SmileyRating";
import SingleLineInput from "./SingleLineInput";
import RadioButton from "./RadioButton";
import Categories from "./Categories";
import { FieldPropType } from "@customTypes/formProp.type";

const FieldComponents = {
  textarea: Textarea,
  numericRating: NumericRating,
  starRating: StarRating,
  smileyRating: SmileyRating,
  singleLineInput: SingleLineInput,
  radioButton: RadioButton,
  categories: Categories,
};

export default function Field({
  field,
  onEditClick,
  onDeleteClick,
  onInputChange,
}: FieldPropType) {
  const FieldComponent = FieldComponents[field.type];
  return (
    <FieldComponent
      field={field}
      onEditClick={onEditClick}
      onDeleteClick={onDeleteClick}
      onInputChange={onInputChange}
    />
  );
}
