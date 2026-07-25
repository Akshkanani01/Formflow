export const FIELD_TYPES = [
  {
    type: "short-text",
    label: "Short Text",
  },

  {
    type: "paragraph",
    label: "Paragraph",
  },

  {
    type: "email",
    label: "Email",
  },

  {
    type: "phone",
    label: "Phone",
  },

  {
    type: "number",
    label: "Number",
  },

  {
    type: "date",
    label: "Date",
  },

  {
    type: "dropdown",
    label: "Dropdown",
  },

  {
    type: "radio",
    label: "Multiple Choice",
  },

  {
    type: "checkbox",
    label: "Checkboxes",
  },

  {
    type: "rating",
    label: "Rating",
  },

  {
    type: "file",
    label: "File Upload",
  },

] as const;


export type FieldType =
  (typeof FIELD_TYPES)[number]["type"];