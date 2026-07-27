"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";



type BulkArchiveFormsInput = {

  formIds:string[];

};







export async function bulkArchiveForms({

  formIds,

}:BulkArchiveFormsInput){



  const session =

    await auth.api.getSession({

      headers: await headers(),

    });







  if(!session){

    redirect("/login");

  }








  if(!formIds.length){

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









  await prisma.form.updateMany({

    where:{

      id:{

        in:forms.map(

          (form)=>form.id

        ),

      },

    },


    data:{

      status:"ARCHIVED",

    },

  });









  await prisma.auditLog.createMany({

    data:

      forms.map((form)=>({



        workspaceId:

          form.workspaceId,



        userId:

          session.user.id,



        action:

          "ARCHIVE",



        entityType:

          "FORM",



        entityId:

          form.id,



        description:

          `Archived form: ${form.title}`,


      })),

  });









  return {

    success:true,

  };


}