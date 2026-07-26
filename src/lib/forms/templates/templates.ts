export type FormTemplateField = {
  type: string;

  label: string;

  description?: string;

  placeholder?: string;

  required: boolean;

  settings?: {
    options?: string[];

    min?: number;

    max?: number;
  };
};




export type FormTemplate = {

  id: string;

  title: string;

  description: string;

  category: string;

  fields: FormTemplateField[];

};






export const formTemplates: FormTemplate[] = [



  {
    id: "customer-feedback",

    title: "Customer Feedback Form",

    description:
      "Collect customer reviews, ratings and suggestions.",

    category:
      "Business",

    fields: [

      {
        type:
          "short-text",

        label:
          "Customer Name",

        placeholder:
          "Enter your name",

        required:
          true,

      },


      {
        type:
          "email",

        label:
          "Email Address",

        placeholder:
          "example@email.com",

        required:
          true,

      },


      {
        type:
          "rating",

        label:
          "Overall Experience",

        required:
          true,

      },


      {
        type:
          "paragraph",

        label:
          "Your Feedback",

        placeholder:
          "Write your feedback",

        required:
          false,

      },

    ],

  },







  {
    id:
      "contact-form",

    title:
      "Contact Form",

    description:
      "Simple contact form for website visitors.",

    category:
      "Business",

    fields:[


      {
        type:
          "short-text",

        label:
          "Full Name",

        required:
          true,

      },


      {
        type:
          "email",

        label:
          "Email",

        required:
          true,

      },


      {
        type:
          "phone",

        label:
          "Phone Number",

        required:
          false,

      },


      {
        type:
          "paragraph",

        label:
          "Message",

        required:
          true,

      },


    ],

  },







  {
    id:
      "job-application",

    title:
      "Job Application Form",

    description:
      "Collect candidate applications.",

    category:
      "HR",

    fields:[


      {
        type:
          "short-text",

        label:
          "Full Name",

        required:
          true,

      },


      {
        type:
          "email",

        label:
          "Email",

        required:
          true,

      },


      {
        type:
          "phone",

        label:
          "Phone",

        required:
          false,

      },


      {
        type:
          "file",

        label:
          "Resume Upload",

        required:
          true,

      },


      {
        type:
          "paragraph",

        label:
          "Cover Letter",

        required:
          false,

      },


    ],

  },







  {
    id:
      "event-registration",

    title:
      "Event Registration",

    description:
      "Collect event attendee information.",

    category:
      "Events",

    fields:[


      {
        type:
          "short-text",

        label:
          "Name",

        required:
          true,

      },


      {
        type:
          "email",

        label:
          "Email",

        required:
          true,

      },


      {
        type:
          "dropdown",

        label:
          "Number of Guests",

        required:
          true,

        settings:{
          options:[
            "1",
            "2",
            "3",
            "4+",
          ],
        },

      },


      {
        type:
          "date",

        label:
          "Event Date",

        required:
          true,

      },


    ],

  },







  {
    id:
      "lead-capture",

    title:
      "Lead Capture Form",

    description:
      "Capture customer leads and enquiries.",

    category:
      "Marketing",

    fields:[


      {
        type:
          "short-text",

        label:
          "Name",

        required:
          true,

      },


      {
        type:
          "email",

        label:
          "Business Email",

        required:
          true,

      },


      {
        type:
          "dropdown",

        label:
          "Interested Service",

        required:
          true,

        settings:{
          options:[
            "Product Demo",
            "Pricing",
            "Support",
          ],
        },

      },


      {
        type:
          "paragraph",

        label:
          "Message",

        required:
          false,

      },


    ],

  },


];