import {
  ArrowUpRight,
  LucideIcon,
} from "lucide-react";


type StatsCardProps = {

  title:string;

  value:number | string;

  subtitle:string;

  icon:LucideIcon;

};





export default function StatsCard({

  title,

  value,

  subtitle,

  icon:Icon,

}:StatsCardProps){


  return (

    <div

      className="
        group
        relative
        overflow-hidden
        rounded-2xl
        border
        border-border/60
        bg-card
        transition-all
        duration-300

        hover:-translate-y-1
        hover:border-primary/40
        hover:shadow-2xl

        sm:rounded-3xl
      "

    >


      <div

        className="
          absolute
          inset-0
          bg-gradient-to-br
          from-primary/5
          via-transparent
          to-transparent
          opacity-0
          transition-opacity
          duration-300
          group-hover:opacity-100
        "

      />





      <div

        className="
          relative
          p-5

          sm:p-6
        "

      >





        <div

          className="
            flex
            items-start
            justify-between
            gap-3
          "

        >





          <div

            className="
              min-w-0
            "

          >

            <p

              className="
                truncate
                text-sm
                font-medium
                text-muted-foreground
              "

            >

              {title}

            </p>





            <h3

              className="
                mt-3
                text-3xl
                font-bold
                tracking-tight

                sm:text-4xl
              "

            >

              {value}

            </h3>





            <p

              className="
                mt-3
                text-sm
                text-muted-foreground
              "

            >

              {subtitle}

            </p>


          </div>









          <div

            className="
              shrink-0
              rounded-xl
              border
              border-border
              bg-background
              p-2.5
              transition-transform
              duration-300

              group-hover:scale-110

              sm:rounded-2xl
              sm:p-3
            "

          >

            <Icon

              className="
                h-5
                w-5

                sm:h-6
                sm:w-6
              "

            />


          </div>





        </div>








        <div

          className="
            mt-6
            flex
            items-center
            gap-2
            text-sm
            font-medium
            text-primary

            sm:mt-8
          "

        >

          View Details


          <ArrowUpRight

            className="
              h-4
              w-4
            "

          />


        </div>





      </div>


    </div>

  );

}