"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";



type BulkDeleteFormsInput = {

  formIds:string[];

};






export async function bulkDeleteForms({

  formIds,

}:BulkDeleteFormsInput){



  const session =

    await auth.api.getSession({

      headers: await headers(),

    });






  if(!session){

    redirect("/login");

  }







  if(
    !formIds.length
  ){

    return {

      success:false,

    };

  }









  const forms =

    await prisma.form.findMany({

      where:{

        id:{
          in:formIds,
        },

        workspace:{

          members:{

            some:{

              userId:
                session.user.id,

            },

          },

        },

      },


      select:{

        id:true,

        title:true,

        workspaceId:true,

      },

    });







  if(!forms.length){

    throw new Error(
      "No forms found."
    );

  }









  await prisma.$transaction(async(tx)=>{





    await tx.submissionAnswer.deleteMany({

      where:{

        submission:{

          formId:{

            in:forms.map(
              (form)=>form.id
            ),

          },

        },

      },

    });








    await tx.formSubmission.deleteMany({

      where:{

        formId:{

          in:forms.map(
            (form)=>form.id
          ),

        },

      },

    });








    await tx.formField.deleteMany({

      where:{

        formId:{

          in:forms.map(
            (form)=>form.id
          ),

        },

      },

    });








    await tx.form.deleteMany({

      where:{

        id:{

          in:forms.map(
            (form)=>form.id
          ),

        },

      },

    });









    await tx.auditLog.createMany({

      data:

        forms.map((form)=>({


          workspaceId:
            form.workspaceId,


          userId:
            session.user.id,


          action:
            "DELETE",


          entityType:
            "FORM",


          entityId:
            form.id,


          description:
            `Deleted form: ${form.title}`,


        })),

    });





  });







  return {

    success:true,

  };


}