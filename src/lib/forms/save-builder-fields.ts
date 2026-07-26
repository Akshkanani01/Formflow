type FormFieldInput = {

  id: string;

  type: string;

  label: string;

  placeholder: string | null;

  helpText: string | null;

  required: boolean;

};




export function mapFormFieldToBuilder(

  field: {

    id: string;

    type: unknown;

    label: string;

    placeholder: string | null;

    helpText: string | null;

    required: boolean;

  }

) {


  return {

    id:

      field.id,


    type:

      mapDatabaseType(

        String(field.type)

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

  type: string

) {


  switch(type) {


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


    case "PASSWORD":
      return "password";


    default:
      return "short-text";

  }

}