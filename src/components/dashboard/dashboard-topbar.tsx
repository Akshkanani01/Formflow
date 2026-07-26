"use client";


import {
  useState,
  useTransition,
} from "react";


import {
  ChevronDown,
  LogOut,
} from "lucide-react";


import {
  authClient,
} from "@/lib/auth-client";


import GlobalSearch from "@/components/dashboard/global-search";





type DashboardTopbarProps = {

  user: {

    email:string;

  };

};







export default function DashboardTopbar({

  user,

}:DashboardTopbarProps){



  const [open,setOpen] =

    useState(false);



  const [pending,startTransition] =

    useTransition();







  function handleLogout(){


    startTransition(async()=>{


      await authClient.signOut({

        fetchOptions:{

          onSuccess:()=>{

            window.location.href="/";

          },

        },

      });


    });


  }







  return (

    <header

      className="
        sticky
        top-0
        z-40
        rounded-[32px]
        border
        border-border
        bg-card/80
        px-8
        py-5
        backdrop-blur-xl
      "

    >



      <div

        className="
          flex
          flex-col
          gap-5
          lg:flex-row
          lg:items-center
          lg:justify-between
        "

      >





        {/* Global Search */}

        <GlobalSearch />








        {/* User Dropdown */}

        <div

          className="
            relative
          "

        >

          <button

            onClick={()=>setOpen(

              (value)=>!value

            )}

            className="
              flex
              items-center
              gap-3
              rounded-2xl
              border
              border-border
              bg-background
              px-3
              py-2
              transition-colors
              hover:bg-accent
            "

          >



            <div

              className="
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-full
                bg-primary
                font-semibold
                text-primary-foreground
              "

            >

              {
                user.email
                .charAt(0)
                .toUpperCase()
              }


            </div>





            <div

              className="
                hidden
                text-left
                lg:block
              "

            >

              <p

                className="
                  max-w-[180px]
                  truncate
                  text-sm
                  font-semibold
                "

              >

                {user.email}


              </p>


            </div>





            <ChevronDown

              className="
                h-4
                w-4
                text-muted-foreground
              "

            />


          </button>








          {
            open && (

              <div

                className="
                  absolute
                  right-0
                  mt-3
                  w-64
                  overflow-hidden
                  rounded-2xl
                  border
                  border-border
                  bg-card
                  shadow-2xl
                "

              >



                <div

                  className="
                    border-b
                    border-border
                    p-4
                  "

                >

                  <p

                    className="
                      truncate
                      text-sm
                      font-semibold
                    "

                  >

                    {user.email}

                  </p>


                </div>






                <div

                  className="
                    p-2
                  "

                >


                  <button

                    onClick={handleLogout}

                    disabled={pending}

                    className="
                      flex
                      w-full
                      items-center
                      gap-3
                      rounded-xl
                      px-3
                      py-3
                      text-left
                      text-sm
                      text-red-500
                      transition-colors
                      hover:bg-accent
                      disabled:opacity-60
                    "

                  >

                    <LogOut

                      className="
                        h-4
                        w-4
                      "

                    />


                    {
                      pending
                      ? "Signing out..."
                      : "Logout"
                    }


                  </button>


                </div>



              </div>

            )
          }




        </div>




      </div>


    </header>

  );

}