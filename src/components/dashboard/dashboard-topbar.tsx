"use client";

import {
  useState,
  useTransition,
} from "react";

import {
  ChevronDown,
  LogOut,
  Menu,
} from "lucide-react";

import {
  authClient,
} from "@/lib/auth-client";

import GlobalSearch from "@/components/dashboard/global-search";


type DashboardTopbarProps = {

  user: {

    email: string;

  };

  onMenuClick?: () => void;

};



export default function DashboardTopbar({

  user,

  onMenuClick,

}: DashboardTopbarProps) {


  const [open, setOpen] =
    useState(false);


  const [pending, startTransition] =
    useTransition();



  function handleLogout() {


    startTransition(async()=>{


      await authClient.signOut({

        fetchOptions: {

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
        rounded-2xl
        sm:rounded-[32px]
        border
        border-border
        bg-card/80
        px-4
        py-4
        sm:px-8
        sm:py-5
        backdrop-blur-xl
      "

    >


      <div

        className="
          flex
          items-center
          justify-between
          gap-4
        "

      >



        {/* Mobile Menu Button */}

        <button

          onClick={onMenuClick}

          className="
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-xl
            border
            border-border
            bg-background
            lg:hidden
          "

        >

          <Menu

            className="
              h-5
              w-5
            "

          />

        </button>





        {/* Search */}

        <div

          className="
            flex-1
            min-w-0
          "

        >

          <GlobalSearch />

        </div>






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
              gap-2
              rounded-2xl
              border
              border-border
              bg-background
              px-2
              py-2
              sm:px-3
            "

          >


            <div

              className="
                flex
                h-10
                w-10
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
                hidden
                h-4
                w-4
                text-muted-foreground
                sm:block
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