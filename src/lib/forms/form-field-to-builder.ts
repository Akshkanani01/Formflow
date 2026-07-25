import {
  FormFieldType,
} from "@prisma/client";


export function mapFormFieldToBuilder(
  field: {
    id: string;

    type: FormFieldType;

    label: string;

    placeholder: string | null;

    helpText: string | null;

    required: boolean;
  }
) {

  return {
    id: field.id,

    type: mapDatabaseType(
      field.type
    ),

    label: field.label,

    description:
      field.helpText ?? "",

    placeholder:
      field.placeholder ?? "",

    required:
      field.required,
  };

}



function mapDatabaseType(
  type: FormFieldType
) {

  switch(type) {

    case FormFieldType.TEXT:
      return "short-text";


    case FormFieldType.TEXTAREA:
      return "paragraph";


    case FormFieldType.EMAIL:
      return "email";


    case FormFieldType.PHONE:
      return "phone";


    case FormFieldType.NUMBER:
      return "number";


    case FormFieldType.SELECT:
      return "dropdown";


    case FormFieldType.RADIO:
      return "radio";


    case FormFieldType.CHECKBOX:
      return "checkbox";


    case FormFieldType.DATE:
      return "date";


    case FormFieldType.RATING:
      return "rating";


    case FormFieldType.FILE:
      return "file";


    default:
      return "short-text";

  }

}