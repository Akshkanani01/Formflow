"use server";

import {
  headers,
} from "next/headers";

import {
  redirect,
} from "next/navigation";

import {
  auth,
} from "@/lib/auth";

import {
  prisma,
} from "@/lib/prisma";






export async function getAnalytics(){





  const session =

    await auth.api.getSession({

      headers:
        await headers(),

    });






  if(!session){

    redirect("/login");

  }







  const workspace =

    await prisma.workspaceMember.findFirst({

      where:{

        userId:

          session.user.id,

      },


      select:{

        workspaceId:true,

      },

    });








  if(!workspace){

    throw new Error(

      "Workspace not found"

    );

  }









  const workspaceId =

    workspace.workspaceId;











  const totalForms =

    await prisma.form.count({

      where:{

        workspaceId,

      },

    });









  const publishedForms =

    await prisma.form.count({

      where:{

        workspaceId,

        status:"PUBLISHED",

      },

    });









  const totalResponses =

    await prisma.formSubmission.count({

      where:{

        form:{

          workspaceId,

        },

      },

    });









  const totalViews =

    await prisma.formView.count({

      where:{

        form:{

          workspaceId,

        },

      },

    });









  const thirtyDaysAgo =

    new Date();



  thirtyDaysAgo.setDate(

    thirtyDaysAgo.getDate() - 30

  );









  const recentSubmissions =

    await prisma.formSubmission.findMany({

      where:{

        form:{

          workspaceId,

        },


        submittedAt:{

          gte:thirtyDaysAgo,

        },

      },


      select:{

        submittedAt:true,

      },


      orderBy:{

        submittedAt:"asc",

      },

    });









  const responseTrend =

    Array.from(

      {

        length:30,

      },

      (_,index)=>{


        const date =

          new Date();



        date.setDate(

          date.getDate() - (29-index)

        );




        const key =

          date

            .toISOString()

            .split("T")[0];






        const count =

          recentSubmissions.filter(

            (item)=>


              item.submittedAt

                .toISOString()

                .split("T")[0] === key

          ).length;







        return {

          date:key,

          responses:count,

        };


      }

    );









  const forms =

    await prisma.form.findMany({

      where:{

        workspaceId,

      },


      select:{

        id:true,

        title:true,

      },


      orderBy:{

        createdAt:"desc",

      },

    });









  const formPerformance =

    await Promise.all(

      forms.map(

        async(form)=>{



          const responses =

            await prisma.formSubmission.count({

              where:{

                formId:

                  form.id,

              },

            });







          const views =

            await prisma.formView.count({

              where:{

                formId:

                  form.id,

              },

            });







          return {


            id:

              form.id,


            title:

              form.title,


            views,


            responses,



            conversion:

              views

                ? Math.round(

                    (

                      responses /

                      views

                    ) * 100

                  )

                : 0,


          };


        }

      )

    );









  const topForms =

    [...formPerformance]

      .sort(

        (a,b)=>

          b.responses -

          a.responses

      )

      .slice(

        0,

        5

      );









  return {


    stats:{

      totalForms,

      publishedForms,

      totalResponses,

      totalViews,

    },


    responseTrend,


    topForms,


    formPerformance,


  };


}