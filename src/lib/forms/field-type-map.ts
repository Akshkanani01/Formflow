import { FormFieldType } from "@prisma/client";


export function mapFieldType(
  type: string
): FormFieldType {

  switch (type) {

    case "short-text":
      return FormFieldType.TEXT;


    case "paragraph":
      return FormFieldType.TEXTAREA;


    case "email":
      return FormFieldType.EMAIL;


    case "phone":
      return FormFieldType.PHONE;


    case "number":
      return FormFieldType.NUMBER;


    case "date":
      return FormFieldType.DATE;


    case "dropdown":
      return FormFieldType.SELECT;


    case "radio":
      return FormFieldType.RADIO;


    case "checkbox":
      return FormFieldType.CHECKBOX;


    case "rating":
      return FormFieldType.RATING;


    case "file":
      return FormFieldType.FILE;


    default:
      return FormFieldType.TEXT;
  }
}