export const FIELD_TYPES = [
  {
    type: "short-text",
    label: "Short Text",
    description:
      "Single line text input",
    placeholder:
      "Enter your answer",
  },

  {
    type: "paragraph",
    label: "Paragraph",
    description:
      "Long text response",
    placeholder:
      "Enter detailed response",
  },

  {
    type: "email",
    label: "Email",
    description:
      "Collect email address",
    placeholder:
      "example@email.com",
  },

  {
    type: "phone",
    label: "Phone",
    description:
      "Collect phone number",
    placeholder:
      "+91 98765 43210",
  },

  {
    type: "number",
    label: "Number",
    description:
      "Numeric value",
    placeholder:
      "Enter number",
  },

  {
    type: "date",
    label: "Date",
    description:
      "Date selector",
    placeholder:
      "",
  },

  {
    type: "dropdown",
    label: "Dropdown",
    description:
      "Select one option",
    placeholder:
      "Select option",
  },

  {
    type: "radio",
    label: "Multiple Choice",
    description:
      "Choose one option",
    placeholder:
      "",
  },

  {
    type: "checkbox",
    label: "Checkboxes",
    description:
      "Choose multiple options",
    placeholder:
      "",
  },

  {
    type: "rating",
    label: "Rating",
    description:
      "Star rating field",
    placeholder:
      "",
  },

  {
    type: "file",
    label: "File Upload",
    description:
      "Upload files",
    placeholder:
      "",
  },
] as const;


export type FieldType =
  (typeof FIELD_TYPES)[number]["type"];