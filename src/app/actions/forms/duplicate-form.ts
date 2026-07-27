"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";



type DuplicateFormInput = {

  formId:string;

};







export async function duplicateForm({

  formId,

}:DuplicateFormInput){



  const session =

    await auth.api.getSession({

      headers: await headers(),

    });





  if(!session){

    redirect("/login");

  }








  const form =

    await prisma.form.findFirst({

      where:{

        id:formId,


        workspace:{

          members:{

            some:{

              userId:
                session.user.id,

            },

          },

        },

      },


      include:{

        fields:{

          orderBy:{

            position:"asc",

          },

        },

      },

    });








  if(!form){

    throw new Error(

      "Form not found."

    );

  }









  const duplicated =

    await prisma.$transaction(async(tx)=>{





      const newForm =

        await tx.form.create({

          data:{


            title:
              `${form.title} Copy`,



            description:
              form.description,



            slug:
  `${form.slug ?? form.title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")}-copy-${Date.now()}`,



            status:
              "DRAFT",



            workspaceId:
              form.workspaceId,



            createdById:
              session.user.id,



            updatedById:
              session.user.id,



          },

        });










      if(form.fields.length > 0){



        await tx.formField.createMany({

          data:

            form.fields.map((field)=>({



              formId:
                newForm.id,



              type:
                field.type,



              label:
                field.label,



              placeholder:
                field.placeholder,



              required:
                field.required,



              position:
                field.position,



              settings:

                field.settings === null

                  ? {}

                  : field.settings,


            })),

        });


      }









      await tx.auditLog.create({

        data:{


          workspaceId:
            form.workspaceId,


          userId:
            session.user.id,


          action:
            "CREATE",


          entityType:
            "FORM",


          entityId:
            newForm.id,


          description:
            `Duplicated form: ${form.title}`,


        },

      });








      return newForm;



    });









  return {


    success:true,


    formId:
      duplicated.id,


  };


}