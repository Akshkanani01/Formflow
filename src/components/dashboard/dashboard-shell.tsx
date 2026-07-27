"use client";

import {
  ReactNode,
  useState,
} from "react";

import {
  X,
} from "lucide-react";

import DashboardSidebar from "@/components/dashboard/dashboard-sidebar";
import DashboardTopbar from "@/components/dashboard/dashboard-topbar";


type DashboardShellProps = {
  children: ReactNode;

  notificationCount?: number;

  user: {
    name: string;
    email: string;
  };
};



export default function DashboardShell({

  children,

  notificationCount = 0,

  user,

}: DashboardShellProps) {


  const [mobileMenuOpen, setMobileMenuOpen] =
    useState(false);



  return (

    <main
      className="
        min-h-screen
        overflow-x-hidden
        bg-background
      "
    >


      <div
        className="
          mx-auto
          max-w-[1800px]
          p-4
          sm:p-6
        "
      >


        <div
          className="
            grid
            gap-4
            lg:gap-6
            lg:grid-cols-[280px_minmax(0,1fr)]
          "
        >



          {/* Desktop Sidebar */}

          <aside
            className="
              hidden
              lg:block
            "
          >

            <DashboardSidebar />

          </aside>






          {/* Mobile Sidebar Drawer */}

          {
            mobileMenuOpen && (

              <div
                className="
                  fixed
                  inset-0
                  z-50
                  lg:hidden
                "
              >


                {/* Overlay */}

                <button

                  aria-label="Close menu"

                  onClick={()=>
                    setMobileMenuOpen(false)
                  }

                  className="
                    absolute
                    inset-0
                    bg-black/40
                    backdrop-blur-sm
                  "

                />





                {/* Drawer */}

                <aside

                  className="
                    relative
                    h-full
                    w-[300px]
                    max-w-[85vw]
                    bg-background
                    p-4
                    shadow-2xl
                  "

                >


                  <div
                    className="
                      mb-4
                      flex
                      justify-end
                    "
                  >

                    <button

                      onClick={()=>
                        setMobileMenuOpen(false)
                      }

                      className="
                        flex
                        h-10
                        w-10
                        items-center
                        justify-center
                        rounded-xl
                        border
                        border-border
                      "

                    >

                      <X
                        className="
                          h-5
                          w-5
                        "
                      />

                    </button>


                  </div>



                  <DashboardSidebar />


                </aside>



              </div>

            )
          }







          {/* Main Content */}

          <div

            className="
              min-w-0
              space-y-4
              sm:space-y-6
            "

          >


            <DashboardTopbar

              user={user}

              onMenuClick={()=>
                setMobileMenuOpen(true)
              }

            />



            <div

              className="
                space-y-4
                sm:space-y-6
              "

            >

              {children}

            </div>



          </div>



        </div>



      </div>



    </main>

  );

}