import { LucideProps } from "lucide-react";

export type FieldAndLogicDataType = {
  id: number;
  fieldName: string;
  action: string;
  img: string;
};

export type CategoriesDataType = {
  id: number;
  label: string;
  value: string;
};

export type EmojiDataType = {
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
  color: string;
  hoverColor: string;
  feeling: string;
};

export type WindowNameType = "add-field" | "edit-field";
