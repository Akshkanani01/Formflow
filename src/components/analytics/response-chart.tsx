"use client";


import {

  LineChart,

  Line,

  XAxis,

  YAxis,

  CartesianGrid,

  Tooltip,

  ResponsiveContainer,

} from "recharts";





type ResponseChartProps = {

  data:{

    date:string;

    responses:number;

  }[];

};








export default function ResponseChart({

  data,

}:ResponseChartProps){



  return (

    <div

      className="
        h-[280px]
        w-full

        sm:h-[350px]
      "

    >


      <ResponsiveContainer

        width="100%"

        height="100%"

      >



        <LineChart

          data={data}

          margin={{

            top:20,

            right:10,

            left:-10,

            bottom:10,

          }}

        >



          <CartesianGrid

            strokeDasharray="3 3"

          />





          <XAxis

            dataKey="date"

            tickFormatter={(value)=>

              value.slice(5)

            }

            tick={{


              fontSize:12,


            }}


            interval="preserveStartEnd"

          />







          <YAxis

            allowDecimals={false}

            tick={{

              fontSize:12,

            }}

          />







          <Tooltip

            contentStyle={{

              borderRadius:"12px",

            }}

          />







          <Line

            type="monotone"

            dataKey="responses"

            strokeWidth={3}

            dot={{

              r:4,

            }}

            activeDot={{

              r:6,

            }}

          />





        </LineChart>



      </ResponsiveContainer>



    </div>

  );

}