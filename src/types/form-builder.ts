import { FieldType } from "@/lib/forms/field-types";

export type BuilderField = {
  id: string;
  type: FieldType;

  label: string;

  placeholder?: string;

  description?: string;

  required: boolean;

  options?: string[];
};