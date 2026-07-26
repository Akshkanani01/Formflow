import type {
  FormFieldType,
} from "@prisma/client";



type FormFieldInput = {

  id: string;

  type: FormFieldType;

  label: string;

  placeholder: string | null;

  helpText: string | null;

  required: boolean;

  settings?: unknown;

  createdAt?: Date;

  updatedAt?: Date;

  formId?: string;

  position?: number;

};







export function mapFormFieldToBuilder(

  field: FormFieldInput

) {


  return {

    id:

      field.id,


    type:

      mapDatabaseType(

        field.type

      ),


    label:

      field.label,


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


  switch (type) {



    case "TEXT":

      return "short-text";



    case "TEXTAREA":

      return "paragraph";



    case "EMAIL":

      return "email";



    case "PHONE":

      return "phone";



    case "NUMBER":

      return "number";



    case "DATE":

      return "date";



    case "SELECT":

      return "dropdown";



    case "RADIO":

      return "radio";



    case "CHECKBOX":

      return "checkbox";



    case "RATING":

      return "rating";



    case "FILE":

      return "file";



    case "URL":

      return "url";



    default:

      return "short-text";

  }

}