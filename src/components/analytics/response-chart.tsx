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
        h-[350px]
        w-full
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

            right:20,

            left:0,

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

          />




          <YAxis

            allowDecimals={false}

          />





          <Tooltip />





          <Line

            type="monotone"

            dataKey="responses"

            strokeWidth={3}

            dot

          />



        </LineChart>


      </ResponsiveContainer>


    </div>

  );

}