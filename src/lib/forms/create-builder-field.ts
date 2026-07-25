import { FieldType } from "@/lib/forms/field-types";

import { BuilderField } from "@/types/form-builder";

export function createBuilderField(
  type: FieldType
): BuilderField {
  switch (type) {
    case "short-text":
      return {
        id: crypto.randomUUID(),
        type,
        label: "Short Text",
        placeholder: "Enter your answer",
        required: false,
      };

    case "paragraph":
      return {
        id: crypto.randomUUID(),
        type,
        label: "Paragraph",
        placeholder: "Enter your answer",
        required: false,
      };

    case "email":
      return {
        id: crypto.randomUUID(),
        type,
        label: "Email",
        placeholder: "Enter your email",
        required: false,
      };

    case "phone":
      return {
        id: crypto.randomUUID(),
        type,
        label: "Phone",
        placeholder: "Enter phone number",
        required: false,
      };

    case "number":
      return {
        id: crypto.randomUUID(),
        type,
        label: "Number",
        placeholder: "Enter number",
        required: false,
      };

    default:
      return {
        id: crypto.randomUUID(),
        type,
        label: "New Field",
        required: false,
      };
  }
}