"use client";


type FormPerformanceTableProps = {

  data:{

    id:string;

    title:string;

    views:number;

    responses:number;

    conversion:number;

  }[];

};





export default function FormPerformanceTable({

  data,

}:FormPerformanceTableProps){



  return (

    <div

      className="
        overflow-hidden
        rounded-2xl
        border
      "

    >

      <table

        className="
          w-full
          text-sm
        "

      >

        <thead>

          <tr

            className="
              border-b
              bg-muted/30
              text-left
            "

          >

            <th className="px-5 py-4">

              Form

            </th>


            <th className="px-5 py-4">

              Views

            </th>


            <th className="px-5 py-4">

              Responses

            </th>


            <th className="px-5 py-4">

              Conversion

            </th>


          </tr>

        </thead>





        <tbody>

          {
            data.map(

              (form)=>(

                <tr

                  key={
                    form.id
                  }

                  className="
                    border-b
                    last:border-0
                  "

                >

                  <td

                    className="
                      px-5
                      py-4
                      font-medium
                    "

                  >

                    {form.title}

                  </td>




                  <td

                    className="
                      px-5
                      py-4
                    "

                  >

                    {form.views}

                  </td>





                  <td

                    className="
                      px-5
                      py-4
                    "

                  >

                    {form.responses}

                  </td>





                  <td

                    className="
                      px-5
                      py-4
                      font-semibold
                    "

                  >

                    {form.conversion}%

                  </td>


                </tr>

              )

            )
          }


        </tbody>


      </table>


    </div>

  );

}