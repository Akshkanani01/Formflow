"use server";

import {
  prisma,
} from "@/lib/prisma";



export async function getAnalytics() {


  const totalForms =
    await prisma.form.count();




  const publishedForms =
    await prisma.form.count({

      where: {
        status: "PUBLISHED",
      },

    });




  const totalResponses =
    await prisma.formSubmission.count();




  const totalViews =
    await prisma.formView.count();






  const thirtyDaysAgo =
    new Date();


  thirtyDaysAgo.setDate(
    thirtyDaysAgo.getDate() - 30
  );






  const recentSubmissions =
    await prisma.formSubmission.findMany({

      where: {

        submittedAt: {

          gte: thirtyDaysAgo,

        },

      },


      select: {

        submittedAt: true,

      },


      orderBy: {

        submittedAt: "asc",

      },

    });







  const responseTrend =
    Array.from(

      {
        length: 30,
      },

      (_, index) => {


        const date =
          new Date();



        date.setDate(
          date.getDate() - (29 - index)
        );



        const key =
          date
            .toISOString()
            .split("T")[0];





        const count =
          recentSubmissions.filter(

            (item: {
              submittedAt: Date;
            }) =>

              item.submittedAt
                .toISOString()
                .split("T")[0] === key

          ).length;






        return {

          date: key,

          responses: count,

        };


      }

    );








  const forms =
    await prisma.form.findMany({

      select: {

        id: true,

        title: true,

      },


      orderBy: {

        createdAt: "desc",

      },

    });









  const formPerformance =
  await Promise.all(

    forms.map(

      async (form: {
        id: string;
        title: string;
      }) => {


          const responses =
            await prisma.formSubmission.count({

              where: {

                formId: form.id,

              },

            });






          const views =
            await prisma.formView.count({

              where: {

                formId: form.id,

              },

            });








          return {

            id: form.id,

            title: form.title,

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

        (a, b) =>

          b.responses - a.responses

      )

      .slice(

        0,

        5

      );







  return {

    stats: {

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