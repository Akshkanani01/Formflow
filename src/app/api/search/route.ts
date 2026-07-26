import {
  NextResponse,
} from "next/server";


import {
  prisma,
} from "@/lib/prisma";







export async function GET(

  request:Request

){



  try {



    const {
      searchParams,
    } = new URL(

      request.url

    );



    const query =

      searchParams

      .get("q")

      ?.trim();





    if(!query){

      return NextResponse.json({

        forms:[],

        templates:[],

      });

    }






    const forms =

      await prisma.form.findMany({

        where:{

          title:{

            contains:query,

            mode:"insensitive",

          },

        },


        take:5,


        select:{

          id:true,

          title:true,

          slug:true,

        },


      });








    const templates =

      await prisma.template.findMany({

        where:{

          title:{

            contains:query,

            mode:"insensitive",

          },

        },


        take:5,


        select:{

          id:true,

          title:true,

        },


      });







    return NextResponse.json({

      forms,

      templates,

    });





  } catch(error){



    console.error(

      "Search API Error:",

      error

    );



    return NextResponse.json(

      {

        error:

          "Search failed",

      },

      {

        status:500,

      }

    );


  }



}