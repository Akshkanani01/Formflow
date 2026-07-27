"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";



type RestoreFormInput = {

  formId:string;

};








export async function restoreForm({

  formId,

}:RestoreFormInput){



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


      select:{

        id:true,

        title:true,

        workspaceId:true,

      },

    });








  if(!form){

    throw new Error(

      "Form not found."

    );

  }









  await prisma.form.update({

    where:{

      id:form.id,

    },


    data:{

      status:"DRAFT",

      publishedAt:null,

    },

  });









  await prisma.auditLog.create({

    data:{

      workspaceId:
        form.workspaceId,


      userId:
        session.user.id,


      action:
        "UPDATE",


      entityType:
        "FORM",


      entityId:
        form.id,


      description:
        `Restored form: ${form.title}`,

    },

  });









  return {

    success:true,

  };


}