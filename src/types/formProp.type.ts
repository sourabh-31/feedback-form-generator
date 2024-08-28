export type FieldType =
  | "textarea"
  | "numericRating"
  | "starRating"
  | "smileyRating"
  | "singleLineInput"
  | "radioButton"
  | "categories";

export type FieldDataType = {
  id: string;
  type: FieldType;
  label: string;
  value: string[];
  inputValue: string;
  isRequired: boolean;
  errorMessage?: string;
  options?: string[];
  responses: [];
};

export type FormDataType = {
  formName: string;
  dateCreated: string;
  timeCreated: string;
  fieldData: FieldDataType[];
  viewCount: number;
  submitCount: number;
  isUrl: boolean;
  url: string;
  isSpecificDate: boolean;
  specificDate: string;
  isSpecificTime: boolean;
  specificTime: string;
  numFields: number;
  selectedField: string;
  isPublished: boolean;
  shakeUrlInput: boolean;
  submissions: string[];
};

export type FieldPropType = {
  field: FieldDataType;
  onEditClick: () => void;
  onDeleteClick: () => void;
  onInputChange: (value: string) => void;
};
