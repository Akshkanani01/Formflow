"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";



type BulkPublishFormsInput = {

  formIds:string[];

};





export async function bulkPublishForms({

  formIds,

}:BulkPublishFormsInput){



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


      status:"PUBLISHED",


      publishedAt:new Date(),


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
          "PUBLISH",


        entityType:
          "FORM",


        entityId:
          form.id,


        description:
          `Published form: ${form.title}`,


      })),

  });








  return {

    success:true,

  };


}