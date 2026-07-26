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

import Link from "next/link";


type ResponseForm = {
  id: string;
  title: string;
  _count?: {
    submissions: number;
  };
};


export default async function ResponsesPage(){



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

    return null;

  }








  const forms =

    await prisma.form.findMany({

      where:{

        workspaceId:
          workspace.workspaceId,

      },


      select:{

        id:true,

        title:true,

        _count:{

          select:{

            submissions:true,

          },

        },

      },


      orderBy:{

        updatedAt:"desc",

      },

    });








  return (

    <main
      className="
        space-y-8
        p-6
      "
    >



      <div>

        <h1
          className="
            text-3xl
            font-bold
          "
        >

          Responses

        </h1>



        <p
          className="
            mt-2
            text-muted-foreground
          "
        >

          View all responses from your forms.

        </p>


      </div>








      <div
        className="
          grid
          gap-5
          md:grid-cols-2
          xl:grid-cols-3
        "
      >



        {
          forms.map(

  (form: ResponseForm)=>(



              <Link

                key={
                  form.id
                }

                href={
                  `/dashboard/forms/${form.id}/responses`
                }

                className="
                  rounded-3xl
                  border
                  bg-background
                  p-6
                  transition
                  hover:shadow-lg
                "

              >


                <h2
                  className="
                    text-lg
                    font-semibold
                  "
                >

                  {form.title}

                </h2>




                <p
                  className="
                    mt-3
                    text-sm
                    text-muted-foreground
                  "
                >

                  {
                    form._count.submissions
                  }

                  {" "}

                  Responses

                </p>


              </Link>


            )

          )
        }



      </div>



    </main>

  );

}