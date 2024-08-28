import { FormDataType } from "@customTypes/formProp.type";
import { useSelector } from "react-redux";

export default function useSelectedField() {
  const fieldData = useSelector(
    (state: { formProp: FormDataType }) => state.formProp.fieldData,
  );

  const selectedFieldId = useSelector(
    (state: { formProp: FormDataType }) => state.formProp.selectedField,
  );

  const selectedField = fieldData.find((field) => field.id === selectedFieldId);

  return selectedField;
}
